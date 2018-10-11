# TODO
- refactor tests : no repetition, clean fixtures, etc.
  - pass back the computation of the input sequence out of fixtures??
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

! TRY when adding children to the store, reorder them according to probabilities, defined in the
 configuration files
  - probability are markov-like. For each state, distribute 100% between all transitions
  - allow to slice off some branches by assigning zero prob
  - allow to change test orientation by changing the probabilities without touching anything else
    - main case, edge case : 80, 20 in first test iteration
    - main case, edge case : 20, 80 in second test iteration
- TRY add option to stop the generation after X sequences computed
- TRY add callback for each result computed. The callback could interrupt the enumeration by 
throwing??
- TRY add the edge sequence to the control state sequence

- I have to generate an {event_label : event_data}
- OR pick a probability distribution to pick a (event_label, guard) to produce {event_label : 
event_data}
- so each state has a probably distribution between events, and then between guards (or between 
event-guard gathered together?? mmm NO)
- DOC some guards depend only on event data : gen will compute event without using extS
- DOC some guards depend only on extS : gen will determine from extS if an input can be generated
. DOC If so, it will generate that input from extS and possibly event data
- DOC some guards depend on both : mix of the two previous case : determine first if input can be 
generated, then generate it

CAVEATS:
- edge case : events for which no transition is to be taken should be modelized with a 
self-transition. This is what we did that for error flows. 
- Also events which are not allowed in a state but are in the user interface should be 
represented on the graph. Then events accepted by the state machine and not in the user 
interface?? simnulate it too for testing purposes?? NO 
