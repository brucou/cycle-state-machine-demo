import * as QUnit from "qunitjs"
import * as Rx from "rx"
import { assertContract, formatResult, isArrayUpdateOperations } from "./helpers"
import { fsm } from "../src/processApplication/fsmSpecs"
import {
  ABOUT_CONTINUE, APPLICATION_COMPLETED, BACK_TEAM_CLICKED, CHANGE_ABOUT, CHANGE_QUESTION, CHANGE_TEAMS,
  CONTRACT_MODEL_UPDATE_FN_RETURN_VALUE, FETCH_EV, INIT_S, JOIN_OR_UNJOIN_TEAM_CLICKED,
  MANDATORY_PLEASE_FILL_IN_VALID_ERROR, MIN_LENGTH_VALID_ERROR, QUESTION_CONTINUE, SKIP_TEAM_CLICKED, STATE_ABOUT,
  STATE_APPLIED, STATE_QUESTION, STATE_REVIEW, STATE_TEAM_DETAIL, STATE_TEAMS, TEAM_CLICKED, TEAM_CONTINUE
} from "../src/processApplication/properties"
import {
  ACTION_IDENTITY, computeTimesCircledOn, decorateWithEntryActions, generateTestsFromFSM, identity, INIT_EVENT,
  INIT_STATE, makeHistoryStates, NO_OUTPUT
} from "state-transducer"
import { both, complement, merge, T } from "ramda"
import {
  hasApplied, hasJoinedAtLeastOneTeam, hasReachedReviewStep, isFormValid, isStepAbout, isStepQuestion, isStepReview,
  isStepTeams
} from "../src/processApplication/fsmEvents"
import { applyPatch } from "json-patch-es6/lib/duplex"

const $ = Rx.Observable;

/**
 *
 * @param {FSM_Model} model
 * @param {Operation[]} modelUpdateOperations
 * @returns {FSM_Model}
 */
function applyJSONpatch(model, modelUpdateOperations) {
  assertContract(isArrayUpdateOperations, [modelUpdateOperations],
    `applyUpdateOperations : ${CONTRACT_MODEL_UPDATE_FN_RETURN_VALUE}`);

  // NOTE : we don't validate operations, to avoid throwing errors when for instance the value property for an
  // `add` JSON operation is `undefined` ; and of course we don't mutate the document in place
  return applyPatch(model, modelUpdateOperations, false, false).newDocument;
}

//
const default_settings = {
  updateState: applyJSONpatch,
};

// Fixtures
const USER_KEY = 'user';
const OP_KEY = 'opportunity';
const USER = {
  displayName: 'Joe',
  email: 'joe@gmail.com',
  phoneNumber: '+1-23421534'
};
const OPPORTUNITY = { description: 'if you only had one shot', question: 'would you catch it?' };
const TEAMS = [
  {
    "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
    "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
    "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
    "name": "Parking",
    "question": "Have you worked parking for any other festivals? Which ones?",
    "project": {
      "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
      "name": "Cosmic Alignment",
      "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
    },
  },
  {
    "teamKey": "KFVssLvEPsDJUofy1Yd",
    "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
    "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
    "name": "Box Office",
    "question": "Which festivals have you worked Box Office before?",
    "project": {
      "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
      "name": "Cosmic Alignment",
      "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
    },
  }
];
const PROJECT = { name: 'Beyond and further', date: '1984.09.09', location: 'right here' };
const teamsInfo = {
  "-KFVqOyjPpR4pdgK-0Wr": {
    description: "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
    name: "Parking",
    question: "Have you worked parking for any other festivals? Which ones?",
    hasBeenJoined: true,
    answer: 'Never'
  },
  "KFVssLvEPsDJUofy1Yd": {
    description: "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
    name: "Box Office",
    question: "Which festivals have you worked Box Office before?",
    hasBeenJoined: false,
    answer: ''
  },
};
const emptyTeamsInfo = {};
const maxResults = 700;
let resultNumber = 0;
// Helpers
const noEdgeRepeats = (target, maxNumberOfTraversals) => ({
  onResult: results => {
    if (!(resultNumber % 10)) {
      console.info(`Accumulated results`, JSON.stringify(results.map(result => result.controlStateSequence)));
    }
    resultNumber++
    console.info(`Number of results so far :`, resultNumber);
  },
  strategy: {
    isTraversableEdge: (edge, graph, pathTraversalState, graphTraversalState) => {

      return computeTimesCircledOn(pathTraversalState.path, edge) < (maxNumberOfTraversals || 1) && resultNumber < maxResults
    },
    isGoalReached: (edge, graph, pathTraversalState, graphTraversalState) => {
      const { getEdgeTarget, getEdgeOrigin } = graph;
      const lastPathVertex = getEdgeTarget(edge);
      // Edge case : accounting for initial vertex
      const vertexOrigin = getEdgeOrigin(edge);

      const isGoalReached = vertexOrigin ? lastPathVertex === target : false;
      return isGoalReached
    },
  }
});

