import { div, form, h4, i, p, textarea } from 'cycle-snabbdom';
import { curry } from 'ramda';
import {
  STEP_ABOUT, STEP_APPLIED, STEP_QUESTION, STEP_REVIEW, STEP_TEAM_DETAIL, STEP_TEAMS,
  USER_APPLICATION_QUESTION_CONTINUE_BUTTON_SELECTOR, USER_APPLICATION_FORM_INPUT_OPP_ANSWER_SELECTOR,
  USER_APPLICATION_QUESTION_SCREEN_ANSWER_ERROR_SELECTOR
} from './properties';
import { makeErrDiv} from './processApplicationRender';
import { Observable as $ } from "rx";
import {
  makeInputProps, renderHeader, renderProgressIndicator, renderTitle
} from './processApplicationRender';

function renderQuestionScreen(model) {
  const {
    opportunity: {
      description, question
    },
    userApplication: {
      about: {
        aboutYou: { superPower },
        personal: { legalName, preferredName, phone, birthday, zipCode }
      },
      questions: { answer },
      teams,
      progress: { step, hasApplied, latestTeamIndex }
    },
    project: { name, date, location },
    validationMessages,
    errorMessage
  } = model;

  const projectDate = date;
  const projectName = name;
  const oppQuestion = question;
  const _makeErrDiv = makeErrDiv(validationMessages);
  const divErrorMessage = errorMessage
    ? div('.c-application__error', `An error occurred : ${errorMessage}`)
    : div('.c-application__error', '');

  console.info('renderQuestionScreen > question', question);
  console.log('renderQuestionScreen > answer', answer);
  console.log('renderQuestionScreen > validation', validationMessages);

  return div('#page', [
    renderHeader(projectName, projectDate),
    renderTitle(projectName),
    renderProgressIndicator(step),
    div(".ui.bottom.attached.segment", [
      form(".ui.form", [
        h4(".ui.dividing.header", [`Organizer's question`]),
        div(".ui.icon.message", [
          i(".inbox.icon"), // TODO find more suitable icon
          div(".content", [
            div(".header", [oppQuestion]),
            p([`Organizer's name/role`]) // NOTE : left as is to avoid doing fixtures for organizers
          ])
        ]),
        div(".field", [
          textarea(`${USER_APPLICATION_FORM_INPUT_OPP_ANSWER_SELECTOR}`, {
            "key": 0,
            "attrs": {
              "name": "userapp[organizer-question]",
              "placeholder": "Please enter your answer here"
            },
            "props": makeInputProps(answer)
          }),
          _makeErrDiv('answer', USER_APPLICATION_QUESTION_SCREEN_ANSWER_ERROR_SELECTOR),
        ]),
      ])
    ]),
    div(`${USER_APPLICATION_QUESTION_CONTINUE_BUTTON_SELECTOR}.ui.fluid.primary.button`, {
      "attrs": {
        "tabindex": "0",
      }
    }, [`Continue`]),
    divErrorMessage
  ])
}

function render(model) {
  const { userApplication: { progress: { step } } } = model;

  switch (step) {
    case STEP_QUESTION:
      return renderQuestionScreen(model);
    case STEP_ABOUT :
    case STEP_TEAMS:
    case STEP_TEAM_DETAIL:
    case STEP_REVIEW:
    case STEP_APPLIED :
    default :
      console.error(`fatal error while rendering ${step}`)
      throw 'render > internal error : unknown steps or step is not QUESTION as expected!!'
  }
}

function _renderComponent(sources, settings) {
  const { model } = settings;

  return {
    DOM: $.just(render(model))
  }
}

export const processApplicationRenderQuestionScreen = curry(_renderComponent);
