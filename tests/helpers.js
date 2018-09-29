export function computeTimesCircledOn(edgePath, edge) {
  return edgePath.reduce((acc, edgeInEdgePath) => edgeInEdgePath === edge ? acc + 1 : acc, 0);
}
import { mapOverObj } from "fp-rosetree"
import toHTML from "snabbdom-to-html";

function isFunction(obj) {
  return typeof obj === 'function'
}

function isPOJO(obj) {
  const proto = Object.prototype;
  const gpo = Object.getPrototypeOf;

  if (obj === null || typeof obj !== "object") {
    return false;
  }
  return gpo(obj) === proto;
}

export function formatResult(result) {
  if (!isPOJO(result)) {
    return result
  }
  else {
    return mapOverObj({
        key: x => x,
        leafValue: prop => isFunction(prop)
          ? (prop.name || prop.displayName || 'anonymous')
          : Array.isArray(prop)
            ? prop.map(formatResult)
            : prop
      },
      result)
  }
}

export function formatMap(mapObj){
  return Array.from(mapObj.keys()).map(key => ([key, formatFunction(mapObj.get(key))]))
}

export function formatFunction(fn){
  return fn.name || fn.displayName || 'anonymous'
}

export function isArrayOf(predicate) {return obj => Array.isArray(obj) && obj.every(predicate)}

export function isArrayUpdateOperations(obj) {
  return isEmptyArray(obj) || isArrayOf(isUpdateOperation)(obj)
}

export function isEmptyArray(obj) {return Array.isArray(obj) && obj.length === 0}

export function assertContract(contractFn, contractArgs, errorMessage) {
  const boolOrError = contractFn.apply(null, contractArgs)
  const isPredicateSatisfied = isBoolean(boolOrError) && boolOrError;

  if (!isPredicateSatisfied) {
    throw `assertContract: fails contract ${contractFn.name}\n${errorMessage}\n ${boolOrError}`
  }
  return true
}

export function isBoolean(obj) {return typeof(obj) === 'boolean'}
export function isUpdateOperation(obj) {
  return (typeof(obj) === 'object' && Object.keys(obj).length === 0) ||
    (
      ['add', 'replace', 'move', 'test', 'remove', 'copy'].some(op => obj.op === op) &&
      typeof(obj.path) === 'string'
    )
}

export function toHTMLorNull(x) {
  return x ? toHTML(x) : null;
}

export function convertVNodesToHTML(vNodeOrVnodes) {
  if (Array.isArray(vNodeOrVnodes)) {
    return vNodeOrVnodes.map(toHTMLorNull);
  } else {
    return toHTMLorNull(vNodeOrVnodes);
  }
}

export function genNperm(n) {
  if (n === 0) {
    return []
  }
  else if (n === 1) {
    return [[], [1] ]
  }
  else {
    const seed = genNperm(n - 1);
    const nPerm = seed.reduce((acc, perm) => {
      return acc.concat([perm.concat([n])]).concat(perm.map((x, index, arr) => {
        return arr.slice(0, index).concat([n]).concat(arr.slice(index))
      }))
    }, seed)

    return nPerm
  }
}