function makeAppFixture(userApplication) {
  return {
    user: USER,
    opportunity: OPPORTUNITY,
    teams: TEAMS,
    project: PROJECT,
    errorMessage: null,
    validationMessages: {},
    userApplication,

  }
}

function makeUserApplication({ superPower, phone, preferredName, zipCode, legalName, birthday, answer, teamsInfo, step, hasApplied, hasReviewedApplication, latestTeamIndex }) {
  return {
    userKey: USER_KEY,
    opportunityKey: OP_KEY,
    about: {
      aboutYou: { superPower },
      personal: { phone, preferredName, zipCode, legalName, birthday }
    },
    questions: { answer },
    teams: teamsInfo,
    progress: {
      step,
      hasApplied,
      hasReviewedApplication,
      latestTeamIndex
    }
  }
}

QUnit.module("Testing demo app - generating paths", {});

QUnit.test("all paths with no cycles", function exec_test(assert) {
  const states = {
    [INIT_S]: '',
    [STATE_ABOUT]: '',
    [STATE_QUESTION]: '',
    [STATE_TEAMS]: '',
    [STATE_TEAM_DETAIL]: '',
    [STATE_REVIEW]: '',
    [STATE_APPLIED]: '['
  };
  // When it is the first time accessing the volunteering page, there is no data for the user application yet
  const appUnsavedWithNoData = makeAppFixture(undefined);
  const appInABOUTandValidFormAndNotReviewed = {
    formData: {
      superPower: 'fly',
      phone: '1234',
      preferredName: 'Otadaki',
      zipCode: '1231',
      legalName: 'Kujio',
      birthday: '09.09.09',
    },
    validationData: {
      'superPower': true,
      'legalName': true,
      'preferredName': true,
      'phone': true,
      'birthday': true,
      'zipCode': true
    }
  };
  const appInABOUTandValidFormAndReviewed = {
    formData: {
      superPower: 'refly', // That is simulating the review
      phone: appInABOUTandValidFormAndNotReviewed.formData.phone,
      preferredName: appInABOUTandValidFormAndNotReviewed.formData.preferredName,
      zipCode: appInABOUTandValidFormAndNotReviewed.formData.zipCode,
      legalName: appInABOUTandValidFormAndNotReviewed.formData.legalName,
      birthday: appInABOUTandValidFormAndNotReviewed.formData.birthday
    },
    validationData: appInABOUTandValidFormAndNotReviewed.validationData
  };
  const appInABOUTandInvalidForm = {
    formData: {
      superPower: '',
      phone: '',
      preferredName: '',
      zipCode: '',
      legalName: '',
      birthday: '',
    },
    validationData: {
      'superPower': MANDATORY_PLEASE_FILL_IN_VALID_ERROR,
      'legalName': MANDATORY_PLEASE_FILL_IN_VALID_ERROR,
      'preferredName': MANDATORY_PLEASE_FILL_IN_VALID_ERROR,
      'phone': MIN_LENGTH_VALID_ERROR,
      'birthday': MIN_LENGTH_VALID_ERROR,
      'zipCode': MIN_LENGTH_VALID_ERROR
    }
  }
  const appSavedInAboutState = makeAppFixture(makeUserApplication({
      superPower: 'fly',
      phone: '1234',
      preferredName: 'Otadaki',
      zipCode: '1231',
      legalName: 'Kujio',
      birthday: '09.09.09',
      answer: '',
      teamsInfo: teamsInfo,
      step: STATE_ABOUT,
      hasApplied: false,
      hasReviewedApplication: false,
      latestTeamIndex: 0
    }
  ));
  const appInQUESTIONandValidFormAndNotReviewed = {
    formData: {
      'answer': 'That is what I like',
    },
    validationData: {
      'answer': true
    }
  };
  const appInQUESTIONandValidFormAndReviewed = {
    formData: {
      'answer': 'That is what I like so much',
    },
    validationData: {
      'answer': true
    }
  };
  const appInQUESTIONandInvalidForm = {
    formData: {
      'answer': '',
    },
    validationData: {
      'answer': MANDATORY_PLEASE_FILL_IN_VALID_ERROR
    }
  };
  const appSavedInQuestionState = makeAppFixture(makeUserApplication(Object.assign(
    {}, appInABOUTandValidFormAndNotReviewed.formData, {
      answer: appInQUESTIONandValidFormAndNotReviewed.formData.answer,
      teamsInfo: teamsInfo,
      step: STATE_QUESTION,
      hasApplied: false,
      hasReviewedApplication: false,
      latestTeamIndex: 0
    }
  )));
  const clickedOnTeam = 0; // that is the index on the team clicked on
  const clickedOnSkipTeam = {
    formData: {
      'answer': 'skipped'
    }
  };
  const appInTeamDetailValidForm = [
    {
      formData: {
        'answer': 'Team 0 answer'
      },
      validationData: {
        'answer': true
      }
    },
    {
      formData: {
        'answer': 'Team 1 answer'
      },
      validationData: {
        'answer': true
      }
    }
  ];
  const appInTeamDetailInvalidForm = {
    formData: {
      'answer': ''
    },
    validationData: {
      'answer': MANDATORY_PLEASE_FILL_IN_VALID_ERROR
    }
  };
  const appInTeamDetailBackValidForm = answer => ({
    'answer': answer
  });
  const appSavedInTeamsState = makeAppFixture(makeUserApplication({
      superPower: 'fly',
      phone: '1234',
      preferredName: 'Otadaki',
      zipCode: '1231',
      legalName: 'Kujio',
      birthday: '09.09.09',
      answer: 'That is what I like',
      teamsInfo,
      step: STATE_TEAMS,
      hasApplied: false,
      hasReviewedApplication: false,
      latestTeamIndex: 0
    }
  ));
  const appInReviewedStateInQuestionState = makeAppFixture(makeUserApplication({
      superPower: 'fly',
      phone: '1234',
      preferredName: 'Otadaki',
      zipCode: '1231',
      legalName: 'Kujio',
      birthday: '09.09.09',
      answer: 'That is what I like',
      teamsInfo,
      step: STATE_QUESTION,
      hasApplied: false,
      hasReviewedApplication: true,
      latestTeamIndex: 0
    }
  ));
  const appInAppliedStateInQuestionState = makeAppFixture(makeUserApplication({
      superPower: 'fly',
      phone: '1234',
      preferredName: 'Otadaki',
      zipCode: '1231',
      legalName: 'Kujio',
      birthday: '09.09.09',
      answer: 'That is what I like',
      teamsInfo,
      step: STATE_QUESTION,
      hasApplied: true,
      hasReviewedApplication: true,
      latestTeamIndex: 0
    }
  ));

  const fsmDef = fsm;
  const maxNumberOfTraversals = 1;
  const settings = merge(default_settings, noEdgeRepeats(STATE_APPLIED, maxNumberOfTraversals));
  const genFsmDef = {
    // this is from state machine without render : [
    //     { from: INIT_STATE, event: INIT_EVENT, guards: [{ predicate: T, to: INIT_S, action: identity }] },
    //     {
    //       from: INIT_S, event: FETCH_EV, guards: [
    //         { predicate: hasApplied, to: STATE_REVIEW, action: initializeModelAndStepReview },
    //         { predicate: isStepAbout, to: STATE_ABOUT, action: initializeModel },
    //         { predicate: isStepQuestion, to: STATE_QUESTION, action: initializeModel },
    //         { predicate: isStepTeams, to: STATE_TEAMS, action: initializeModel },
    //         { predicate: isStepReview, to: STATE_REVIEW, action: initializeModel },
    //       ]
    //     },
    //     {
    //       from: STATE_ABOUT, event: ABOUT_CONTINUE, guards: [
    //         {
    //           predicate: both(isFormValid, complement(hasReachedReviewStep)),
    //           to: STATE_QUESTION,
    //           action: updateUserAppAndRenderQuestionStep
    //         },
    //         {
    //           predicate: both(isFormValid, hasReachedReviewStep),
    //           to: STATE_REVIEW,
    //           action: updateUserAppAndRenderReviewStep
    //         },
    //         {
    //           predicate: T,
    //           to: STATE_ABOUT,
    //           action: updateModelWithAboutStepValidationMessages
    //         }
    //       ]
    //     },
    //     {
    //       from: STATE_QUESTION, event: QUESTION_CONTINUE, guards: [
    //         {
    //           predicate: both(isFormValid, complement(hasReachedReviewStep)),
    //           to: STATE_TEAMS,
    //           action: updateUserAppAndRenderTeamsStepT
    //         },
    //         {
    //           predicate: both(isFormValid, hasReachedReviewStep),
    //           to: STATE_REVIEW,
    //           action: updateUserAppAndRenderReviewStepR
    //         },
    //         {
    //           predicate: T,
    //           to: STATE_QUESTION,
    //           action: updateModelWithQuestionValidationMessages
    //         }
    //       ]
    //     },
    //     {
    //       from: STATE_TEAMS,
    //       event: TEAM_CLICKED,
    //       guards: [{ predicate: T, to: STATE_TEAM_DETAIL, action: updateModelWithSelectedTeamData }]
    //     },
    //     {
    //       from: STATE_TEAM_DETAIL,
    //       event: SKIP_TEAM_CLICKED,
    //       guards: [{ predicate: T, to: STATE_TEAM_DETAIL, action: updateModelWithSkippedTeamData }]
    //     },
    //     {
    //       from: STATE_TEAM_DETAIL,
    //       event: JOIN_OR_UNJOIN_TEAM_CLICKED,
    //       guards: [
    //         { predicate: isFormValid, to: STATE_TEAM_DETAIL, action: updateModelWithJoinedOrUnjoinedTeamData },
    //         { predicate: T, to: STATE_TEAM_DETAIL, action: updateModelWithTeamDetailValidationMessages }
    //       ]
    //     },
    //     {
    //       from: STATE_TEAM_DETAIL,
    //       event: BACK_TEAM_CLICKED,
    //       guards: [{ predicate: T, to: STATE_TEAMS, action: updateModelWithTeamDetailAnswerAndNextStep }]
    //     },
    //     {
    //       from: STATE_TEAMS,
    //       event: TEAM_CONTINUE,
    //       guards: [
    //         {
    //           predicate: hasJoinedAtLeastOneTeam,
    //           to: STATE_REVIEW,
    //           action: updateUserAppWithHasReviewed
    //         },
    //         { predicate: T, to: STATE_TEAM_DETAIL, action: updateModelWithStepAndHasReviewed }
    //       ]
    //     },
    //     {
    //       from: STATE_REVIEW,
    //       event: CHANGE_ABOUT,
    //       guards: [
    //         { predicate: T, to: STATE_ABOUT, action: updateModelWithStepOnly(STEP_ABOUT) },
    //       ]
    //     },
    //     {
    //       from: STATE_REVIEW,
    //       event: CHANGE_QUESTION,
    //       guards: [
    //         { predicate: T, to: STATE_QUESTION, action: updateModelWithStepOnly(STEP_QUESTION) },
    //       ]
    //     },
    //     {
    //       from: STATE_REVIEW,
    //       event: CHANGE_TEAMS,
    //       guards: [
    //         { predicate: T, to: STATE_TEAMS, action: updateModelWithStepOnly(STEP_TEAMS) },
    //       ]
    //     },
    //     {
    //       from: STATE_REVIEW,
    //       event: APPLICATION_COMPLETED,
    //       guards: [
    //         {
    //           predicate: T,
    //           to: STATE_APPLIED,
    //           action: updateUserAppWithHasApplied
    //         },
    //       ]
    //     },
    //   ]
    transitions: [
      {
        from: INIT_STATE, event: INIT_EVENT, to: INIT_S, gen: function genINITtoINIT_S(extS) {
          return { input: extS, hasGeneratedInput: true }
        }
      },
      {
        from: INIT_S, event: FETCH_EV, guards: [
          // {
          //   predicate: hasApplied, to: STATE_REVIEW, gen: function genINIT_StoReviewApplied(extS) {
          //     return { input: appInAppliedStateInQuestionState, hasGeneratedInput: true }
          //   }
          // },
          // {
          //   predicate: isStepAbout, to: STATE_ABOUT, gen: function genINIT_StoABOUT(extS) {
          //     return { input: appSavedInAboutState, hasGeneratedInput: true }
          //   }
          // },
          // {
          //   predicate: isStepQuestion, to: STATE_QUESTION, gen: function genINIT_StoQUESTION(extS) {
          //     return { input: appSavedInQuestionState, hasGeneratedInput: true }
          //   }
          // },
          // {
          //   predicate: isStepTeams, to: STATE_TEAMS, gen: function genINIT_StoTEAMS(extS) {
          //     return { input: appSavedInTeamsState, hasGeneratedInput: true }
          //   }
          // },
          {
            predicate: isStepReview, to: STATE_REVIEW, gen: function genINIT_StoREVIEW(extS) {
              return { input: appInReviewedStateInQuestionState, hasGeneratedInput: true }
            }
          },
        ]
      },
      {
        from: STATE_ABOUT, event: ABOUT_CONTINUE, guards: [
          {
            predicate: both(isFormValid, complement(hasReachedReviewStep)),
            to: STATE_QUESTION,
            gen: function genABOUTtoQUESTION(extS) {
              return { input: appInABOUTandValidFormAndNotReviewed, hasGeneratedInput: !hasReachedReviewStep(extS) }
            }
          },
          {
            predicate: both(isFormValid, hasReachedReviewStep),
            to: STATE_REVIEW,
            gen: function genABOUTtoREVIEW(extS) {
              return { input: appInABOUTandValidFormAndReviewed, hasGeneratedInput: hasReachedReviewStep(extS) }
            }
          },
          {
            predicate: complement(isFormValid),
            to: STATE_ABOUT,
            gen: function genABOUTtoABOUT(extS) {
              return { input: appInABOUTandInvalidForm, hasGeneratedInput: true }
            }
          }
        ]
      },
      {
        from: STATE_QUESTION, event: QUESTION_CONTINUE, guards: [
          {
            predicate: both(isFormValid, complement(hasReachedReviewStep)),
            // Here `isFormValid` depends on the triggered event while `hasReachedReviewStep` is a function of the
            // extended state. To progress the state machine, the generator must hence check the validity of the
            // conditions on the extended state, while generating event data which is compatible with the transition
            // going forward
            to: STATE_TEAMS,
            gen: function genQUESTIONtoTEAMS(extS) {
              return { input: appInQUESTIONandValidFormAndNotReviewed, hasGeneratedInput: !hasReachedReviewStep(extS) }
            }
          },
          {
            predicate: both(isFormValid, hasReachedReviewStep),
            to: STATE_REVIEW,
            gen: function genQUESTIONtoREVIEW(extS) {
              return { input: appInQUESTIONandValidFormAndReviewed, hasGeneratedInput: hasReachedReviewStep(extS) }
            }
          },
          {
            predicate: complement(isFormValid),
            to: STATE_QUESTION,
            gen: function genQUESTIONtoQUESTION(extS) {
              return { input: appInQUESTIONandInvalidForm, hasGeneratedInput: true }
            }
          }
        ]
      },
      {
        from: STATE_TEAMS, event: TEAM_CLICKED, to: STATE_TEAM_DETAIL,
        gen: function genTEAMStoQUESTION(extS) {
          return { input: clickedOnTeam, hasGeneratedInput: true }
        }
      },
      {
        from: STATE_TEAM_DETAIL, event: SKIP_TEAM_CLICKED, to: STATE_TEAM_DETAIL,
        gen: function genTEAMDETAILtoTEAMDETAILskip(extS) {
          return { input: clickedOnSkipTeam, hasGeneratedInput: true }
        }
      },
      {
        from: STATE_TEAM_DETAIL,
        event: JOIN_OR_UNJOIN_TEAM_CLICKED,
        guards: [
          {
            predicate: isFormValid, to: STATE_TEAM_DETAIL, gen: function genTEAMDETAILtoTEAMDETAIL_un_join(extS) {
              const { userApplication: { teams, progress: { latestTeamIndex } } } = extS;
              return { input: appInTeamDetailValidForm[latestTeamIndex], hasGeneratedInput: true }
            }
          },
          {
            predicate: T, to: STATE_TEAM_DETAIL, gen: function genTEAMDETAILtoTEAMDETAIL_un_join_invalid(extS) {
              return { input: appInTeamDetailInvalidForm, hasGeneratedInput: true }
            }
          }
        ]
      },
      {
        from: STATE_TEAM_DETAIL,
        event: BACK_TEAM_CLICKED, to: STATE_TEAMS,
        gen: function genTEAMDETAILtoTEAMS(extS) {
          const { userApplication: { teams, progress: { latestTeamIndex } } } = extS;
          const teamKeys = Object.keys(teams);
          const selectedTeamKey = teamKeys[latestTeamIndex];
          const { answer } = teams[selectedTeamKey];
          return { input: appInTeamDetailBackValidForm(answer), hasGeneratedInput: true }
        }
      },
      {
        from: STATE_TEAMS,
        event: TEAM_CONTINUE,
        guards: [
          {
            predicate: hasJoinedAtLeastOneTeam, to: STATE_REVIEW,
            gen: function genTEAMStoREVIEW_atLeastOne(extS) {
              return {
                input: null,
                hasGeneratedInput: hasJoinedAtLeastOneTeam(extS)
              }
            }
          },
          {
            predicate: complement(hasJoinedAtLeastOneTeam), to: STATE_TEAM_DETAIL,
            gen: function genTEAMStoREVIEW_none(extS) {
              return {
                input: null,
                hasGeneratedInput: !hasJoinedAtLeastOneTeam(extS)
              }
            }
          }
        ]
      },
      {
        from: STATE_REVIEW, event: CHANGE_ABOUT, to: STATE_ABOUT,
        gen: function genREVIEWtoABOUT(extS) {
          return {
            input: null,
            hasGeneratedInput: true
          }
        }
      },
      {
        from: STATE_REVIEW, event: CHANGE_QUESTION, to: STATE_QUESTION,
        gen: function genREVIEWtoQUESTION(extS) {
          return {
            input: null,
            hasGeneratedInput: true
          }
        }
      },
      {
        from: STATE_REVIEW, event: CHANGE_TEAMS, to: STATE_TEAMS,
        gen: function genREVIEWtoTEAMS(extS) {
          return {
            input: null,
            hasGeneratedInput: true
          }
        }
      },
      {
        from: STATE_REVIEW, event: APPLICATION_COMPLETED, to: STATE_APPLIED,
        gen: function genREVIEWtoAPPLIED(extS) {
          return {
            input: null,
            hasGeneratedInput: true
          }
        }
      },
    ],
  };
  const generators = genFsmDef.transitions;
  debugger
  const results = generateTestsFromFSM(fsmDef, generators, settings);
  const formattedResults = results.map(formatResult);

  assert.deepEqual(formattedResults.map(x => x.controlStateSequence), [], `...`);
  assert.deepEqual(formattedResults.map(x => x.inputSequence), [], `...`);
  assert.deepEqual(formattedResults.map(x => x.outputSequence), [], `...`);
});
