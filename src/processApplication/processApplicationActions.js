import { curry, merge } from 'ramda';
import { UPDATE, USER_APPLICATION } from '../domain/index';
import { DOMAIN_ACTION, STEP_ABOUT, STEP_QUESTION, STEP_REVIEW, STEP_TEAM_DETAIL, STEP_TEAMS, } from './properties';

///////
// Helpers
export function reShapeEventData(formData, step) {
  switch (step) {
    case STEP_ABOUT :
      const { superPower, birthday, phone, preferredName, zipCode, legalName } = formData;
      return {
        about: {
          aboutYou: { superPower },
          personal: { birthday, phone, preferredName, zipCode, legalName }
        },
      }

    case STEP_QUESTION :
      const { answer } = formData;
      return {
        questions: { answer: answer }
      }

    case STEP_TEAMS :
      // in this case, no form data, updates have already been made directly in the model
      return {};

    case STEP_TEAM_DETAIL :
      // in this case, no form data, updates have already been made directly in the model
      return {};

    case STEP_REVIEW :
      // this is fictional step, corresponding to post apply to these things button click
      // in principle that click should lead to a new route, or in any case out of FSM
      return {}

    default:
      throw 'internal error : unconfigured step encountered in the application process state' +
      ' machine'
  }
}

function getUserApplicationUpdates(formData, userApplication) {
  console.log('action_request : formData', formData);
  if (!userApplication) {
    throw 'internal error: model at this stage must have userApplication property set!';
  }
  const step = userApplication.progress.step;
  const updates = reShapeEventData(formData, step);
  let newUserApplication = merge(userApplication, updates);

  console.log('getUserApplicationUpdates: step, updated user app', step, newUserApplication);

  return newUserApplication
}

///////
// Action requests
function _makeRequestToUpdateUserApplication(nextStep, model, eventData) {
  console.log('makeRequestToUpdateUserApplication > eventData', eventData);
  const formData = eventData.formData;
  const { userApplication } = model;
  const newUserApplication = getUserApplicationUpdates(formData, userApplication);
  newUserApplication.progress.step = nextStep;

  return {
    output: {
      [DOMAIN_ACTION]: {
        context: USER_APPLICATION,
        command: UPDATE,
        payload: newUserApplication
      }
    }
  }
}

export const makeRequestToUpdateUserApplication = curry(_makeRequestToUpdateUserApplication)

export function makeRequestToUpdateUserApplicationWithHasReviewed(model, eventData) {
  console.log('makeRequestToUpdateUserApplicationWithHasReviewed > eventData', eventData);
  const formData = eventData.formData;
  const { userApplication } = model;
  const newUserApplication = getUserApplicationUpdates(formData, userApplication);
  newUserApplication.progress.hasReviewedApplication = true;
  newUserApplication.progress.step = STEP_REVIEW;

  return {
    output: {
      [DOMAIN_ACTION]: {
        context: USER_APPLICATION,
        command: UPDATE,
        payload: newUserApplication
      }
    }
  }
}

export function makeRequestToUpdateUserApplicationWithHasApplied(model, eventData) {
  const formData = eventData.formData;
  const { userApplication } = model;
  const newUserApplication = getUserApplicationUpdates(formData, userApplication);
  newUserApplication.progress.hasApplied = true;

  return {
    output: {
      [DOMAIN_ACTION]: {
        context: USER_APPLICATION,
        command: UPDATE,
        payload: newUserApplication
      }
    }
  }
}

///////
// Action guards
