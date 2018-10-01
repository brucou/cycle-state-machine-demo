import { both, complement, keys } from 'ramda';
import { decorateWithEntryActions, identity, INIT_EVENT, INIT_STATE } from 'state-transducer'
// import { decorateWithEntryActions, identity, INIT_EVENT, INIT_STATE } from '../../../state-transducer/src'
import {
  ABOUT_CONTINUE, APPLICATION_COMPLETED, BACK_TEAM_CLICKED, CHANGE_ABOUT, CHANGE_QUESTION, CHANGE_TEAMS, FETCH_EV,
  INIT_S, JOIN_OR_UNJOIN_TEAM_CLICKED, QUESTION_CONTINUE, SKIP_TEAM_CLICKED, STATE_ABOUT, STATE_APPLIED, STATE_QUESTION,
  STATE_REVIEW, STATE_TEAM_DETAIL, STATE_TEAMS, STEP_ABOUT, STEP_QUESTION, STEP_TEAMS, TEAM_CLICKED, TEAM_CONTINUE
} from './properties';
import {
  updateUserAppAndRenderQuestionStep, updateUserAppAndRenderReviewStep, updateUserAppAndRenderReviewStepR,
  updateUserAppAndRenderTeamsStepT, updateUserAppWithHasApplied, updateUserAppWithHasReviewed
} from './fsmActions';
import {
  initializeModel, initializeModelAndStepReview, updateModelWithAboutStepValidationMessages,
  updateModelWithJoinedOrUnjoinedTeamData, updateModelWithJoinedTeamData, updateModelWithQuestionValidationMessages,
  updateModelWithSelectedTeamData, updateModelWithSkippedTeamData, updateModelWithStepOnly,
  updateModelWithTeamDetailAnswerAndNextStep, updateModelWithTeamDetailValidationMessages,
  updateModelWithUnjoinedTeamData
} from './modelUpdates';
import {
  aboutContinueEventFactory, applicationCompletedEventFactory, backTeamClickedEventFactory, changeAboutEventFactory,
  changeQuestionEventFactory, changeTeamsEventFactory, hasApplied, hasJoinedAtLeastOneTeam, hasReachedReviewStep,
  isFormValid, isStepAbout, isStepQuestion, isStepReview, isStepTeams, isTeamJoined, isTeamJoinedAndFormInvalid,
  isTeamNotJoinedAndFormInvalid, isTeamNotJoinedAndFormValid, joinTeamClickedEventFactory, questionContinueEventFactory,
  skipTeamClickedEventFactory, teamClickedEventFactory, teamContinueEventFactory
} from './fsmEvents';
import { fetchUserApplicationModelData } from './fetch';
import { renderInitScreen } from "./renderInitScreen";
import { renderAppliedScreen } from "./renderAppliedScreen";
import { mergeOutputFn } from "../helpers"
import { renderAboutScreen } from "./renderAboutScreen"
import { renderQuestionScreen } from "./renderQuestionScreen"
import { renderTeamScreen } from "./renderTeamsScreen"
import { renderTeamDetailScreen } from "./renderTeamDetailScreen"
import { renderReviewScreen } from "./renderReviewScreen"

// ADR : state machine design
// A possible design is to have all the `Continue` button click modelized by the same event in the state machine.
// Given that the corresponding actions are different, this would mean that action needs extra data to produce its
// output. In this case, the extra data is the control state AND the form data('Continue' leads to saving the currently
// displayed form data, data which will depends on the control state). However :
// - the action factory does not have access to the control state of the state machine. That means we would have to
// replicate that information in the extended state of our state machine
// - the form data CANNOT be included in the extended state of the state machine. It is to be read only at
// 'Continue' click time and immediately processed by the action factory
// - because our action factories are pure functions, any reading of form data CANNOT be realized there
// - this leaves only the event factories as the place to perform the reading of the form data
// So :
// - a single 'Continue' click event factory, will have to do a big `switch` among possible control states
// - while this is possible, it is bad design:
//   - you need to write extra code to replicate the control state in the extended state, and keep that code updated
// with every iteration of the design of the state machine
//   - control states exist precisely for control flow purposes, i.e. to capture and expose the `if/then/else` logic
// pertaining to the computation. Moving this logic out of the control states towards the extended state and use
// guards as control flow mechanism is equivalent semantically but only replicates an already existing functionality.
//   - In the end, you loose traceability (hidden control flow), and maintainability (the one-reason-to-change SOLID
// principle is violated)
//   - in exchange, you get to spare writing a few event factories, which has little incidence on the
// correctness of the computation, or its performance
//
// In the end, `Continue` clicks do not share the same semantics and should hence have separate handlers. If those
// handlers share common code, that common code can always be factored out in a utility function.

