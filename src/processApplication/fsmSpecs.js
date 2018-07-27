import { both, complement, T } from 'ramda';
import { decorateWithEntryActions, INIT_EVENT, INIT_STATE, NO_OUTPUT } from 'state-transducer';
import { STEP_ABOUT, STEP_QUESTION, STEP_REVIEW, STEP_TEAMS } from './properties';
import {
  updateUserAppAndRenderQuestionStep, updateUserAppAndRenderReviewStep, updateUserAppAndRenderReviewStepR,
  updateUserAppAndRenderTeamsStepT, updateUserAppWithHasApplied, updateUserAppWithHasReviewed
} from './fsmActions';
import {
  initializeModel, initializeModelAndStepReview, updateModelWithAboutStepValidationMessages,
  updateModelWithJoinedOrUnjoinedTeamData, updateModelWithQuestionValidationMessages, updateModelWithSelectedTeamData,
  updateModelWithSkippedTeamData, updateModelWithStepAndHasReviewed, updateModelWithStepOnly,
  updateModelWithTeamDetailAnswerAndNextStep, updateModelWithTeamDetailValidationMessages
} from './processApplicationModelUpdates';
import {
  aboutContinueEventFactory, applicationCompletedEventFactory, backTeamClickedEventFactory, changeAboutEventFactory,
  changeQuestionEventFactory, changeTeamsEventFactory, hasApplied, hasJoinedAtLeastOneTeam, hasReachedReviewStep,
  isFormValid, isStep, joinTeamClickedEventFactory, questionContinueEventFactory, skipTeamClickedEventFactory,
  teamClickedEventFactory, teamContinueEventFactory
} from './fsmEvents';
import { fetchUserApplicationModelData } from './processApplicationFetch';
import { renderInitScreen } from "./renderInitScreen";
import { renderAppliedScreen } from "./renderAppliedScreen";
import { mergeOutputFn } from "../helpers"
import { renderAboutScreen } from "./renderAboutScreen"
import { renderQuestionScreen } from "./renderQuestionScreen"
import { renderTeamScreen } from "./renderTeamsScreen"
import { renderTeamDetailScreen } from "./renderTeamDetailScreen"
import { renderReviewScreen } from "./renderReviewScreen"

const INIT_S = 'INIT';
const STATE_ABOUT = 'About';
const STATE_QUESTION = 'Question';
const STATE_TEAMS = 'Teams';
const STATE_TEAM_DETAIL = 'Team Detail';
const STATE_REVIEW = 'Review';
const STATE_APPLIED = 'State Applied';

const FETCH_EV = 'fetch';
const ABOUT_CONTINUE = 'about_continue';
const QUESTION_CONTINUE = 'question_continue';
const TEAM_CLICKED = 'team_clicked';
const SKIP_TEAM_CLICKED = 'skip_team_clicked';
const JOIN_OR_UNJOIN_TEAM_CLICKED = 'join_team_clicked';
const BACK_TEAM_CLICKED = 'back_team_clicked';
const TEAM_CONTINUE = 'team_continue';
const CHANGE_ABOUT = 'change_about';
const CHANGE_QUESTION = 'change_question';
const CHANGE_TEAMS = 'change_teams';
const APPLICATION_COMPLETED = 'application_completed';

