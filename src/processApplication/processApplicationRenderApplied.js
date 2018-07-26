import { YOU_SUCCESSFULLY_APPLIED } from "./properties"
import { div, p } from "cycle-snabbdom";
import { Observable as $ } from "rx";

function render() {
  return div(".ui.raised.segment", [
    p([YOU_SUCCESSFULLY_APPLIED])
  ])
}

export function processApplicationRenderApplied(sources, settings) {
  // This is a transient state - display some loading indicator

  return {
    DOM: $.just(render())
  }
}
