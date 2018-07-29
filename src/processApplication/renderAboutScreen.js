import { div, form, h4, input } from "@cycle/dom/lib/index"
import {
  ABOUT_YOU, BIRTHDAY, CONTINUE, PERSONAL_DETAILS, PREFERRED_NAME, USER_APPLICATION_ABOUT_CONTINUE_BUTTON_SELECTOR,
  USER_APPLICATION_ABOUT_SCREEN_BIRTHDAY_ERROR_SELECTOR, USER_APPLICATION_ABOUT_SCREEN_LEGAL_NAME_ERROR_SELECTOR,
  USER_APPLICATION_ABOUT_SCREEN_PHONE_ERROR_SELECTOR, USER_APPLICATION_ABOUT_SCREEN_PREFERRED_NAME_ERROR_SELECTOR,
  USER_APPLICATION_ABOUT_SCREEN_SUPERPOWER_ERROR_SELECTOR, USER_APPLICATION_ABOUT_SCREEN_ZIPCODE_ERROR_SELECTOR,
  USER_APPLICATION_FORM_INPUT_BIRTHDAY_SELECTOR, USER_APPLICATION_FORM_INPUT_LEGAL_NAME_SELECTOR,
  USER_APPLICATION_FORM_INPUT_PHONE_SELECTOR, USER_APPLICATION_FORM_INPUT_PREFERRED_NAME_SELECTOR,
  USER_APPLICATION_FORM_INPUT_SUPERPOWER_SELECTOR, USER_APPLICATION_FORM_INPUT_ZIPCODE_SELECTOR,
  WHAT_IS_YOUR_SUPER_POWER, ZIPCODE
} from "./properties"
import { makeErrDiv, makeInputProps, renderHeader, renderProgressIndicator, renderTitle } from "./renderHelpers"

export function renderAboutScreen(model, eventData, settings) {
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

  const _makeErrDiv = makeErrDiv(validationMessages);
  const divErrorMessage = errorMessage
    ? div('.c-application__error', `An error occurred : ${errorMessage}`)
    : div('.c-application__error', '');

  return {
    output: {
      DOM: div('#page', [
        renderHeader(projectName, projectDate),
        renderTitle(projectName),
        renderProgressIndicator(step),
        div(".ui.bottom.attached.segment", [
          form(".ui.form", [
            h4(".ui.dividing.header", [ABOUT_YOU]),
            div(".field", [
              input(`${USER_APPLICATION_FORM_INPUT_SUPERPOWER_SELECTOR}`, {
                "key": 0,
                "attrs": {
                  "type": "text",
                  "name": "userapp[superpower]",
                  "placeholder": WHAT_IS_YOUR_SUPER_POWER
                },
                "props": makeInputProps(superPower),
              }),
              _makeErrDiv('superPower', USER_APPLICATION_ABOUT_SCREEN_SUPERPOWER_ERROR_SELECTOR)
            ]),
            h4(".ui.dividing.header", [PERSONAL_DETAILS]),
            div(".field", [
              input(`${USER_APPLICATION_FORM_INPUT_LEGAL_NAME_SELECTOR}`, {
                "key": 1,
                "attrs": {
                  "type": "text",
                  "name": "userapp[legal-name]",
                  "placeholder": "Legal name"
                },
                "props": makeInputProps(legalName),
              }),
              _makeErrDiv('legalName', USER_APPLICATION_ABOUT_SCREEN_LEGAL_NAME_ERROR_SELECTOR)
            ]),
            div(".field", [
              input(`${USER_APPLICATION_FORM_INPUT_PREFERRED_NAME_SELECTOR}`, {
                "key": 2,
                "attrs": {
                  "type": "text",
                  "name": "userapp[preferred-name]",
                  "placeholder": PREFERRED_NAME
                },
                "props": makeInputProps(preferredName),
              }),
              _makeErrDiv('preferredName', USER_APPLICATION_ABOUT_SCREEN_PREFERRED_NAME_ERROR_SELECTOR)
            ]),
            div(".field", [
              input(`${USER_APPLICATION_FORM_INPUT_PHONE_SELECTOR}`, {
                "key": 3,
                "attrs": {
                  "type": "text",
                  "name": "userapp[phone]",
                  "placeholder": "Phone"
                },
                "props": makeInputProps(phone),
              }),
              _makeErrDiv('phone', USER_APPLICATION_ABOUT_SCREEN_PHONE_ERROR_SELECTOR)
            ]),
            div(".two.fields", [
              div(".field", [
                input(`${USER_APPLICATION_FORM_INPUT_BIRTHDAY_SELECTOR}`, {
                  "key": 4,
                  "attrs": {
                    "type": "text",
                    "name": "userapp[birthday]",
                    "placeholder": BIRTHDAY
                  },
                  "props": makeInputProps(birthday),
                }),
                _makeErrDiv('birthday', USER_APPLICATION_ABOUT_SCREEN_BIRTHDAY_ERROR_SELECTOR)
              ]),
              div(".field", [
                input(`${USER_APPLICATION_FORM_INPUT_ZIPCODE_SELECTOR}`, {
                  "key": 5,
                  "attrs": {
                    "type": "text",
                    "name": "userapp[zip-code]",
                    "placeholder": ZIPCODE
                  },
                  "props": makeInputProps(zipCode),
                }),
                _makeErrDiv('zipCode', USER_APPLICATION_ABOUT_SCREEN_ZIPCODE_ERROR_SELECTOR)
              ])
            ])
          ])
        ]),
        div(`${USER_APPLICATION_ABOUT_CONTINUE_BUTTON_SELECTOR}.ui.fluid.primary.button`, {
          "attrs": {
            "tabindex": "0",
          }
        }, [CONTINUE]),
        divErrorMessage
      ])
    }
  }
}
