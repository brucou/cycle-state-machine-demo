import Rx from 'rxjs/Rx'
import { events as eventsFactory, states, transitions } from './processApplication/fsmSpecs';
import { keys, mapObjIndexed, prop } from 'ramda'
import { makeStreamingStateMachine } from '../../state-transducer/src'
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
  // NOTE: that is because rxjs v5 merge does not accept arrays anymore
  merge: function merge(arrayObs) {return $.merge(...arrayObs)},
  of: $.of,
  subject_factory : () => {
    const subject = new Rx.Subject();
    // NOTE : this is for Rxjs v4-5!! hopefully the prototype information is not needed...
    subject.emit = subject.next || subject.onNext;
    return subject
  },
  userKey: fakeUserKey,
  opportunityKey: fakeOpportunityKey,
  projectKey: fakeProjectKey,
  // NOTE : apparently not necessary
  // emptyUserApplication : getEmptyUserApplicationModel({opportunityKey: fakeOpportunityKey, userKey: fakeUserKey})
};

function makeRxStreamingStateMachine(fsmDef) {
  return makeStreamingStateMachine(appSettings, fsmDef)
}

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

  const sinks = {
    DOM: actions$.map(prop(DOM)).filter(Boolean),
    domainAction$: actions$.map(prop(DOMAIN_ACTION)).filter(Boolean),
  }

  return sinks
}
