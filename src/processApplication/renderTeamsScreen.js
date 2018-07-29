import { addIndex, keys, map, none } from "ramda"
import { div, h4, img } from "@cycle/dom/lib/index"
import { USER_APPLICATION_TEAM_CONTINUE_BUTTON_SELECTOR, USER_APPLICATION_TEAMLIST_SELECTOR } from "./properties"
import { renderHeader, renderProgressIndicator, renderTitle } from "./renderHelpers"

const mapIndexed = addIndex(map);

export function renderTeamScreen(model) {
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
  // disabled true <=> hasJoinedAtLeastOneTeam
  const disabledSelector = none(teamKey => {
    return teams[teamKey].hasBeenJoined
  }, keys(teams)) ? '.disabled' : '';

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
          h4(".ui.dividing.header", [`Select a team`]),
          div(`${USER_APPLICATION_TEAMLIST_SELECTOR}.ui.list`,
            mapIndexed((teamKey, index) => {
              const { description, name, question, hasBeenJoined, answer } = teams[teamKey];

              return void 0,
                div(".item", [
                  div(".right.floated.content", [
                    div(".ui.button", [hasBeenJoined ? `O` : 'X'])
                  ]),
                  img(".ui.avatar.image", {
                    "attrs": {
                      "src": `./assets/images/teams/${name}.jpg`, // NOTE : same image to
                      // simplify demo
                    }
                  }),
                  div(".content", {
                    "attrs": { 'data-index': index }
                  }, [name])
                ])
            }, keys(teams)),
          )
        ]),
        div(`${USER_APPLICATION_TEAM_CONTINUE_BUTTON_SELECTOR}${disabledSelector}.ui.fluid.primary.button`, {
          "attrs": {
            "tabindex": "0",
          }
        }, [`Continue`]),
        divErrorMessage
      ])
    }
  }
}
