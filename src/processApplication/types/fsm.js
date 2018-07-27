/**
 * @typedef {Object} FSM_Def
 * @property {Object.<Control_State, *>} states Object whose every key is a control state admitted by the
 * specified state machine
 * @property {Array<EventLabel>} events
 * @property {Array<Transition>} transitions
 * @property {*} initial_extended_state
 */
/**
 * @typedef {String} Event_Label
 */
/**
 * @typedef {String} Control_State Name of the control state
 */
/**
 * @typedef {Inconditional_Transition | Conditional_Transition} Transition
 */
/**
 * @typedef {function(model:*, event_data:*, settings:FSM_Settings) : Actions} ActionFactory
 */
/**
 * @typedef {{model_update : Array<JSON_Patch_Operation>, output : *}} Actions The actions to be performed by the
 * state machine in response to a transition. `model_update` represents the state update for the variables
 * of the extended state machine. `output` represents the output of the state machine passed to the API caller.
 */
/**
 * @typedef {{from: Control_State, to:Control_State, event:Event_Label, action : ActionFactory}}
 *   Inconditional_Transition encodes transition with no guards attached. Every time the specified event occurs, and
 *   the machine is in the specified state, it will transition to the target control state, and invoke the action
 *   returned by the action factory
 */
/**
 * @typedef {{from : Control_State, guards : Array<Condition>}} Conditional_Transition Transition for the
 * specified state is contingent to some guards being passed. Those guards are defined as an array.
 *
 */
/**
 * @typedef {{predicate : Predicate, to : Control_State, action : ActionFactory}} Condition On satisfying the
 * specified predicate, the received event data will trigger the transition to the specified target control state
 * and invoke the action created by the specified action factory, leading to an update of the internal state of the
 * extended state machine and possibly an output to the state machine client.
 *
 */
/**
 * @typedef {function (*=) : Boolean} Predicate
 *
 */
/**
 * @typedef {*} FSM_Settings
 *
 */
/**
 * @typedef {*} FSM_Model
 *
 */
