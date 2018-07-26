import { assertContract } from "@rxcc/contracts"
import { checkUserApplicationContracts } from './contracts';

export const OPPORTUNITY = 'OPPORTUNITY';
export const USER_APPLICATION = 'USERAPP';
export const TEAMS = 'TEAMS';
export const PROJECTS = 'PROJECTS';
export const OPPORTUNITY_REF = 'Opps';
export const USER_APPLICATION_REF = 'UserApplications';
export const TEAMS_REF = 'Teams';
export const USERS_REF = 'Users';
export const PROJECTS_REF = 'Projects';
export const UPDATE = 'Update';

const KEY_SEP = '!';

function makeUserAppKey(USER_APPLICATION_REF, USERS_REF, userKey, OPPORTUNITY_REF, opportunityKey) {
  return [USER_APPLICATION_REF, USERS_REF, userKey, OPPORTUNITY_REF, opportunityKey].join(KEY_SEP);
}

export const domainObjectsQueryMap = {
  [PROJECTS]: {
    get: function getProjectByProjectKey(repository, context, params) {
      const { projectKey } = params;
      const localforageKey = [PROJECTS_REF, projectKey].join(KEY_SEP);

      return repository.getItem(localforageKey);
    }
  },
  [OPPORTUNITY]: {
    get: function getOpportunityByOppKey(repository, context, params) {
      const { opportunityKey } = params;
      const localforageKey = [OPPORTUNITY_REF, opportunityKey].join(KEY_SEP);

      return repository.getItem(localforageKey);
    }
  },
  [TEAMS]: {
    get: function getTeamsByProjectKey(repository, context, params) {
      const { projectKey } = params;
      const localforageKey = [TEAMS_REF, projectKey].join(KEY_SEP);

      return repository.getItem(localforageKey);
    }
  },
  [USER_APPLICATION]: {
    get: function getUserAppByOppAndUserKeys(repository, context, params) {
      const { opportunityKey, userKey } = params;
      const localforageKey = makeUserAppKey(USER_APPLICATION_REF, USERS_REF, userKey, OPPORTUNITY_REF, opportunityKey);

      return repository.getItem(localforageKey);
    }
  },
};

export const domainActionsConfig = {
  [USER_APPLICATION]: {
    [UPDATE]: function updateUserApplication(repository, context, payload) {
      void context;

      // Check command contracts
      assertContract(checkUserApplicationContracts, [payload],
        `UserApplication's user and opportunity keys cannot be null!`);

      const { userKey, opportunityKey } = payload;
      const localforageKey = makeUserAppKey(USER_APPLICATION_REF, USERS_REF, userKey, OPPORTUNITY_REF, opportunityKey);

      console.log('update user application:', context, localforageKey, payload);

      return repository.setItem(localforageKey, payload);
    }
  },
};
