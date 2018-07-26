import { both, complement, flip, T } from 'ramda';
import { decorateWithEntryActions, mergeActionFactories, NO_OUTPUT } from 'state-transducer';
import { INIT_EVENT_NAME, INIT_STATE } from '@rxcc/components';
import { STEP_ABOUT, STEP_QUESTION, STEP_REVIEW, STEP_TEAMS } from './properties';
import {
  makeRequestToUpdateUserApplication, makeRequestToUpdateUserApplicationWithHasApplied,
  makeRequestToUpdateUserApplicationWithHasReviewed
} from './processApplicationActions';
import {
  initializeModel, initializeModelAndStepReview, updateModelWithAboutDataAndStepQuestion,
  updateModelWithAboutDataAndStepReview, updateModelWithAboutValidationMessages, updateModelWithAppliedData,
  updateModelWithJoinedOrUnjoinedTeamData, updateModelWithQuestionDataAndStepReview,
  updateModelWithQuestionDataAndTeamsStep, updateModelWithQuestionValidationMessages, updateModelWithSelectedTeamData,
  updateModelWithSkippedTeamData, updateModelWithStepAndHasReviewed, updateModelWithStepOnly,
  updateModelWithTeamDetailAnswerAndNextStep, updateModelWithTeamDetailValidationMessages
} from './processApplicationModelUpdates';
import {
  aboutContinueEventFactory, applicationCompletedEventFactory, backTeamClickedEventFactory, changeAboutEventFactory,
  changeQuestionEventFactory, changeTeamsEventFactory, hasApplied, hasJoinedAtLeastOneTeam, hasReachedReviewStep,
  isFormValid, isStep, joinTeamClickedEventFactory, questionContinueEventFactory, skipTeamClickedEventFactory,
  teamClickedEventFactory, teamContinueEventFactory
} from './processApplicationEvents';
import { fetchUserApplicationModelData } from './processApplicationFetch';
import { DOM_SINK } from "@rxcc/utils"
import { renderInitScreen } from "./processApplicationRenderInit";
import { processApplicationRenderAboutScreen, renderAboutScreen } from "./processApplicationRenderAboutScreen";
import { processApplicationRenderQuestionScreen } from "./processApplicationRenderQuestionScreen";
import { processApplicationRenderTeamsScreen } from "./processApplicationRenderTeamsScreen";
import { processApplicationRenderTeamDetailScreen } from "./processApplicationRenderTeamDetailScreen";
import { processApplicationRenderReviewScreen } from "./processApplicationRenderReviewScreen";
import { processApplicationRenderApplied } from "./processApplicationRenderApplied";
import { mergeOutputFn } from "../helpers"

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

const sinkNames = [DOM_SINK, 'domainAction$'];

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
    { from: INIT_STATE, event: INIT_EVENT_NAME, guards: [{ predicate: T, to: INIT_S, action: identity }] },
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
          action: mergeActionFactories(mergeOutputFn, [makeRequestToUpdateUserApplication(STEP_QUESTION), updateModelWithAboutDataAndStepQuestion])
        },
        {
          predicate: both(isFormValid, hasReachedReviewStep),
          to: STATE_REVIEW,
          action: mergeActionFactories(mergeOutputFn, [makeRequestToUpdateUserApplication(STEP_REVIEW), updateModelWithAboutDataAndStepReview])
        },
        {
          predicate: T,
          to: STATE_ABOUT,
          action: updateModelWithAboutValidationMessages
        }
      ]
    },
    {
      from: STATE_QUESTION, event: QUESTION_CONTINUE, guards: [
        {
          predicate: both(isFormValid, complement(hasReachedReviewStep)),
          to: STATE_TEAMS,
          action: mergeActionFactories(makeRequestToUpdateUserApplication(STEP_TEAMS), updateModelWithQuestionDataAndTeamsStep)
        },
        {
          predicate: both(isFormValid, hasReachedReviewStep),
          to: STATE_REVIEW,
          action: mergeActionFactories(mergeOutputFn, [makeRequestToUpdateUserApplication(STEP_REVIEW), updateModelWithQuestionDataAndStepReview])
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
          action: mergeActionFactories(mergeOutputFn, [makeRequestToUpdateUserApplicationWithHasReviewed, updateModelWithQuestionDataAndStepReview])
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
          action: mergeActionFactories(mergeOutputFn, [makeRequestToUpdateUserApplicationWithHasApplied, updateModelWithAppliedData])
        },
      ]
    },
  ];

