import Rx from 'rxjs/Rx'
import { events as eventsFactory, states, transitions } from './processApplication/processApplicationFsmDef';
import { keys, mapObjIndexed, prop } from 'ramda'
import { makeStreamingStateMachine } from 'state-transducer'
import { fakeOpportunityKey, fakeProjectKey, fakeUserKey } from "../fixtures"
import { DOM, DOMAIN_ACTION } from "./processApplication/properties"

const $ = Rx.Observable;

// NOTE : we pass :
// - mandatory settings specifying the reactive methods used for the streaming machine (here Rxjs bindings)
// - other relevant data (fixures) necessary for the demo
// to two destinataries :
// - the machine itself
// - the event factories - this was preferred for testing reasons, we thus get factories without closures
const appSettings = {
  // TODO : check $ binds correctly...
  merge: $.merge,
  of: $.of,
  subject_factory : () => new Rx.Subject(),
  userKey: fakeUserKey,
  opportunityKey: fakeOpportunityKey,
  projectKey: fakeProjectKey,
  // NOTE : apparently not necessary
  // emptyUserApplication : getEmptyUserApplicationModel({opportunityKey: fakeOpportunityKey, userKey: fakeUserKey})
};

function getEmptyProject() {
  return {
    name: '',
    description: '',
    ownerProfileKey: ''
  }
}

function getEmptyUserApplicationModel({opportunityKey, userKey}) {
  return {
    user: null, // will have to be filled down the road
    opportunity: {
      description: '',
      authorProfilekey: '',
      isPublic: true,
      name: '',
      project: getEmptyProject(),
      projectKey: '',
      question: '',
      confirmationsOn: false
    },
    teams: {},
    userApplication: {
      opportunityKey: opportunityKey, userKey: userKey,
      about: {
        aboutYou: { superPower: '' },
        personal: { legalName: '', preferredName: '', phone: '', zipCode: '', birthday: '' }
      },
      questions: { answer: '' },
      progress: { step: '', hasApplied: false, hasReviewedApplication: false, latestTeamIndex: 0 },
      teams: {}
    },
    errorMessage: null,
    validationMessages: {}
  }
}

function makeRxStreamingStateMachine(fsmDef) {
  return makeStreamingStateMachine(appSettings, fsmDef)
}

// TODO define fsmDef so that actions is [sink] : action
const fsmDef = {
  states,
  events: keys(eventsFactory),
  transitions,
  initial_extended_state: { },
};
const streamingStateMachine = makeRxStreamingStateMachine(fsmDef);

export function App(sources) {
  // Build the events
  const events = mapObjIndexed((eventFactory, eventName) => {
    return eventFactory(sources, appSettings)
  }, eventsFactory);
  const actions$ = streamingStateMachine(events);
  // TODO : define the format of actions!! will be [sink] : sinkValue

  const sinks = {
    DOM: actions$.map(prop(DOM)).filter(Boolean),
    domainAction$: actions$.map(prop(DOMAIN_ACTION)).filter(Boolean),
  }

  return sinks
}
