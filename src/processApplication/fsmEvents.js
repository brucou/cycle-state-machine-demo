import { all, any, complement, curry, isNil, keys, pipe, values } from 'ramda';
import { getAboutFormData, getQuestionFormData, getTeamDetailFormData } from './fetch';
import {
  aboutScreenFieldValidationSpecs, questionScreenFieldValidationSpecs, teamDetailScreenFieldValidationSpecs,
  validateScreenFields
} from './formValidation';
import {
  STEP_ABOUT, STEP_REVIEW, USER_APPLICATION_ABOUT_CONTINUE_BUTTON_SELECTOR, USER_APPLICATION_BACK_TO_TEAMS_SELECTOR,
  USER_APPLICATION_JOIN_UNJOIN_TEAM_SELECTOR, USER_APPLICATION_QUESTION_CONTINUE_BUTTON_SELECTOR,
  USER_APPLICATION_REVIEW_ABOUT_SELECTOR, USER_APPLICATION_REVIEW_OPP_QUESTION_SELECTOR,
  USER_APPLICATION_REVIEW_SUBMIT_SELECTOR, USER_APPLICATION_REVIEW_TEAMS_SELECTOR, USER_APPLICATION_SKIP_TEAM_SELECTOR,
  USER_APPLICATION_TEAM_CONTINUE_BUTTON_SELECTOR, USER_APPLICATION_TEAMLIST_SELECTOR
} from './properties';
import { isBoolean } from "@rxcc/contracts"
import { preventDefault } from "../helpers"

///////
// Events

// We just read the god damn values from the dom directly
// Events are executed prior to starting the state machine, so they can't take into
// account the model, hence also not the initial value for the fields. And the repository
// does not have the current value of the fields either. So only way is this
export function aboutContinueEventFactory(sources, settings) {
  void settings;

  return sources.DOM.select(USER_APPLICATION_ABOUT_CONTINUE_BUTTON_SELECTOR).events('click')
    .do(preventDefault)
    .map((x) => {
      const formData = getAboutFormData(sources.document);

      return {
        formData,
        validationData: validateScreenFields(aboutScreenFieldValidationSpecs, formData)
      }
    })
}

export function questionContinueEventFactory(sources, settings) {
  // should continue only if all fields have been validated
  void settings;

  return sources.DOM.select(USER_APPLICATION_QUESTION_CONTINUE_BUTTON_SELECTOR).events('click')
    .do(preventDefault)
    .do(console.warn.bind(console, 'submit button clicked'))
    .map((x) => {
      void x;
      const formData = getQuestionFormData(sources.document);

      return {
        formData,
        validationData: validateScreenFields(questionScreenFieldValidationSpecs, formData)
      }
    })
    .do(console.warn.bind(console, 'validation Question fields performed'))
}

// @returns Stream<Number> returns the index of the team which has been clicked or throws
export function teamClickedEventFactory(sources, settings) {
  void settings;

  return sources.DOM.select(USER_APPLICATION_TEAMLIST_SELECTOR).events('click')
    .do(preventDefault)
    .do(console.warn.bind(console, 'team list area clicked'))
    .map((e) => {
      const target = e.target;
      const elIndex = target.getAttribute('data-index');

      // Note : parsing to int because otherwise it is a string and that messes increment by 1 op.
      return elIndex == null
        ? null
        : parseInt(elIndex)
    })
    // it can happen that the click is on the div but not on a data-index element => elIndex = null
    // Note that isNil is used and not identity, otherwise elIndex = 0 would be filtered out
    .filter(complement(isNil))
    .do(console.warn.bind(console, 'team index'))
}

export function teamContinueEventFactory(sources, settings) {
  void settings;

  return sources.DOM.select(USER_APPLICATION_TEAM_CONTINUE_BUTTON_SELECTOR).events('click')
    .do(preventDefault)
}

export function skipTeamClickedEventFactory(sources, settings) {
  void settings;

  return sources.DOM.select(USER_APPLICATION_SKIP_TEAM_SELECTOR).events('click')
    .do(preventDefault)
    .map((x) => ({ formData: getTeamDetailFormData(sources.document) }))
}

export function joinTeamClickedEventFactory(sources, settings) {
  void settings;

  return sources.DOM.select(USER_APPLICATION_JOIN_UNJOIN_TEAM_SELECTOR).events('click')
    .do(preventDefault)
    .map((x) => {
      void x;
      const formData = getTeamDetailFormData(sources.document);

      return {
        formData,
        validationData: validateScreenFields(teamDetailScreenFieldValidationSpecs, formData)
      }
    })
}

export function backTeamClickedEventFactory(sources, settings) {
  void settings;

  return sources.DOM.select(USER_APPLICATION_BACK_TO_TEAMS_SELECTOR).events('click')
    .do(preventDefault)
    .map(ev => getTeamDetailFormData(sources.document))
}

export function changeAboutEventFactory(sources, settings) {
  void settings;

  return sources.DOM.select(USER_APPLICATION_REVIEW_ABOUT_SELECTOR).events('click')
    .do(preventDefault)
}

export function changeQuestionEventFactory(sources, settings) {
  void settings;

  return sources.DOM.select(USER_APPLICATION_REVIEW_OPP_QUESTION_SELECTOR).events('click')
    .do(preventDefault)
}

export function changeTeamsEventFactory(sources, settings) {
  void settings;

  return sources.DOM.select(USER_APPLICATION_REVIEW_TEAMS_SELECTOR).events('click')
    .do(preventDefault)
}

export function applicationCompletedEventFactory(sources, settings) {
  void settings;

  return sources.DOM.select(USER_APPLICATION_REVIEW_SUBMIT_SELECTOR).events('click')
    .do(preventDefault)
}

///////
// Event guards

export function hasApplied(model, eventData) {
  void model;
  const userApplication = eventData.userApplication;

  if (userApplication) {
    const { progress: { step, hasApplied } } = userApplication;
    return hasApplied
  }
  else {
    return false
  }
}

function _isStepX(targetStep, model, eventData) {
  void model;
  // event data here is the result of the query on user application
  // it is null if there is no existing user application
  // If it is null, it means we are starting a new user application
  // in which case we start in step About
  // if there is an existing user application, then we retrieve the
  // current step from there
  const userApplication = eventData.userApplication;

  if (userApplication && userApplication.progress) {
    const { step, hasApplied } = userApplication.progress;
    if (hasApplied) {
      // if the user already applied, it is implicitly in the review state
      return targetStep === STEP_REVIEW;
    }
    else {
      return step === targetStep
    }
  }
  else {
    // if there is no prior user application, first step must be About
    return targetStep === STEP_ABOUT
  }
}

export const isStep = curry(_isStepX);

export function isFormValid(model, eventData) {
  void model;

  return pipe(values, all(isBoolean))(eventData.validationData)
}

export function hasReachedReviewStep(model, eventData) {
  void eventData;
  const { userApplication: { progress: { hasReviewedApplication } } } = model;

  return hasReviewedApplication
}

export function hasJoinedAtLeastOneTeam(model, eventData) {
  const { userApplication: { teams } } = model;
  const _hasJoinedAtLeastOneTeam = any((teamKey) => {
    return teams[teamKey].hasBeenJoined
  }, keys(teams));
  console.log('hasJoinedAtLeastOneTeam', _hasJoinedAtLeastOneTeam);

  return _hasJoinedAtLeastOneTeam;
}