// NOTE : we have different events and event factories for each continue button, because the event
// data for those events are different
// NOTE : we have different selectors for the continue button because otherwise we would fire
// all continue events which would correctly advance the state machine for the good event, but
// display warning for the rest of the events. To suppress the warning, we decide to have
// different selectors
export const events = {
  // NOTE : We used a trick here to have the fetch event automatically received by the state machine before any
  // other event :
  // - All event factories are executed when the state machine is started.
  // - `fetchUserApplicationModelData` return an observable which when subscribed immediately emits a value,
  // triggering the state machine transition - in fact emission is almost immediate as data is in local storage
  // - other event factories activate listeners on user events which do not immediately fire as there is no
  // immediatee user action
  // - as a result, the fetch event is the first to fire and the data stored (in local storage here) is fetched
  // - the fetch events fires as a consequence of subscription to the event source
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

export const states = {
  INIT_S: '',
  STATE_ABOUT: '',
  STATE_QUESTION: '',
  STATE_TEAMS: '',
  STATE_TEAM_DETAIL: '',
  STATE_REVIEW: '',
  STATE_APPLIED: ''
};

/** @type ActionFactory*/
function identity(model, eventData, settings) {
  return {
    model_update: [],
    output: NO_OUTPUT
  }
}

/** @type Array<Transition>*/
  // TODO : in actions, do not forgt the rendering of the screen!! cf. entry components
const transitionsWithoutRenderActions = [
    { from: INIT_STATE, event: INIT_EVENT, guards: [{ predicate: T, to: INIT_S, action: identity }] },
    {
      from: INIT_S, event: FETCH_EV, guards: [
        { predicate: hasApplied, to: STATE_REVIEW, action: initializeModelAndStepReview },
        { predicate: isStep(STEP_ABOUT), to: STATE_ABOUT, action: initializeModel },
        { predicate: isStep(STEP_QUESTION), to: STATE_QUESTION, action: initializeModel },
        { predicate: isStep(STEP_TEAMS), to: STATE_TEAMS, action: initializeModel },
        { predicate: isStep(STEP_REVIEW), to: STATE_REVIEW, action: initializeModel },
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
        {
          predicate: T,
          to: STATE_ABOUT,
          action: updateModelWithAboutStepValidationMessages
        }
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
        {
          predicate: T,
          to: STATE_QUESTION,
          action: updateModelWithQuestionValidationMessages
        }
      ]
    },
    {
      from: STATE_TEAMS,
      event: TEAM_CLICKED,
      guards: [{ predicate: T, to: STATE_TEAM_DETAIL, action: updateModelWithSelectedTeamData }]
    },
    {
      from: STATE_TEAM_DETAIL,
      event: SKIP_TEAM_CLICKED,
      guards: [{ predicate: T, to: STATE_TEAM_DETAIL, action: updateModelWithSkippedTeamData }]
    },
    {
      from: STATE_TEAM_DETAIL,
      event: JOIN_OR_UNJOIN_TEAM_CLICKED,
      guards: [
        { predicate: isFormValid, to: STATE_TEAM_DETAIL, action: updateModelWithJoinedOrUnjoinedTeamData },
        { predicate: T, to: STATE_TEAM_DETAIL, action: updateModelWithTeamDetailValidationMessages }
      ]
    },
    {
      from: STATE_TEAM_DETAIL,
      event: BACK_TEAM_CLICKED,
      guards: [{ predicate: T, to: STATE_TEAMS, action: updateModelWithTeamDetailAnswerAndNextStep }]
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
        { predicate: T, to: STATE_TEAM_DETAIL, action: updateModelWithStepAndHasReviewed }
      ]
    },
    {
      from: STATE_REVIEW,
      event: CHANGE_ABOUT,
      guards: [
        { predicate: T, to: STATE_ABOUT, action: updateModelWithStepOnly(STEP_ABOUT) },
      ]
    },
    {
      from: STATE_REVIEW,
      event: CHANGE_QUESTION,
      guards: [
        { predicate: T, to: STATE_QUESTION, action: updateModelWithStepOnly(STEP_QUESTION) },
      ]
    },
    {
      from: STATE_REVIEW,
      event: CHANGE_TEAMS,
      guards: [
        { predicate: T, to: STATE_TEAMS, action: updateModelWithStepOnly(STEP_TEAMS) },
      ]
    },
    {
      from: STATE_REVIEW,
      event: APPLICATION_COMPLETED,
      guards: [
        {
          predicate: T,
          to: STATE_REVIEW,
          action: updateUserAppWithHasApplied
        },
      ]
    },
  ];

const entryActions = {
  // TODO : associate {DOM : {vTree}} output to given state
  // TODO could be joined in states if I ever wanted to support directly entry actions in this version... to think about
  INIT_S: renderInitScreen, // TODO :Remove from INIT_S transition and test if decroation works with identity action!!
  STATE_ABOUT: renderAboutScreen,
  STATE_QUESTION: renderQuestionScreen,
  STATE_TEAMS: renderTeamScreen,
  STATE_TEAM_DETAIL: renderTeamDetailScreen,
  STATE_REVIEW: renderReviewScreen,
  STATE_APPLIED: renderAppliedScreen
};

export const transitions =
  decorateWithEntryActions(transitionsWithoutRenderActions, states, entryActions, mergeOutputFn);

