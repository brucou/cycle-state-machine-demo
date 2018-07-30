# TODO
- publish new version of state-transducer
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