export const eventsFactory = {
  // NOTE : The `FETCH_EV` event will be received by the state machine before any other event, as it should :
  // - All event factories are executed when the state machine is started
  // - `fetchUserApplicationModelData` return an observable which when subscribed immediately emits a value,
  // triggering the state machine transition - in fact emission is almost immediate as data is in local storage
  // - other event factories activate listeners on user events which do not immediately fire as there is no
  // immediate user action. In the highly unlikely event that a user event is triggered so fast that it is processed
  // before reading from local storage, well houston we have a problem (typical race condition). So we put the
  // `FETCH_EV` factory first among all the factories, so it is executed first, and its events are processed first
  // - as a result, the fetch event is the first to fire and the data stored (in local storage here) is fetched
  [FETCH_EV]: fetchUserApplicationModelData,
  [ABOUT_CONTINUE]: aboutContinueEventFactory,
  [QUESTION_CONTINUE]: questionContinueEventFactory,
  [TEAM_CLICKED]: teamClickedEventFactory,
  [SKIP_TEAM_CLICKED]: skipTeamClickedEventFactory,
  [JOIN_OR_UNJOIN_TEAM_CLICKED]: joinTeamClickedEventFactory,
  [BACK_TEAM_CLICKED]: backTeamClickedEventFactory,
  [TEAM_CONTINUE]: teamContinueEventFactory,
  [CHANGE_ABOUT]: changeAboutEventFactory,
  [CHANGE_QUESTION]: changeQuestionEventFactory,
  [CHANGE_TEAMS]: changeTeamsEventFactory,
  [APPLICATION_COMPLETED]: applicationCompletedEventFactory
};

const states = {
  [INIT_S]: '',
  [STATE_ABOUT]: '',
  [STATE_QUESTION]: '',
  [STATE_TEAMS]: '',
  [STATE_TEAM_DETAIL]: '',
  [STATE_REVIEW]: '',
  [STATE_APPLIED]: '['
};

