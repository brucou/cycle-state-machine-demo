import { button, div, i, img, p } from "@cycle/dom/lib/index"
import {
  ABOUT_YOU, USER_APPLICATION_REVIEW_ABOUT_SELECTOR, USER_APPLICATION_REVIEW_OPP_QUESTION_SELECTOR,
  USER_APPLICATION_REVIEW_SUBMIT_SELECTOR, USER_APPLICATION_REVIEW_TEAMS_SELECTOR
} from "./properties"
import { complement, isNil, mapObjIndexed, values } from "ramda"
import { makeErrDiv, renderHeader, renderProgressIndicator } from "./renderHelpers"

export function renderReviewScreen(model) {
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
  const oppAnswer = answer;
  const _makeErrDiv = makeErrDiv(validationMessages);
  const divErrorMessage = errorMessage
    ? div('.c-application__error', `An error occurred : ${errorMessage}`)
    : div('.c-application__error', '');

  return {
    outputs: {
      DOM: div('#page', [
        renderHeader(projectName, projectDate),
        div(".ui.description", [
          p([`Does this look good ?`])
        ]),
        renderProgressIndicator(step),
        div(".ui.one.cards", [
          div(".card", [
            div(".content", [
              i(`${USER_APPLICATION_REVIEW_ABOUT_SELECTOR}.right.floated.edit.icon`),
              div(".header", [ABOUT_YOU]),
              div(".ui.list", [
                div(".item", [
                  div(".ui.button", [
                    i(".info.icon")
                  ]),
                  superPower
                ]),
                div(".item", [
                  div(".ui.button", [
                    i(".user.outline.icon")
                  ]),
                  legalName + " (" + preferredName + ")"
                ]),
                div(".item", [
                  div(".ui.button", [
                    i(".text.telephone.icon")
                  ]),
                  phone
                ]),
                div(".item", [
                  div(".ui.button", [
                    i(".birthday.icon")
                  ]),
                  date
                ]),
                div(".item", [
                  div(".ui.button", [
                    i(".info.icon")
                  ]),
                  zipCode
                ])
              ]),
            ])
          ])
        ]),
        div(".ui.one.cards", [
          div(".card", [
            div(".content", [
              i(`${USER_APPLICATION_REVIEW_OPP_QUESTION_SELECTOR}.right.floated.edit.icon`),
              div(".header", [`Organizer's question`]),
              div(".ui.list.message", [
                div(".item", [
                  img(".ui.avatar.image", {
                    "attrs": {
                      "src": "./assets/images/avatar/small/matt.jpg",
                      "className": "ui avatar image"
                    }
                  }),
                  div(".content", [
                    div(".header", [oppQuestion]),
                    'Organizer name and role' // NOTE : fixed content for now
                  ])
                ])
              ]),
              div(".description", [
                img(".ui.floated.right.avatar.image", {
                  "attrs": {
                    "src": "./assets/images/avatar/large/elliot.jpg",
                    "className": "ui floated right avatar image"
                  }
                }),
                p([oppAnswer])
              ])
            ])
          ])
        ]),
        div(".ui.one.cards", [
          div(".card", [
            div(".content", [
              i(`${USER_APPLICATION_REVIEW_TEAMS_SELECTOR}.right.floated.edit.icon`),
              div(".header", [`Team selection`]),
              div(".ui.list",
                values(mapObjIndexed((team, teamKey) => {
                  const { description, name, question, hasBeenJoined, answer } = team;

                  return hasBeenJoined
                    ? div(".item", [div(".ui.button", [i(".info.icon")]), name])
                    : null
                }, teams)).filter(complement(isNil))
              )
            ])
          ])
        ]),
        div(".ui.basic.segment", [
          button(`${USER_APPLICATION_REVIEW_SUBMIT_SELECTOR}.ui.fluid.primary.button`, [`Apply for the things`])
        ]),
        divErrorMessage
      ])
    },
    updates : []
  }
}
