import { curry, flatten, keys, pick, reduce } from 'ramda';
import { addOpToJsonPatch, getSelectedKey, toJsonPatch } from '../helpers';
import {
  aboutYouFields, personalFields, questionFields, STEP_ABOUT, STEP_QUESTION, STEP_REVIEW, STEP_TEAM_DETAIL, STEP_TEAMS
} from './properties';
import { assertContract } from "@rxcc/contracts"
import { checkUserApplicationContracts } from '../domain/contracts';
import { mergeModelUpdates } from "../../../state-transducer/src"

function _updateModelWithStepOnly(step, model, eventData) {
  return {
    model_update: flatten([addOpToJsonPatch('/userApplication/progress/step', step)])
  }
}

export const updateModelWithStepOnly = curry(_updateModelWithStepOnly);

export function initializeModel(model, eventData, settings) {
  let initialModel;
  const { userKey, opportunityKey, projectKey } = settings;
  const { user, opportunity, teams, project, userApplication } = eventData;
  // opportunity here is the Opportunity whose key is somehow encoded in the URL
  // teams is all the teams for that opportunity

  if (!userApplication) {
    // build the teamsInfo param of user application by mapping team key to initial values
    const teamsInfo = reduce((acc, team) => {
      const { description, name, question, teamKey } = team;
      acc[teamKey] = { description, name, question, answer: '', hasBeenJoined: false };

      return acc
    }, {}, teams);

    initialModel = {
      user: user,
      opportunity: opportunity,
      teams: teams,
      project: project,
      errorMessage: null,
      userApplication: {
        userKey: userKey,
        opportunityKey: opportunityKey,
        about: {
          aboutYou: { superPower: '' },
          personal: { phone: '', preferredName: '', zipCode: '', legalName: '', birthday: '' }
        },
        questions: { answer: '' },
        teams: teamsInfo,
        progress: {
          step: STEP_ABOUT,
          hasApplied: false,
          hasReviewedApplication: false,
          latestTeamIndex: 0
        }
      },
      validationMessages: {}
    }
  }
  else {
    assertContract(checkUserApplicationContracts, [userApplication], `
user application read from the database is corrupted. 
Please check fields for correctness vs. expected format
`);

    initialModel = {
      user,
      opportunity,
      teams,
      project,
      userApplication,
      errorMessage: null,
      validationMessages: {}
    }
  }

  return { model_update: toJsonPatch('')(initialModel) };
}

export const initializeModelAndStepReview = mergeModelUpdates([
  initializeModel,
  updateModelWithStepOnly(STEP_REVIEW)
]);

function _updateModelWithStepAndError(updateModelFn, step, model,
                                      eventData, actionResponse) {
  console.log('_updateModelWithStepAndError');
  const { err } = actionResponse;

  return flatten([
    updateModelFn(model, eventData.formData, actionResponse),
    addOpToJsonPatch('/userApplication/progress/step', step),
    addOpToJsonPatch('/errorMessage', err ? err.toString() : 'internal error! there should be an error message')
  ])
}

export const updateModelWithStepAndError = curry(_updateModelWithStepAndError);

export const updateModelWithAboutDataAndStepQuestion = mergeModelUpdates([
  updateModelWithAboutData,
  updateModelWithEmptyErrorMessages,
  updateModelWithStepOnly(STEP_QUESTION)
]);

export const updateModelWithAboutDataAndStepReview = mergeModelUpdates([
  updateModelWithAboutData,
  updateModelWithEmptyErrorMessages,
  updateModelWithStepOnly(STEP_REVIEW)
]);

export function updateModelWithAboutData(model, eventData) {
  console.log('updateModelWithAboutData');
  const formData = eventData.formData;

  return {
    model_update: flatten([
      toJsonPatch('/userApplication/about/aboutYou')(pick(aboutYouFields, formData)),
      toJsonPatch('/userApplication/about/personal')(pick(personalFields, formData)),
    ])
  }
}

export function updateModelWithEmptyErrorMessages(model, eventData) {
  console.log('updateModelWithEmptyErrorMessages');

  return {
    model_update: flatten([toJsonPatch('/validationMessages')({}), toJsonPatch('/errorMessage')(null)])
  }
}

export function updateModelWithQuestionDataAndStepReview(model, eventData) {
  console.log('updateModelWithQuestionDataAndStepReview');
  const formData = eventData.formData;

  return {
    model_update: flatten([
      patchModelWithQuestionData(formData),
      addOpToJsonPatch('/userApplication/progress/step', STEP_REVIEW),
    ])
  }
}

export function updateModelWithQuestionData(model, eventData) {
  console.log('updateModelWithQuestionData');
  const formData = eventData.formData;

  return {
    model_update: patchModelWithQuestionData(formData)
  }
}

export const updateModelWithQuestionDataAndTeamsStep = mergeModelUpdates([
  updateModelWithQuestionData,
  updateModelWithEmptyErrorMessages,
  updateModelWithStepOnly(STEP_TEAMS)
]);

