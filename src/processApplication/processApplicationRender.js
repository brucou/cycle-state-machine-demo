import { a, div, i, p } from 'cycle-snabbdom';
import {
  COMPLETE_YOUR_APPLICATION_FOR, STEP_ABOUT, STEP_QUESTION, STEP_REVIEW, STEP_TEAM_DETAIL,
  STEP_TEAMS,
} from './properties';
import { curry } from "ramda"
import { isBoolean } from "@rxcc/contracts"

//////
// Render function helpers

export function renderHeader(projectName, projectDate) {
  return div(".ui.icon.message", [
    i(".inbox.icon"), // TODO : find a more suitable icon
    div(".content", [
      div(".header", [projectName]),
      p([projectDate])
    ])
  ])
}

export function renderTitle(projectName) {
  return div(".ui.description", [
    p([(`${COMPLETE_YOUR_APPLICATION_FOR} ${projectName}`)])
  ])
}

export function renderProgressIndicator(activeStep) {
  // if we are rendering STEP_TEAM_DETAIL, the progress indicator should show same as STEP_TEAMS
  const _activeStep = activeStep === STEP_TEAM_DETAIL
    ? STEP_TEAMS
    : activeStep;

  return div(".ui.steps", [STEP_ABOUT, STEP_QUESTION, STEP_TEAMS, STEP_REVIEW].map(
    step => {
      return _activeStep === step
        ? a(".active.step", [
          div(".content", [step])
        ])
        : a(".step", [
          div(".content", [step])
        ])
    })
  )
}

export function makeInputProps(fieldValue) {
  // NOTE!!!! The key MUST be passed to indicate to the virtual node library that those node are
  // indeed different
  return {
    value: fieldValue ? fieldValue : '',
    required: false,
  }
}

function _makeErrDiv(validationResult, prop, selector) {
  const isValidatedOrError = validationResult && validationResult[prop];

  return isBoolean(isValidatedOrError)
    ? isValidatedOrError
      ? div(selector, '')
      : div(selector, isValidatedOrError)
    : div(selector, isValidatedOrError);
}

export const makeErrDiv = curry(_makeErrDiv);
