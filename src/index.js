import {run} from '@cycle/rxjs-run'
import {makeDOMDriver } from '@cycle/dom'
import {App} from './app'
import * as localForage from "localforage";
// drivers
import { makeDomainActionDriver, makeDomainQueryDriver } from '@rxcc/drivers';
import { defaultUser, loadTestData } from '../fixtures';
// domain
import { domainActionsConfig, domainObjectsQueryMap } from './domain/index';

const repository = localForage;

function makeFakeUserDriver(user) {
  return function fakeUserDriver() {
    // read-only driver, so no need for sink input parameter here
    return $.just(user)
  }
}

function documentDriver(_) {
  void _; // unused sink, this is a read-only driver

  return document
}

// Initialize the database
localForage.config({
  driver: localForage.LOCALSTORAGE, // Force local storage;
  name: 'myApp',
  storeName: 'demo', // Should be alphanumeric, with underscores.
  description: 'emulation of remote storage in local for demo storage needs'
});

Promise.resolve()
// NOTE : comment or uncomment the next line to reinitialize local storage
// .then(() => localForage.clear())
  .then(() => localForage.keys())
  .then(keys => Promise.all(keys.map(key => {
      return localForage.getItem(key).then(value => ({ [key]: value }))
    }
  )))
  .then(x => console.debug(`localForage prerun:`, x))
  .then(() => loadTestData(localForage))
  .then(() => {
    const drivers = {
      DOM: makeDOMDriver('#root'),
      user$: makeFakeUserDriver(defaultUser),
      domainQuery: makeDomainQueryDriver(repository, domainObjectsQueryMap),
      domainAction$: makeDomainActionDriver(repository, domainActionsConfig),
      document: documentDriver,
    };

    run(App, drivers);
  })
  .catch(function (err) {
    console.log(`error while initializing database`, err);
  });

// NOTE : convert html to snabbdom online to http://html-to-hyperscript.paqmind.com/
// ~~ attributes -> attrs
