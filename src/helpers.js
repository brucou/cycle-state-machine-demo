import {mergeAll} from 'ramda'

/**
 * 'Merge' in some ways the array of output passed as parameter. The output type often exhibit a monoidal structure,
 * allowing to derive a merge (monoidal concat) operation.
 * @param {Array<Output>} arrayOutputs
 */
export function mergeOutputFn(arrayOutputs){
  // NOTE : that will work when all outputs are for different sinks
  // of outputs with same sinks only the last one will be kept.
  // That is ok for this demo. A fuller version would agregate the
  // same sinks value in an array
  return mergeAll(arrayOutputs)
}
