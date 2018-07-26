import { Observable as $ } from "rx";
import { div, h4, img } from "cycle-snabbdom";
import { addIndex, curry, keys, map, none, prop } from 'ramda';
import {
  STEP_ABOUT, STEP_APPLIED, STEP_QUESTION, STEP_REVIEW, STEP_TEAM_DETAIL, STEP_TEAMS,
  USER_APPLICATION_TEAM_CONTINUE_BUTTON_SELECTOR, USER_APPLICATION_TEAMLIST_SELECTOR
} from './properties';
import { renderHeader, renderProgressIndicator, renderTitle } from './processApplicationRender';

const mapIndexed = addIndex(map);

function renderTeamScreen(model) {
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

  console.log('renderTeamScreen > continue button disabled', disabledSelector);

  const divErrorMessage = errorMessage
    ? div('.c-application__error', `An error occurred : ${errorMessage}`)
    : div('.c-application__error', '');

  return div('#page', [
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

function render(model) {
  const { userApplication: { progress: { step } } } = model;

  switch (step) {
    case STEP_TEAMS:
      return renderTeamScreen(model);
    case STEP_ABOUT :
    case STEP_QUESTION:
    case STEP_TEAM_DETAIL:
    case STEP_REVIEW:
    case STEP_APPLIED :
    default :
      console.error(`fatal error while rendering ${step}`)
      throw 'render > internal error : unknown steps or step is not TEAMS as expected!!'
  }
}

function _renderComponent(sources, settings) {
  const { model } = settings;

  return {
    DOM: $.just(render(model))
  }
}

export const processApplicationRenderTeamsScreen = curry(_renderComponent);