const entryActions = {
  // TODO : associate {DOM : {vTree}} output to given state
  // TODO could be joined in states if I ever wanted to support directly entry actions in this version... to think about
  INIT_S: renderInitScreen, // TODO :Remove from INIT_S transition and test if decroation works with identity action!!
  STATE_ABOUT: renderAboutScreen,
  STATE_QUESTION: '',
  STATE_TEAMS: '',
  STATE_TEAM_DETAIL: '',
  STATE_REVIEW: '',
  STATE_APPLIED: ''
};
export const transitions = decorateWithEntryActions(transitionsWithoutRenderActions, entryActions, mergeOutputFn);

// have actionsFactory = makeNamedActionsFactory{
//   actionName : function () {...}
// } : that add displayName to each actionName to be precisely that actionName
// transitions : {... action : actionsFactory[actionName]}
// when visualizing, have a utility function map the function to the function name (map traversal)
// the function() can be AOPed to add entry actions for instance (copying over the displayName of the AOPed target)

// TODO add in the output the DOM...
// actually do a higher order function which adds the render to every action with transition with target states with
// a given value : ie.e. simulate entry actions
// state name : action functions -> to merge to other actions. But WE LOOSE THE FUNCTION NAME...

export const entryComponents = {
  [STATE_ABOUT]: function showViewStateAbout(model) {
    console.info(`entering entry component ABOUT`, model);

    return flip(processApplicationRenderAboutScreen)({ model })
  },
  [STATE_QUESTION]: function showViewStateQuestion(model) {
    console.info(`entering entry component QUESTION`, model);

    return flip(processApplicationRenderQuestionScreen)({ model })
  },
  [STATE_TEAMS]: function showViewStateTeams(model) {
    console.info(`entering entry component TEAMS`, model);

    return flip(processApplicationRenderTeamsScreen)({ model })
  },
  [STATE_TEAM_DETAIL]: function showViewStateTeamDetail(model) {
    console.info(`entering entry component TEAM DETAIL`, model);

    return flip(processApplicationRenderTeamDetailScreen)({ model })
  },
  [STATE_REVIEW]: function showViewStateReview(model) {
    console.info(`entering entry component REVIEW`, model);

    return flip(processApplicationRenderReviewScreen)({ model })
  },
  [STATE_APPLIED]: function showViewStateApplied(model) {
    console.info(`entering entry component APPLIED`, model);

    return processApplicationRenderApplied
  },
};

/**
 * @typedef {Object} FSM_Def
 * @property {Object.<Control_State, *>} states Object whose every key is a control state admitted by the
 * specified state machine
 * @property {Array<EventLabel>} events
 * @property {Array<Transition>} transitions
 * @property {*} initial_extended_state
 */
/**
 * @typedef {String} Event_Label
 */
/**
 * @typedef {String} Control_State Name of the control state
 */
/**
 * @typedef {Inconditional_Transition | Conditional_Transition} Transition
 */
/**
 * @typedef {function(model:*, event_data:*, settings:FSM_Settings) : Actions} ActionFactory
 */
/**
 * @typedef {{model_update : Array<JSON_Patch_Operation>, output : *}} Actions The actions to be performed by the
 * state machine in response to a transition. `model_update` represents the state update for the variables
 * of the extended state machine. `output` represents the output of the state machine passed to the API caller.
 */
/**
 * @typedef {{from: Control_State, to:Control_State, event:Event_Label, action : ActionFactory}}
 *   Inconditional_Transition encodes transition with no guards attached. Every time the specified event occurs, and
 *   the machine is in the specified state, it will transition to the target control state, and invoke the action
 *   returned by the action factory
 */
/**
 * @typedef {{from : Control_State, guards : Array<Condition>}} Conditional_Transition Transition for the
 * specified state is contingent to some guards being passed. Those guards are defined as an array.
 *
 */
/**
 * @typedef {{predicate : Predicate, to : Control_State, action : ActionFactory}} Condition On satisfying the
 * specified predicate, the received event data will trigger the transition to the specified target control state
 * and invoke the action created by the specified action factory, leading to an update of the internal state of the
 * extended state machine and possibly an output to the state machine client.
 *
 */
/**
 * @typedef {function (*=) : Boolean} Predicate
 *
 */
/**
 * @typedef {*} FSM_Settings
 *
 */
/**
 * @typedef {*} FSM_Model
 *
 */
