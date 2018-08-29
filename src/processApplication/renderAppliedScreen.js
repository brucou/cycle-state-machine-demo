import { div, p } from "@cycle/dom/lib/index"
import { YOU_SUCCESSFULLY_APPLIED } from "./properties"

export function renderAppliedScreen() {
  return {
    outputs: {
      DOM: div(".ui.raised.segment", [
        p([YOU_SUCCESSFULLY_APPLIED])
      ])
    }
  }
}
