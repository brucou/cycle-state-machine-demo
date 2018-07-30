# Motivation
This demo aims at showing how state machines can be used to modelize reactive systems, in 
particular user interfaces. They have long been used for embedded systems, in particular for 
safety-critical software.

**TO COMPLETE with article from atlantic : today software are systems, whose complexity is over 
our capacity to handle it, and we need to change how we handle that complexity**

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

With those two exemples, we will be able to conclude by recapitulating the advantages and 
tradeoff associated to using state machines for specifying and implementing user interfaces. 

# General specifications
Here are the initial specifications for the volunteer application workflow, as extracted from the
 UX designers. Those initial specifications are light in details, and are simple lo-fi wireframes.

![wireframes](public/assets/images/graphs/application%20process.png)

In addition, the following rules must hold :

- it should be possible for the user to interrupt at any time its application and continue it 
later from where it stopped
- user-generated data must be validated

# First iteration
## Modelizing the user flow with an extended state machine
On the first iteration, the provided wireframes are refined into a workable state machine, which 
reproduces the provided user flow, while addressing key implementation details (error flows, data
 fetching).

![extended state machine](public/assets/images/graphs/sparks%20application%20process%20with%20comeback%20proper%20syntax%20-%20flat%20fsm.png)

The behaviour is pretty self-explanatory. The machines moves from its initial state to the fetch 
state which awaits for a fetch event carrying the fetched data (previously saved application 
data). From that, the sequence of screens flows in function of the user flow and rules 
defined.

Note that we could have included processing of the fetch event inside our state machine. We could
 have instead fetched the relevant data, and then start the state machine with an initial 
 transition which carries the fetched data as INIT event data. 

## Tests
**coming soon**

## Implementation
show the drawing for the state machine with our visualizer??

# Second iteration
**coming soon**
