import Rx from 'rxjs/Rx'
import { eventsFactory, fsm as fsmDef } from './processApplication/fsmSpecs';
import { mapObjIndexed, prop } from 'ramda'
import { makeStreamingStateMachine } from 'state-transducer'
// import { makeStreamingStateMachine } from '../../state-transducer/src'
import { fakeOpportunityKey, fakeProjectKey, fakeUserKey } from "../fixtures"
import { DOM, DOMAIN_ACTION } from "./processApplication/properties"
import { applyPatch } from "json-patch-es6/lib/duplex"

const $ = Rx.Observable;

/**
 *
 * @param {FSM_Model} model
 * @param {Operation[]} modelUpdateOperations
 * @returns {FSM_Model}
 */
function applyJSONpatch(model, modelUpdateOperations) {
  // NOTE : we don't validate operations, to avoid throwing errors when for instance the value property for an
  // `add` JSON operation is `undefined` ; and of course we don't mutate the document in place
  return applyPatch(model, modelUpdateOperations, false, false).newDocument;
}

// NOTE : we pass :
// - mandatory settings specifying the reactive methods used for the streaming machine (here Rxjs bindings)
// - other relevant data (fixtures) necessary for the demo
// to two destinataries :
// - the machine itself
// - the event factories - this was preferred for testing reasons, we thus get factories without closures
const appSettings = {
  updateState: applyJSONpatch,
  // NOTE: that is because rxjs v5 merge does not accept arrays anymore
  merge: function merge(arrayObs) {return $.merge(...arrayObs)},
  from: $.from,
  map: (mapFn, obs) => obs.map(mapFn),
  filter: (filterFn, obs) => obs.filter(filterFn),
  flatMap: (fn, obs) => obs.flatMap(fn),
  share: (obs) => obs.share(),
  userKey: fakeUserKey,
  opportunityKey: fakeOpportunityKey,
  projectKey: fakeProjectKey,
};

function makeRxStreamingStateMachine(fsmDef) {
  return makeStreamingStateMachine(appSettings, fsmDef)
}

const streamingStateMachine = makeRxStreamingStateMachine(fsmDef);

export function App(sources) {
  const events = mapObjIndexed((eventFactory, eventName) => {
    return eventFactory(sources, appSettings)
  }, eventsFactory);
  const actions$ = streamingStateMachine(events);

  const sinks = {
    DOM: actions$
      .map(prop(DOM))
      .filter(Boolean),
    domainAction$: actions$.map(prop(DOMAIN_ACTION)).filter(Boolean),
  }

  return sinks
}
