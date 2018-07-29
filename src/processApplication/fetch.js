import { OPPORTUNITY, PROJECTS, TEAMS, USER_APPLICATION } from '../domain';
import Rx from 'rxjs/Rx';
import {
  USER_APPLICATION_FORM_INPUT_BIRTHDAY_SELECTOR, USER_APPLICATION_FORM_INPUT_LEGAL_NAME_SELECTOR,
  USER_APPLICATION_FORM_INPUT_OPP_ANSWER_SELECTOR, USER_APPLICATION_FORM_INPUT_PHONE_SELECTOR,
  USER_APPLICATION_FORM_INPUT_PREFERRED_NAME_SELECTOR, USER_APPLICATION_FORM_INPUT_SUPERPOWER_SELECTOR,
  USER_APPLICATION_FORM_INPUT_TEAM_ANSWER_SELECTOR, USER_APPLICATION_FORM_INPUT_ZIPCODE_SELECTOR
} from "./properties"

const $ = Rx.Observable;

export function getInputValue(document, sel) {
  const el = document.querySelector(sel);
  return el ? el.value : ''
}

//////
// Form data fetching
export function getAboutFormData(document) {
  return {
    'superPower': getInputValue(document, USER_APPLICATION_FORM_INPUT_SUPERPOWER_SELECTOR),
    'legalName': getInputValue(document, USER_APPLICATION_FORM_INPUT_LEGAL_NAME_SELECTOR),
    'preferredName': getInputValue(document, USER_APPLICATION_FORM_INPUT_PREFERRED_NAME_SELECTOR),
    'phone': getInputValue(document, USER_APPLICATION_FORM_INPUT_PHONE_SELECTOR),
    'birthday': getInputValue(document, USER_APPLICATION_FORM_INPUT_BIRTHDAY_SELECTOR),
    'zipCode': getInputValue(document, USER_APPLICATION_FORM_INPUT_ZIPCODE_SELECTOR)
  }
}

export function getQuestionFormData(document) {
  return {
    'answer': getInputValue(document, USER_APPLICATION_FORM_INPUT_OPP_ANSWER_SELECTOR),
  }
}

export function getTeamDetailFormData(document) {
  return {
    'answer': getInputValue(document, USER_APPLICATION_FORM_INPUT_TEAM_ANSWER_SELECTOR),
  }
}

//////
// Remote repository data fetching
export function fetchUserApplication(domainQuery, opportunityKey, userKey) {
  return domainQuery.getCurrent(USER_APPLICATION, { userKey, opportunityKey })
}

export function fetchTeams(domainQuery, projectKey) {
  return domainQuery.getCurrent(TEAMS, { projectKey });
}

export function fetchOpportunity(domainQuery, opportunityKey) {
  return domainQuery.getCurrent(OPPORTUNITY, { opportunityKey })
}

export function fetchProject(domainQuery, projectKey) {
  return domainQuery.getCurrent(PROJECTS, { projectKey })
}

export function fetchUserApplicationModelData(sources, settings) {
  const { user$, domainQuery } = sources;
  const { opportunityKey, userKey, projectKey } = settings;

  const userApp$ = fetchUserApplication(domainQuery, opportunityKey, userKey);
  const teams$ = fetchTeams(domainQuery, projectKey);
  const opportunities$ = fetchOpportunity(domainQuery, opportunityKey);
  const project$ = fetchProject(domainQuery, projectKey);

  // NOTE : combineArray will produce its first value when all its dependent streams have
  // produced their first value. Hence this is equivalent to a zip for the first value, which
  // is the only one we need anyways (there is no zipArray in most)
  return $.combineLatest(
    [user$, opportunities$, project$, userApp$, teams$],
    (user, opportunity, project, userApplication, teams) =>
      ({
        user,
        opportunity,
        project,
        userApplication,
        teams,
        errorMessage: null,
        validationMessages: {}
      })
  )
  // NOTE : that is done later in the end (in the guard) : TODO : think : better here?
  // .map(model => {
  //   return model.userApplication
  //     ? model
  //     : emptyUserApplication
  // })
    .take(1)
}