/** @type Array<Transition>*/
const transitionsWithoutRenderActions = [
  { from: INIT_STATE, event: INIT_EVENT, to: INIT_S, action: identity },
  {
    from: INIT_S, event: FETCH_EV, guards: [
      { predicate: hasApplied, to: STATE_REVIEW, action: initializeModelAndStepReview },
      { predicate: both(complement(hasApplied), isStepAbout), to: STATE_ABOUT, action: initializeModel },
      { predicate: isStepQuestion, to: STATE_QUESTION, action: initializeModel },
      { predicate: isStepTeams, to: STATE_TEAMS, action: initializeModel },
      { predicate: isStepReview, to: STATE_REVIEW, action: initializeModel },
    ]
  },
  {
    from: STATE_ABOUT, event: ABOUT_CONTINUE, guards: [
      {
        predicate: both(isFormValid, complement(hasReachedReviewStep)),
        to: STATE_QUESTION,
        action: updateUserAppAndRenderQuestionStep
      },
      {
        predicate: both(isFormValid, hasReachedReviewStep),
        to: STATE_REVIEW,
        action: updateUserAppAndRenderReviewStep
      },
      { predicate: complement(isFormValid), to: STATE_ABOUT, action: updateModelWithAboutStepValidationMessages }
    ]
  },
  {
    from: STATE_QUESTION, event: QUESTION_CONTINUE, guards: [
      {
        predicate: both(isFormValid, complement(hasReachedReviewStep)),
        to: STATE_TEAMS,
        action: updateUserAppAndRenderTeamsStepT
      },
      {
        predicate: both(isFormValid, hasReachedReviewStep),
        to: STATE_REVIEW,
        action: updateUserAppAndRenderReviewStepR
      },
      { predicate: complement(isFormValid), to: STATE_QUESTION, action: updateModelWithQuestionValidationMessages }
    ]
  },
  { from: STATE_TEAMS, event: TEAM_CLICKED, to: STATE_TEAM_DETAIL, action: updateModelWithSelectedTeamData },
  {
    from: STATE_TEAM_DETAIL, event: SKIP_TEAM_CLICKED, guards: [
      {
        predicate: complement(isTeamJoinedAndFormInvalid),
        to: STATE_TEAM_DETAIL,
        action: updateModelWithSkippedTeamData
      },
      { predicate: isTeamJoinedAndFormInvalid, to: STATE_TEAM_DETAIL, action: updateModelWithTeamDetailValidationMessages },
    ]
  },
  {
    from: STATE_TEAM_DETAIL,
    event: JOIN_OR_UNJOIN_TEAM_CLICKED,
    guards: [
      { predicate: isTeamJoined, to: STATE_TEAM_DETAIL, action: updateModelWithUnjoinedTeamData },
      { predicate: isTeamNotJoinedAndFormValid, to: STATE_TEAM_DETAIL, action: updateModelWithJoinedTeamData },
      {
        predicate: isTeamNotJoinedAndFormInvalid,
        to: STATE_TEAM_DETAIL,
        action: updateModelWithTeamDetailValidationMessages
      }
    ]
  },
  {
    from: STATE_TEAM_DETAIL,
    event: BACK_TEAM_CLICKED,
    guards: [
      {
        predicate: isTeamJoinedAndFormInvalid,
        to: STATE_TEAM_DETAIL,
        action: updateModelWithTeamDetailValidationMessages
      },
      {
        predicate: complement(isTeamJoinedAndFormInvalid),
        to: STATE_TEAMS,
        action: updateModelWithTeamDetailAnswerAndNextStep
      },
    ],
  },
  {
    from: STATE_TEAMS,
    event: TEAM_CONTINUE,
    guards: [
      {
        predicate: hasJoinedAtLeastOneTeam,
        to: STATE_REVIEW,
        action: updateUserAppWithHasReviewed
      },
      {
        predicate: complement(hasJoinedAtLeastOneTeam),
        to: STATE_TEAMS,
        action: identity
      }
    ]
  },
  { from: STATE_REVIEW, event: CHANGE_ABOUT, to: STATE_ABOUT, action: updateModelWithStepOnly(STEP_ABOUT) },
  { from: STATE_REVIEW, event: CHANGE_QUESTION, to: STATE_QUESTION, action: updateModelWithStepOnly(STEP_QUESTION) },
  { from: STATE_REVIEW, event: CHANGE_TEAMS, to: STATE_TEAMS, action: updateModelWithStepOnly(STEP_TEAMS) },
  { from: STATE_REVIEW, event: APPLICATION_COMPLETED, to: STATE_APPLIED, action: updateUserAppWithHasApplied },
];

const entryActions = {
  [INIT_S]: renderInitScreen,
  [STATE_ABOUT]: renderAboutScreen,
  [STATE_QUESTION]: renderQuestionScreen,
  [STATE_TEAMS]: renderTeamScreen,
  [STATE_TEAM_DETAIL]: renderTeamDetailScreen,
  [STATE_REVIEW]: renderReviewScreen,
  [STATE_APPLIED]: renderAppliedScreen
};

const fsmWithoutRenderActions = {
  initialExtendedState: {},
  states,
  events: keys(eventsFactory),
  transitions: transitionsWithoutRenderActions
};

export const fsm = decorateWithEntryActions(fsmWithoutRenderActions, entryActions, mergeOutputFn);

