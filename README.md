# Motivation
This demo aims at showing how state machines can be used to modelize reactive systems, in 
particular user interfaces. They have long been used for embedded systems, in particular for 
safety-critical software.

We will use a real case of a multi-step workflow (the visual interface however has been changed, 
but the logic is the same). A user is applying to a volunteering opportunity, and to do so 
navigate through a 5-step process, with a specific screen dedicated to each step. When moving 
from one step to another, the data entered by the user is validated then saved asynchronously.
 
That multi-step workflow will be implemented in two iterations :
 
- In the first iteration, we will do optimistic saves, i.e. we will not wait or check 
for a confirmation message and directly move to the next step. We will also fetch data remotely 
and assume that fetch will always be successful (call that optimistic fetch). This will helps us 
showcase the definition and behaviour of an extended state machine.
- In the second iteration, we will implement retries with exponential back-off for the initial 
data-fetching. We will also implement pessimistic save for the most 'expensive' step in the 
workflow. This will in turn serve to showcase an hierarchical extended state machine.

The implementation uses `cyclejs` as framework, and [`state-transducer`](https://github.com/brucou/state-transducer#example-run) as a state machine library. To that purpose, we use the `makeStreamingStateMachine` from our library to match a stream of actions to a stream of events. We then wire that stream of actions with cyclejs sinks. We make use of two 
 drivers : the DOM driver for updating the screen, and a domain driver for fetching data. 
 
Code available in [dedicated branch](https://github.com/brucou/cycle-state-machine-demo/tree/first-iteration).

With those two examples, we will be able to conclude by recapitulating the advantages and 
trade-off associated to using state machines for specifying and implementing user interfaces. 
 
# General specifications
Here are the initial specifications for the volunteer application workflow, as extracted from the
 UX designers. Those initial specifications are light in details, and are simple lo-fi wireframes.

![wireframes](public/assets/images/graphs/application%20process.png)

# First iteration
While analyzing the requirements and designing the corresponding state machine, more detailed 
specifications emerge and are validated.

## Detailed specifications
1. A valid completed application contains the following fields : 
  - personal information : super power, legal name, preferred name, phone, birthday, zip code
    - all previously quoted fields are subject to validation
    - any field failing validation must result in a detailed error message displayed
    - min length > X : super power, legal name, preferred name
    - mandatory fields : phone, birthday, zip code, opportunity question's answer, team 
    motivational question's answer
  - answer to a motivational question specific to the opportunity
  - a non-empty set of teams that the volunteer want to join
  - for any selected team, a non-empty answer to a motivational question specific to the team

2. The user will be able to start filling in an application, interrupt the 
application, and resume it at a later point in the stage where it stopped

3. The user can review its application before applying, and modify it

4. **NEW** : To avoid having to reenter information, previously entered information should be kept 

5. **NEW** : The user will be able to join a team, but also to unjoin it, if it was joined 
previously. The same button will be used to that purpose, with the corresponding action displayed
 (i.e. `Join` if the team is not joined yet, `Unjoin` if the team is already joined)

6. In case of contradiction of the previous rules with the user flow, the previous rules win

## Modelizing the user flow with an extended state machine
On the first iteration, the provided wireframes are refined into a workable state machine, which 
reproduces the provided user flow, while addressing key implementation details (error flows, data
 fetching).

![extended state machine](public/assets/images/graphs/sparks%20application%20process%20with%20comeback%20proper%20syntax%20-%20flat%20fsm.png)

To implement S2, we save the application state after each `Continue` button click, i.e. on the 
first, second, third and fifth screen.
To implement S4, when the user fills in a team's answer, we keep that, even if the team is not 
joined (for instance skipped, or unjoined), so that when the user comes back to it, it can 
retrieve that information.
For UX reasons, we also chose to have the team selection come back to the first team when the user 
consults the last team description and proceed to the next team (for instance clicking on `Skip`,
 `Join`...).

I want to emphasize two points here :

- the state machine graph itself does not suffice to completely represent the implementation. 
Notably, information about event content, or output format is not visualized. However, it goes a 
long way to communicate the application logic to a non-programming audience 
- there are possible variations for the same logic : we could for instance have fetched the data 
out of the state machine and start with an initial extended state which includes the fetched 
data, or an INIT event which includes the fetched data.

The behaviour of the state machine itself is pretty self-explanatory from the graph. The machines 
moves from its initial state to the fetch state which awaits for a fetch event carrying the 
fetched data (previously saved application data). From that, the sequence of screens flows in 
function of the user flow and rules defined.

![demo](public/assets/images/animated_demo.gif)

## Tests
### Test strategy
It is important to understand that the defined state machine acts as a precise specification for 
the reactive system under development. The model is precise enough to double as implementation for 
that reactive system (partial implementation, as our model does not modelize actual actions, nor 
 the interfaced systems, e.g. HTTP requests, the network, etc.), but is primarily a specification
  of the system under study. In the context of this illustrative example, we used our state 
   transducer library to actually implement the specified state machine.
  
 It ensues two consequences for our tests :
 - the effectful part of the reactive system must be tested separately, for instance during 
 end-to-end or acceptance tests
- assuming that our library is correct (!), **testing the implementation is testing the model**, 
as the correctness of any one means the correctness of the other.

We thus need to test the implementation to discover possible mistakes in our model. The only way 
to do this is manually : we cannot use the outputs produced by the model as oracle, as they are 
precisely what is being tested against. Hence test generation and execution can be automated, but
 test validation remains manual.
  
That is the first point. The second point is that the test space for our implementation consists 
of any sequence of events admitted by the machine (assuming that events not accepted by the 
machine have the same effect that if they did not exist in the first place : the machine ignores 
them). That sequence is essentially infinite, so any testing of such reactive system necessarily 
involves only a finite subset of the test space. How to pick that subset in a way to generate a minimum 
**confidence** level is the crux of the matter and strongly influences the testing strategy to 
adopt.

Because our model is both specification and implementation target, testing our model 
involves **testing the different paths in the model**[^1]. Creating the abstract test suite  is 
an easily automatable process of simply traversing through the states and transitions in the 
model, until the wanted model coverage is met. The abstract test suite can be 
reified into executable concrete test suites, and actual outputs (from the model implementation) 
are compared manually to expected outputs (derived from the informal requirements which originated 
the model).

[^1]: Those paths can be split into control paths and data paths (the latter relating to the set of 
values the extended state can take, and addressed by [**data coverage** criteria](http://www.cse
.chalmers.se/edu/year/2012/course/DIT848/files/06-Selecting-Tests.pdf)). For the sake of brevity,
 we will address only the control paths. 

Miscellaneous model coverage criteria[^2] are commonly used when designing a test suite with the 
help of a model:

- **All states coverage** is achieved when the test reaches every state in the model
at least once. This is usually not a sufficient level of coverage, because behavior
faults are only accidentally found. If there is a bug in a transition between a
specific state pair, it can be missed even if all states coverage is reached.
- **All transitions coverage** is achieved when the test executes every transition in
the model at least once. This automatically entails also all states coverage.
Reaching all transitions coverage doesn’t require that any specific sequence is
executed, as long as all transitions are executed once. A bug that is revealed
only when a specific sequence of transitions is executed, is missed even in this
coverage level. The coverage can be increased by requiring :
- **All n-transition coverage**, meaning that all possible transition sequences of `n` or more 
transitions are included in the test suite.
- **All path coverage** is achieved when all possible branches of the underlying model graph are 
taken (**exhaustive** test of the control structure). This corresponds to the previous coverage 
criteria for a high enough `n`
- **All one-loop path**, and **All loop-free paths** are more restrictive criteria focusing on 
loops in the model

![testing criteria](public/assets/images/structural%20fsm%20test%20-%20Imgur.png)

[^2]: Bin99 Binder, R. V., Testing object-oriented systems: models, patterns, and
    tools. Addison-Wesley Longman Publishing Co., Inc., Boston, MA,
    USA, 1999.

Using a dedicated [graph testing library](https://github.com/brucou/graph-adt), we computed the 
abstract test suite for the *All one-loop path* criteria and ended up with more than 1.500 tests!! 
We reproduce below excerpts of the abstract test suite:
 
 - A test is specified by a sequence of inputs 
 - Every line below is a the sequence of control states the machine go through based on the 
 sequence of inputs it receives. Note that you can have repetition of control states, anytime a 
 transition happens between a state and itself. Because we have used a *All one-loop path* 
 criteria to enumerate the paths to test, every `Team_Detail` loop corresponds to a different 
 edge(transition) in the model graph. Here such loop transitions could be `Skip Team` or `Join Team 
 (valid form)` or `Join Team (invalid form)`. We can see from the excerpts how the graph search works 
 (depth-first search).

```javascript
["nok","INIT_S","Review","About","Review","Question","Review","Teams","Team_Detail","Team_Detail","Team_Detail","Team_Detail","Teams","Review","State_Applied"], 
["nok","INIT_S","Review","About","Review","Question","Review","Teams","Team_Detail","Team_Detail","Team_Detail","Teams","Review","State_Applied"], 
["nok","INIT_S","Review","About","Review","Question","Review","Teams","Team_Detail","Team_Detail","Team_Detail","Team_Detail","Teams","Review","State_Applied"], 
["nok","INIT_S","Review","About","Review","Question","Review","Teams","Team_Detail","Team_Detail","Team_Detail","Teams","Review","State_Applied"], 
["nok","INIT_S","Review","About","Review","Question","Review","Teams","Team_Detail","Team_Detail","Teams","Review","State_Applied"], 
["nok","INIT_S","Review","About","Review","Question","Review","Teams","Team_Detail","Team_Detail","Team_Detail","Team_Detail","Teams","Review","State_Applied"], 
["nok","INIT_S","Review","About","Review","Question","Review","Teams","Team_Detail","Team_Detail","Team_Detail","Teams","Review","State_Applied"], 
["nok","INIT_S","Review","About","Review","Question","Review","Teams","Team_Detail","Team_Detail","Teams","Review","State_Applied"], 
["nok","INIT_S","Review","About","Review","Question","Review","Teams","Team_Detail","Teams","Review","State_Applied"], 
["nok","INIT_S","Review","About","Review","Question","Review","Teams","Review","State_Applied"], 
["nok","INIT_S","Review","About","Review","Question","Review","State_Applied"], 
["nok","INIT_S","Review","About","Review","Question","Question","Review","Teams","Team_Detail","Team_Detail","Team_Detail","Team_Detail","Teams","Review","State_Applied"],
... 
["nok","INIT_S","Review","State_Applied"]
["nok","INIT_S","About","Question","Teams","Team_Detail","Team_Detail","Team_Detail","Team_Detail","Teams","Review","About","Review","Question","Review","State_Applied"],
["nok","INIT_S","About","Question","Teams","Team_Detail","Team_Detail","Team_Detail","Team_Detail","Teams","Review","About","Review","Question","Question","Review","State_Applied"],
["nok","INIT_S","About","Question","Teams","Team_Detail","Team_Detail","Team_Detail","Team_Detail","Teams","Review","About","Review","State_Applied"],
...
["nok","INIT_S","Question","Teams","Team_Detail","Team_Detail","Team_Detail","Team_Detail","Teams","Review","About","Review","Question","Review","State_Applied"],
["nok","INIT_S","Question","Teams","Team_Detail","Team_Detail","Team_Detail","Team_Detail","Teams","Review","About","Review","Question","Question","Review","State_Applied"],
["nok","INIT_S","Question","Teams","Team_Detail","Team_Detail","Team_Detail","Team_Detail","Teams","Review","About","Review","State_Applied"],
["nok","INIT_S","Question","Teams","Team_Detail","Team_Detail","Team_Detail","Team_Detail","Teams","Review","About","About","Review","Question","Review","State_Applied"],
...(1000+ lines)

```

### Test selection 
As we mentioned, even for a relatively simple reactive system, we handed up with 1.000+ tests to 
exhaust the paths between initial state and terminal state, and that even with excluding n-loops.

We finally selected only 4 tests from the **All path coverage** set, for a total of around 50/26 
transitions taken (some transitions are taken twice, all transitions are taken at least 
once):

```javascript
["nok","INIT_S","About","About","Question","Question","Teams","Team_Detail","Team_Detail","Team_Detail","Team_Detail","Teams","Review","Question","Review","About","Review","State_Applied"],
["nok","INIT_S","Question","Review","State_Applied"],
["nok","INIT_S","Teams","State_Applied"],
["nok","INIT_S","Review","Teams","State_Applied"]

```

In addition to that, we decided to test more thoroughly the key functionality of our UI which is 
the team selection(e.g. `TEAM_DETAIL` loop transitions) : 
  - the transition space for that control state is the 0,1,2,3 picks from `Join(Invalid Form) x 
  Skip x Join(Valid Form)`. Some quick calculus gives us `16` admissible transition 
  sequences for that control state. We exhaustively test all such permutations.
- hence total `16 + 4 = 20` tests (we do not reuse the 4 sequences which cover the model, it is 
actually simpler to write separated tests)
 
 ```javascript
 ["nok","INIT_S","Review","Teams",{...16 combinations...},"State_Applied"]
 
 ```

Our test strategy hence can be recapitulated by :

- *All transitions coverage* criteria: 4 input sequences are sufficient
- insist on the core functionality of the system : 16 extra input sequences

Furthermore, the process we have followed is :

- we have informal UI requirements which are refined ino a state-machine-based 
detailed specification
- by doing so, detailed specifications emerge, togther with unforeseen cases
- we generate input sequences and the corresponding output sequences, according to some 
model coverage criteria, our target confidence level and our testing priorities (happy path, 
error path, core scenario, etc.)
- we validate the selected tests manually

### Test implementation
Once test sequences are chosen, test implementation is pretty straightforward. Because state 
transducers from our library are causal functions, i.e. function whose outputs depend exclusively
 on past inputs, it is enough to feed an freshly initialized state machine with a given sequence 
 of inputs and validate the result sequence of outputs.

cf. test repository

### Test results
We have 1 test failing!! We found one bug! The bug happens when we have one subscribed team, with
 a valid answer, then we delete that answer, and return back to the `Teams` screen. Because that 
 team remains subscribed, we can proceed to the `Review` screen. However, we violate the 
 application invariant which is that all subscribed teams must have non-empty answers! The issue 
 lies in the fact that the `Back` button registers the empty answer without checking that it is 
 indeed a valid answer. We did input validation on the `Join` button, but forget to do it on the 
 `Back` button. Actually, looking back at the application, we also forgot to do it on the `Skip` 
 button!! Note that our tests would not allow us to find the second bug, as we did not test a 
 `Skip` button click with an empty answer. 
 
 There are two learnings to be extracted from this:
 
 - First, we do have to test the model manually, as we might inadvertently have made mistakes in 
 expressing the control flow of the application (here we missed a guard). 
 - Second, even if we would test the control flow paths exhaustively, we are still 
   open to bugs coming from the dataflow paths that we have not tested: the tests we wrote test 
   only **ONE** given combination of data. We have no guarantee that they would pass for another
    combination of application data (here empty answer on clicking `Skip` button). As mentioned 
    previously we will not address data coverage here for the sake of brevity (it suffices to say
    that this concern can be addressed by property-based testing based on generating random input 
    data).

### Fixing the implementation
Further analysis leads us to the following updates in the detailed specifications :

![extended state machine](public/assets/images/graphs/sparks%20application%20process%20with%20comeback%20proper%20syntax%20hierarchical%20fsm%20iter1.1.png)

The impact on the previous implementation is **fairly localized and quick to identify**, because 
control flow is segmented by control states, and concerns (state updates, actions, etc.) 
are cleanly separated :

- `fsmSpecs` : updating the `TEAM_DETAIL` control states' transitions
- `fsmEvents` : updating the shape of the events `BACK`, `SKIP` and `JOIN` to include form 
content ; writing the new guards for the new transitions
- `modelUpdates` : modifying model updates function to account for the new shape of event data ; 
writing new model update functions for the new transitions
 
### Fixing the tests
Cf. [fixed branch](https://github.com/brucou/cycle-state-machine-demo/blob/first-iteration-fix/)

 ## Run
- **run application** : Check-out the branch on your local computer then type `npm run start` in 
the root directory for that branch.
- **run tests** : Check-out the branch on your local computer then type `npm run parcel` in 
the root directory for that branch.

# Second iteration
**coming soon**

# Integration tests
Note that once the model is validated, and we built enough trust in its correctness, we can use 
it as an oracle. This means for instance that we can take any input sequence, run it through the 
model, gather the resulting outputs, generate the corresponding BDD tests, and run them. Most of 
this process can be automated.

# Conclusion
