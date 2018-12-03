import { keys } from "ramda"
import { a, button, div, form, i, p, textarea } from "@cycle/dom/lib/index"
import {
  USER_APPLICATION_BACK_TO_TEAMS_SELECTOR, USER_APPLICATION_FORM_INPUT_TEAM_ANSWER_SELECTOR,
  USER_APPLICATION_JOIN_UNJOIN_TEAM_SELECTOR, USER_APPLICATION_TEAM_DETAIL_SCREEN_ANSWER_ERROR_SELECTOR,
  USER_APPLICATION_SKIP_TEAM_SELECTOR
} from "./properties"
import { makeErrDiv, makeInputProps, renderHeader, renderProgressIndicator, renderTitle } from "./renderHelpers"

export function renderTeamDetailScreen(model) {
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
  const latestTeamKey = keys(teams)[latestTeamIndex];
  const { name: teamName, description: teamDescription, question: teamQuestion, answer: teamAnswer, hasBeenJoined } = teams[latestTeamKey];
  const _makeErrDiv = makeErrDiv(validationMessages);

  const divErrorMessage = errorMessage
    ? div('.c-application__error', `An error occurred : ${errorMessage}`)
    : div('.c-application__error', '');

  return {
    outputs: {
      DOM: div('#page', [
        renderHeader(projectName, projectDate),
        renderTitle(projectName),
        renderProgressIndicator(step),
        div(".ui.bottom.attached.segment", [

          div(`${USER_APPLICATION_BACK_TO_TEAMS_SELECTOR}.ui.fluid.negative.button`, {
            "attrs": {
              "tabindex": "0",
            }
          }, [`Back to teams`]),
          div(".ui.divided.selection.list", [
            a(".item", [
              div(".ui.horizontal.label", [teamName]),
              teamDescription
            ])
          ]),
          form(".ui.form", [
            div(".ui.icon.message", [
              i(".inbox.icon"),
              div(".content", [
                div(".header", [teamQuestion]),
                p([`Team lead's name/role`]) // NOTE : left constant, not to complicate fixture
              ])
            ]),
            div(".field", [
              textarea(`${USER_APPLICATION_FORM_INPUT_TEAM_ANSWER_SELECTOR}`, {
                "key": latestTeamIndex,
                "attrs": {
                  "name": "userapp[organizer-question]",
                  "placeholder": "Please enter your answer here"
                },
                "props": makeInputProps(teamAnswer)
              }),
              _makeErrDiv('answer', USER_APPLICATION_TEAM_DETAIL_SCREEN_ANSWER_ERROR_SELECTOR)
            ])
          ])
        ]),
        div(".ui.fluid.buttons", [
          button(`${USER_APPLICATION_SKIP_TEAM_SELECTOR}.ui.button`, [`Skip this team`]),
          div(".or"),
          hasBeenJoined
            ? button(`${USER_APPLICATION_JOIN_UNJOIN_TEAM_SELECTOR}.ui.positive.button`, [`Unjoin team`])
            : button(`${USER_APPLICATION_JOIN_UNJOIN_TEAM_SELECTOR}.ui.positive.button`, [`Join team`])
        ]),
        divErrorMessage
      ])
    },
    updates : []
  }
}
