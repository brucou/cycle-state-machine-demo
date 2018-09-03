# TODO
- write tests for the automata, not the streaming version, the standard version
  - so make all the scenarios

- continue program in app
  - write fsm first in separate branch without hierarchy
  - make that work, merge that into master
  - in other branch from master, refine into hierarchies as defined in #features
  - make it work
  - merge new branch into master

# Features
sooo. keep the same state machine design. REFINE every state. 

- Fetch state : fetch ok -> next, fetch error -> display error and retry 5 times with exponential
 xxx s, then fail definitely with an error screen, also inside the fetch
- About screen : save ok -> good, save fails -> ignore, so no need to refine, just send the save 
: optimistic save
- etc except Teams screen : block transition till save is ok! if not ok stay in same state and 
display error : pessimistic save
- same for Review screen : DO NOT transition till save is OK!


so we have exemplified : retry logic, cancellation logic (NO), optimistic save, blocking save
In the pending state : display a loader

# involve geraud henrion in designing my debug tool

# tests
- write model : state machine but no need for the function implementation, or guard implementation
- generate inputs
- generate the output for those inputs according to model
- run implementation

So we are in a state S with guards G(S) corresponding to events E(S)<E, actions A(G, S) to 
transition T(G, S)
We have generate inputs sequence (I) leading to a machine in State S.
We want to generate (I) + (J) where J is a new sequence of events which cover all the guards G(S).
So we need a generator function which can emit event data passing each guard. that generator 
function must thus depend on the current extended state of the state machine
So we have a state machine with the same states and guards with actions (to generate expected 
output), and a generator function for each state.
generator function can be composed (one generator per guard, then assembly to have one generator 
for all guards, maybe using probabilities) 

- start with [] sequence, with tested machine in INIT state
- I have to generate an {event_label : event_data}
- for every event (accepted by the state machine! including those not handled in that state!!), for 
all possible transitions, i.e. for each guard have a generator function which generates data 
which passes every combination of T/F for each transition, including fulfilling no guard if 
that's possible. The generator should be configurable to be biased to favor some paths more than 
others. So a generator generates an {event_label : event_data} on every call.
- OR pick a probability distribution to pick a (event_label, guard) to produce {event_label : 
event_data}
- so each state has a probably distribution between events, and then between guards (or between 
event-guard gathered together?? mmm NO)
- once I have the event, I know what is the satisfied guard. I know which is the target control 
state, and I should know what is the output (but not the extended state otherwise I know the 
implementation beforehand).. So the guards passed should not be based on the external state, but
 on the specifications (for instance wireframes). Another question is to compute coverage values 
 for the state machine...
 - once I have [I0] and associated expected [O0] (actually not `O0` but a predicate that `O0` 
 passes), and a S0 in the model state machine; repeat the algorithm from S0
- be careful about loops, state A -> B -> A ! in the generator pass some state about the 
generation?? NO
- so because all paths are taken with different probabilities the graph is thoroughly searched

1. generate input sequence, and then check properties on the actual output sequence
2. generate random input sequence, generate oracle output sequence, then compare vs. actual sequence
  - trying to exploit the causality property of automata
3. generate controlled input sequence from fixed values to easy the oracle output computation, then 
compare vs. actual sequence
4. generate user scenario (start state, end state) and input sequence fulfilling these scenario
Note that input sequences are user scenarios. It would be interested to name them. Input 
scenarios can be coalesced in group 

so I have an additive tree of inputs 

- have the same FSM adding
  - input generator :: OriginState -> TargetState -> InputSequence -> InputSequence
    - basically produces an input sequence from a previous input sequence
    - could also be InputSequence -> InputSequence, if we know already the transition, which we 
    do, as we put the input generator into the transition object
  - oracle :: InputSequence -> Output -> Boolean
    - basically from an input sequence produce a predicate which validates the generated output 
    from that input sequence. OR could just validate the last output : TO THINK ABOUT choice 
    important for shrinking reasons
    - be careful about edge cases, it could be that no output is generated!! it has be able to 
    check that too. So if no output must be passed NO_OUTPUT as value. Important that it not be 
    undefined as undefined could be a valid value

edge case : event for which no transition is to be taken should be modelized with a 
self-transition. But we did tht for error flows. Also events which are not allowed in a state 
but are in the user interface should be represented on the graph. Then events accepted by the 
state machine and not in the user interface?? simnulate it too for testing purposes?? NO 

NOOOOOO
have a generator function on each transition.
- gen(extendaed state)
- returns null if not possible in this stat of the state amachine to take taht transition
- otherwise return an event that triggers that transition

so algorithm becomes :

S0
for each transitions from S0, generate events
remove null events
-> [[event1], [event2]]
for each sequence of events in [sequence of events],
run the machine till the last machine
apply the generator to generate all the possible events
-> [[event1, X], [event1, Y], [event2, Z]...] or [event1] x [X,Y] 
so build array of sequences
at the same time gather the outputs
apply the same algorithm than for all paths from INIT to t, but don't concatenate paths do the 
generation and keep track of the outputs

Sooo:
- given a FSM F, instrument that FSM to output in addition to its usual actions also its control 
state, extended state, and an array of its transitions, to keep referential equality, take 
directly the reference of guards.forEach : it should have a to, predicate, action. Call that PreT
(F), for preTest
- given a FSM F, add directly into that FSM the generator for each transition, i.e. in guards 
array add gen:: EventGenerator :: ExtendedState -> Either<Event, NoEvent>, call that T(F), T for 
test
  - could maybe be added directly in F? no, better to separate concerns, but then I duplicate...
  - meaning if I duplicate I need a contract to check T(F) matches F (to define, I could allow 
  transitions without generators? what would that mean?? default gen outputting no event?)
- from T(F) get a map GenMap of generator get :: ControlState -> Transition -> EventGenerator
- Define a state machine :
  - initial extended state : PreT(F), GenMap, arrayOfEventSequence=[], edgeVisited 
  F.initialExtendedState, F.adjacency_matrix i.e. getEdges:: ControlState -> Array<Transition>, 
  control_state_under_test : INIT_STATE
  - INIT_STATE -> GENERATE
    - extended state
    - action : update arrayOfEventSequence, edgeVisited
      - adjMat(control_state_under_test) -> array of transition for INIT_STATE
      - generated events = adjMat(...).forEach(transition => GenMap(control_state_under_test, tr)
      (initialExtendedState))
```javascript
generatedEvents.forEach(generatedEvent) => {}) 
                 isNull(generatedEvent) ? acc : acc.concat([[generatedEvent]])) // the event 
                 sequence is [generatedEvent]
      - update edgeVisited
```      
