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
