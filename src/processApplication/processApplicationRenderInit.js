import { LOADING_USER_APPLICATION_DATA } from "./properties"
import { div } from '@cycle/dom'

export function renderInitScreen(model, eventData, settings) {
  // This is a transient state - display some loading indicator
  return {
    model_update: [],
    output: { DOM: div(LOADING_USER_APPLICATION_DATA) }
  }
}