function patchModelWithQuestionData(formData) {
  return flatten([
      toJsonPatch('/userApplication/questions')(pick(questionFields, formData)),
      addOpToJsonPatch('/userApplication/progress/step', STEP_TEAMS),
      addOpToJsonPatch('/validationMessages', {}),
      addOpToJsonPatch('/errorMessage', null),
    ])
}

export function updateModelWithSelectedTeamData(model, eventData) {
  const selectedTeamIndex = eventData;

  console.log('updateModelWithSelectedTeamData', eventData);

  return {
    model_update: flatten([
      addOpToJsonPatch('/userApplication/progress/latestTeamIndex', selectedTeamIndex),
      addOpToJsonPatch('/userApplication/progress/step', STEP_TEAM_DETAIL),
    ])
  }
}

export function updateModelWithSkippedTeamData(model, eventData) {
  const { userApplication: { progress: { latestTeamIndex }, teams } } = model;
  const teamKeys = keys(teams);
  const numberOfTeams = teamKeys.length;
  const selectedTeamKey = getSelectedKey(latestTeamIndex, teamKeys);
  const { formData: { answer } } = eventData;
  // loop back to first team if met end of teams
  const nextTeamIndex = (latestTeamIndex + 1) % numberOfTeams;

  console.log('updateModelWithSkippedTeamData', latestTeamIndex, selectedTeamKey, nextTeamIndex, answer);

  return {
    model_update: flatten([
      addOpToJsonPatch('/validationMessages', {}),
      addOpToJsonPatch('/userApplication/progress/latestTeamIndex', nextTeamIndex),
      addOpToJsonPatch('/userApplication/progress/step', STEP_TEAM_DETAIL),
      addOpToJsonPatch(`/userApplication/teams/${selectedTeamKey}/answer`, answer),
    ])
  }
}

export function updateModelWithJoinedOrUnjoinedTeamData(model, eventData) {
  const { userApplication: { teams, progress: { latestTeamIndex } } } = model;
  const teamKeys = keys(teams);
  const numberOfTeams = teamKeys.length;
  const selectedTeamKey = getSelectedKey(latestTeamIndex, teamKeys);
  const { formData: { answer } } = eventData;
  const { hasBeenJoined } = teams[selectedTeamKey];
  // loop back to first team if met end of teams
  const nextTeamIndex = (latestTeamIndex + 1) % numberOfTeams;

  console.log('updateModelWithJoinedTeamData', latestTeamIndex, nextTeamIndex, selectedTeamKey, hasBeenJoined);

  return {
    model_update: flatten([
      addOpToJsonPatch('/validationMessages', {}),
      addOpToJsonPatch('/userApplication/progress/latestTeamIndex', nextTeamIndex),
      addOpToJsonPatch('/userApplication/progress/step', STEP_TEAM_DETAIL),
      addOpToJsonPatch(`/userApplication/teams/${selectedTeamKey}/answer`, answer),
      addOpToJsonPatch(`/userApplication/teams/${selectedTeamKey}/hasBeenJoined`, !hasBeenJoined),
    ])
  }
}

export const updateModelWithTeamDetailAnswerAndNextStep = mergeModelUpdates([
  updateModelWithStepOnly(STEP_TEAMS),
  updateModelWithTeamDetailAnswerData
]);

export function updateModelWithStepAndHasReviewed(model, eventData) {
  return {
    model_update: flatten([
      addOpToJsonPatch('/userApplication/progress/step', STEP_REVIEW),
      addOpToJsonPatch('/userApplication/progress/hasReviewedApplication', true),
    ])
  }
}

export function updateModelWithAppliedData(model, eventData) {
  return {
    model_update: flatten([addOpToJsonPatch('/userApplication/progress/hasApplied', true),])
  }
}

function updateModelWithValidationData(model, eventData) {
  const { validationData } = eventData;
  console.log('updateModelWithValidationData', validationData);

  return {
    model_update: toJsonPatch('/validationMessages')(validationData)
  }
}

function updateModelWithTeamDetailAnswerData(model, eventData) {
  const { userApplication: { progress: { latestTeamIndex }, teams } } = model;
  const teamKeys = keys(teams);
  const selectedTeamKey = getSelectedKey(latestTeamIndex, teamKeys);
  const { answer } = eventData;

  console.log('updateModelWithTeamDetailAnswerData', latestTeamIndex, selectedTeamKey, answer);

  return {
    model_update: flatten([
      addOpToJsonPatch(`/userApplication/teams/${selectedTeamKey}/answer`, answer),
    ])
  }
}

export const updateModelWithTeamDetailValidationMessages = mergeModelUpdates([
  updateModelWithTeamDetailAnswerData,
  updateModelWithValidationData,
  updateModelWithStepOnly(STEP_TEAM_DETAIL)
]);

export const updateModelWithAboutStepValidationMessages = mergeModelUpdates([
  updateModelWithAboutData,
  updateModelWithValidationData,
  updateModelWithStepOnly(STEP_ABOUT)
]);

export const updateModelWithQuestionValidationMessages = mergeModelUpdates([
  updateModelWithQuestionData,
  updateModelWithValidationData,
  updateModelWithStepOnly(STEP_QUESTION)
]);
