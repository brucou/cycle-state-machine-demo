# TODO
- write a debug prop, which will output a nicely formatted table with console.table
  - orig control state, extS, event (with data), target control state, guard, action
    - could use the initial def of the machine to log object correctly with their name
    (non-overridden functions..)
  - or directly show the debug info (at least control state) as overlay 
- write separate stuff about testing
  - testing f : Domain -> Codomain, means for every x comparing f(x) vs. expected (oracle(x))
  - tension: if we do that for whole D, we have rewritten f!!! we can be no more confident in 
  this than in f, as the complexity is essentially the same. Two strategies : 
  - verification : this involves specifying f in some formalism which is able to demonstrate that
   given a set of starting assumptions, the formal specification of f, TO CONTINUE 
  - example-based testing. We take a subset of D, and we have heuristics for computing f, whose
     complexity is lower than the whole f
  - property-based testing, we do not compute oracles, but we check predicates (invariants) 
    involving computations with `(x, f(x))` as parameters. Again the idea is the computational 
    complexity be lower, and to cover a large enough portion of the test space
    - basically f(x) satisfies some properties whose ocmputation is simpler than `f`
    - f(x) `implies` `property(x, f)` or `forall x, property(x, f) holds`
  - model-based testing : can mix any of the two previous strategies. 
    - The model may be simpler than `f` by selectively selecting the parts of `f` it replicates 
    faithfully
    - TO CONTINUE - have a nomenclature of testing methodologies
    - include techniques or tactics :
      - white box, grey box, black box
      - Equivalence partitioning, Boundary value analysis, Decision table testing : important 
      for example-based testing, and also a bit for property-based testing
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
