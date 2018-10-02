import * as QUnit from "qunitjs"
import * as Rx from "rx"
import { assertContract, convertVNodesToHTML, genNperm, isArrayUpdateOperations } from "./helpers"
import { fsm } from "../src/processApplication/fsmSpecs"
import {
  ABOUT_CONTINUE, APPLICATION_COMPLETED, BACK_TEAM_CLICKED, CHANGE_ABOUT, CHANGE_QUESTION,
  CONTRACT_MODEL_UPDATE_FN_RETURN_VALUE, FETCH_EV, JOIN_OR_UNJOIN_TEAM_CLICKED, MANDATORY_PLEASE_FILL_IN_VALID_ERROR,
  MIN_LENGTH_VALID_ERROR, QUESTION_CONTINUE, SKIP_TEAM_CLICKED, STATE_ABOUT, STATE_QUESTION, STATE_TEAMS, STEP_REVIEW,
  TEAM_CLICKED, TEAM_CONTINUE
} from "../src/processApplication/properties"
import {
  ACTION_IDENTITY, computeTimesCircledOn, create_state_machine, decorateWithEntryActions, generateTestsFromFSM,
  identity, INIT_EVENT, INIT_STATE, makeHistoryStates, NO_OUTPUT
} from "state-transducer"
import { mapObjIndexed } from "ramda"
import { applyPatch } from "json-patch-es6/lib/duplex"
import { multiplyVectorByMatrixAndAppend, multiplyVectorByMatrixAndPrepend } from "../src/helpers"
import {
  renderAboutErrorScreen, renderAboutInitScreen, renderAboutScreen, renderAppliedScreen, renderINITscreen,
  renderInvalidTeamDetailJoinScreen, renderInvalidTeamDetailUnjoinScreen, renderQuestionErrorScreen,
  renderQuestionScreen, renderReviewScreen, renderTeamDetailBackToUnjoinScreen, renderTeamDetailJoinScreen,
  renderTeamScreen
} from "./snapshots"

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

QUnit.module("Testing demo app", {});

const appUnsavedWithNoData = makeAppFixture(undefined);
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
const appInQUESTIONandInvalidForm = {
  formData: {
    'answer': '',
  },
  validationData: {
    'answer': MANDATORY_PLEASE_FILL_IN_VALID_ERROR
  }
};
const appInQUESTIONandValidFormAndNotReviewed = {
  formData: {
    'answer': 'That is what I like',
  },
  validationData: {
    'answer': true
  }
};
const appInTeamDetailInvalidForm = {
  formData: {
    'answer': ''
  },
  validationData: {
    'answer': MANDATORY_PLEASE_FILL_IN_VALID_ERROR
  }
};
const teamAnswer = teamIndex => `Team ${teamIndex} answer`;
const skippedTeamAnswer = teamIndex => ({
  formData: {
    answer: `Team ${teamIndex} skipped`
  }
});
const skippedTeamAnswerInvalid = teamIndex => ({
  formData: {
    answer: ``
  }
});

const appInTeamDetailValidForm = [
  {
    formData: {
      'answer': teamAnswer(0)
    },
    validationData: {
      'answer': true
    }
  },
  {
    formData: {
      'answer': teamAnswer(1)
    },
    validationData: {
      'answer': true
    }
  }
];
const clickedOnSkipTeam = {
  formData: {
    'answer': 'skipped'
  },
  validationData: {
    'answer': true
  }
};
const clickedOnSkipTeamInvalid = {
  formData: {
    'answer': ''
  },
  validationData: {
    'answer': MANDATORY_PLEASE_FILL_IN_VALID_ERROR
  }
};
const clickedOnBackInvalid = {
  formData: {
    'answer': ''
  },
  validationData: {
    'answer': MANDATORY_PLEASE_FILL_IN_VALID_ERROR
  }
};
const clickedOnBackValid = answer => ({
  formData: {
    'answer': answer
  },
  validationData: {
    'answer': true
  }
});
const appInTeamDetailBackValidForm = answer => ({
  'answer': answer
});
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
const appInQUESTIONandValidFormAndReviewed = {
  formData: {
    'answer': 'That is what I like so much',
  },
  validationData: {
    'answer': true
  }
};
const clickedOnTeam = 0; // that is the index on the team clicked on
const appSavedInTeamsStateWithTeam1Joined = makeAppFixture(makeUserApplication({
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
    hasReviewedApplication: true,
    latestTeamIndex: 0
  }
));
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
const appSavedInQuestionState = makeAppFixture(makeUserApplication({
    superPower: 'fly',
    phone: '1234',
    preferredName: 'Otadaki',
    zipCode: '1231',
    legalName: 'Kujio',
    birthday: '09.09.09',
    answer: 'That is what I like',
    teamsInfo: teamsInfo,
    step: STATE_QUESTION,
    hasApplied: false,
    // NOTE : if I have team subscription like I do with `teamInfo` then necessarily I went through the review screen
    hasReviewedApplication: true,
    latestTeamIndex: 0
  }
));
const appSavedInReviewState = makeAppFixture(makeUserApplication({
    superPower: 'fly',
    phone: '1234',
    preferredName: 'Otadaki',
    zipCode: '1231',
    legalName: 'Kujio',
    birthday: '09.09.09',
    answer: 'That is what I like',
    teamsInfo,
    step: STEP_REVIEW,
    hasApplied: false,
    hasReviewedApplication: true,
    latestTeamIndex: 0
  }
));

const updateAction = ({ step, superPower, hasApplied, hasReviewedApplication, hasBeenJoined, answers, question, latestTeamIndex }) => ({
  "domainAction": {
    "command": "Update",
    "context": "USERAPP",
    "payload": {
      "about": {
        "aboutYou": {
          superPower: superPower || 'fly'
        },
        "personal": {
          "birthday": "09.09.09",
          "legalName": "Kujio",
          "phone": "1234",
          "preferredName": "Otadaki",
          "zipCode": "1231"
        }
      },
      "progress": {
        hasApplied,
        hasReviewedApplication,
        "latestTeamIndex": latestTeamIndex || 0,
        "step": step ? step : "Review"
      },
      "questions": {
        "answer": question
      },
      "teams": {
        "-KFVqOyjPpR4pdgK-0Wr": {
          "answer": (answers || [])[0] || ``,
          "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
          "hasBeenJoined": hasBeenJoined[0],
          "name": "Parking",
          "question": "Have you worked parking for any other festivals? Which ones?"
        },
        "KFVssLvEPsDJUofy1Yd": {
          "answer": (answers || [])[1] || ``,
          "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
          "hasBeenJoined": hasBeenJoined[1],
          "name": "Box Office",
          "question": "Which festivals have you worked Box Office before?"
        }
      },
    }
  }
});

const INIT_I = { [INIT_EVENT]: {} };

QUnit.test(`INIT -> About -invalid-> About -> Question -invalid-> Question -> Teams -click-0-> Team_Detail -> Team_Detail -> Team_Detail -> Team_Detail -> Team_Detail -> Team_Detail -> Team_Detail -back-> Teams -> Review -> Question -> Review -> About -> Review -> State_Applied`, function exec_test(assert) {
  const inputSequence = [
    INIT_I,
    { [FETCH_EV]: appUnsavedWithNoData },
    { [ABOUT_CONTINUE]: appInABOUTandInvalidForm },
    { [ABOUT_CONTINUE]: appInABOUTandValidFormAndNotReviewed },
    { [QUESTION_CONTINUE]: appInQUESTIONandInvalidForm },
    { [QUESTION_CONTINUE]: appInQUESTIONandValidFormAndNotReviewed },
    // NOTE : this should not happen via GUI as the button should be disabled! We still test it however
    { [TEAM_CONTINUE]: {} },
    { [TEAM_CLICKED]: clickedOnTeam },
    { [JOIN_OR_UNJOIN_TEAM_CLICKED]: appInTeamDetailInvalidForm }, // try to join with empty answer
    { [JOIN_OR_UNJOIN_TEAM_CLICKED]: appInTeamDetailValidForm[0] }, // then join the team 0
    { [SKIP_TEAM_CLICKED]: clickedOnSkipTeamInvalid }, // then skip with empty answer : should pass
    { [SKIP_TEAM_CLICKED]: clickedOnSkipTeamInvalid }, // then skip with empty answer : should block
    { [BACK_TEAM_CLICKED]: clickedOnBackInvalid }, // then back with empty answer : should block
    { [JOIN_OR_UNJOIN_TEAM_CLICKED]: appInTeamDetailInvalidForm }, // then unjoin the joined team with empty answer
    { [JOIN_OR_UNJOIN_TEAM_CLICKED]: appInTeamDetailValidForm[1] }, // then join the team 1
    { [BACK_TEAM_CLICKED]: clickedOnBackInvalid }, // then back with empty answer : should pass
    { [TEAM_CONTINUE]: {} },
    { [CHANGE_ABOUT]: {} },
    { [ABOUT_CONTINUE]: appInABOUTandValidFormAndReviewed },
    { [CHANGE_QUESTION]: {} },
    { [QUESTION_CONTINUE]: appInQUESTIONandValidFormAndReviewed },
    { [APPLICATION_COMPLETED]: {} },
  ];
  const machine = create_state_machine(fsm, default_settings);
  const results = inputSequence.map(machine.yield);
  const HTMLedResults = results.map(outputSequence => outputSequence.map(mapObjIndexed((value, sinkName) => {
    if (sinkName === 'DOM') return convertVNodesToHTML(value)
    else return value
  })));
  const expectedOutputSequences = [
    [renderINITscreen],
    [renderAboutInitScreen],
    [renderAboutErrorScreen],
    [
      {
        "DOM": renderQuestionScreen({}).DOM,
        "domainAction": updateAction({
          "step": "Question",
          "question": "",
          "hasBeenJoined": [false, false],
          "hasApplied": false,
          "hasReviewedApplication": false
        }).domainAction
      }
    ],
    [renderQuestionErrorScreen({})],
    [
      {
        "DOM": renderTeamScreen([false, false]).DOM,
        "domainAction": updateAction({
          "step": "Teams",
          "question": "That is what I like",
          "hasBeenJoined": [false, false],
          "hasApplied": false,
          "hasReviewedApplication": false
        }).domainAction,
      }
    ],
    [renderTeamScreen([false, false])],
    [renderTeamDetailJoinScreen('')[0]],
    [renderInvalidTeamDetailJoinScreen('')[0]],
    [renderTeamDetailJoinScreen('')[1]],
    [renderTeamDetailBackToUnjoinScreen(`Team 0 answer`)[0]],
    [renderInvalidTeamDetailUnjoinScreen('')[0]],
    [renderInvalidTeamDetailUnjoinScreen('')[0]],
    [renderTeamDetailJoinScreen('')[1]],
    [renderTeamDetailJoinScreen('')[0]],
    [renderTeamScreen([false, true])],
    [
      {
        "DOM": renderReviewScreen({ hasBeenJoined: [false, true] }).DOM,
        "domainAction": updateAction({
          "step": "Review",
          "question": "That is what I like",
          "hasBeenJoined": [false, true],
          answers: [``, `Team 1 answer`],
          "hasApplied": false,
          "hasReviewedApplication": true
        }).domainAction,
      }
    ],
    [renderAboutScreen({
      superPower: appInABOUTandValidFormAndNotReviewed.formData.superPower,
      phone: appInABOUTandValidFormAndNotReviewed.formData.phone,
      preferredName: appInABOUTandValidFormAndNotReviewed.formData.preferredName,
      zipCode: appInABOUTandValidFormAndNotReviewed.formData.zipCode,
      legalName: appInABOUTandValidFormAndNotReviewed.formData.legalName,
      birthday: appInABOUTandValidFormAndNotReviewed.formData.birthday
    })],
    [
      {
        "DOM": renderReviewScreen({ hasBeenJoined: [false, true], superPower : 'refly' }).DOM,
        "domainAction": updateAction({
          superPower : 'refly',
          "step": "Review",
          "question": "That is what I like",
          "hasBeenJoined": [false, true],
          answers: [``, `Team 1 answer`],
          "hasApplied": false,
          "hasReviewedApplication": true
        }).domainAction,
      }
    ],
    [renderQuestionScreen({ answer: appInQUESTIONandValidFormAndNotReviewed.formData.answer })],
    [
      {
        "DOM": renderReviewScreen({ hasBeenJoined: [false, true] , superPower : 'refly', question : "That is what I like so much" }).DOM,
        "domainAction": updateAction({
          "step": "Review",
          superPower : 'refly',
          "question": "That is what I like so much",
          "hasBeenJoined": [false, true],
          answers: [``, `Team 1 answer`],
          "hasApplied": false,
          "hasReviewedApplication": true
        }).domainAction,
      }
    ],
    [
      {
        "DOM": renderAppliedScreen.DOM,
        "domainAction": updateAction({
          "step": "Review",
          superPower : 'refly',
          "question": "That is what I like so much",
          "hasBeenJoined": [false, true],
          answers: [``, `Team 1 answer`],
          "hasApplied": true,
          "hasReviewedApplication": true
        }).domainAction,
      }
    ]
  ];

  inputSequence.forEach((event, index) => {
    assert.deepEqual(HTMLedResults[index], expectedOutputSequences[index], `${Object.keys(event)[0]}`)
  });
});

QUnit.test("Reviewed application saved in `Question` state : INIT -> Question -> Review -> Applied", function exec_test(assert) {
  // ["nok","INIT_S","Question","Review","State_Applied"],
  const inputSequence = [
    INIT_I,
    { [FETCH_EV]: appSavedInQuestionState },
    { [QUESTION_CONTINUE]: appInQUESTIONandValidFormAndNotReviewed },
    { [APPLICATION_COMPLETED]: {} }
  ];

  const machine = create_state_machine(fsm, default_settings);
  const results = inputSequence.map(machine.yield);
  const HTMLedResults = results.map(outputSequence => {
    if (outputSequence == null) return null
    return outputSequence.map(mapObjIndexed((value, sinkName) => {
      if (sinkName === 'DOM') return convertVNodesToHTML(value)
      else return value
    }))
  });

  assert.deepEqual(HTMLedResults, [
    [renderINITscreen],
    [renderQuestionScreen({})],
    [{
      DOM: renderReviewScreen({ hasBeenJoined: [true, false] }).DOM, "domainAction":
      updateAction({
        hasApplied: false,
        hasReviewedApplication: true,
        hasBeenJoined: [true, false],
        answers: [appSavedInQuestionState.userApplication.teams["-KFVqOyjPpR4pdgK-0Wr"].answer, ``]
      }).domainAction
    }],
    [{
      DOM: renderAppliedScreen.DOM,
      "domainAction": updateAction({
        hasApplied: true,
        hasReviewedApplication: true,
        hasBeenJoined: [true, false],
        answers: [appSavedInQuestionState.userApplication.teams["-KFVqOyjPpR4pdgK-0Wr"].answer, ``]
      }).domainAction
    }]], `["nok","INIT_S","Question","Review","State_Applied"]`)
});

QUnit.test("Reviewed application saved in `Teams` state : INIT -> Teams -> Review -> Applied", function exec_test(assert) {
  // ["nok","INIT_S","Teams","State_Applied"],
  const inputSequence = [
    INIT_I,
    { [FETCH_EV]: appSavedInTeamsStateWithTeam1Joined },
    { [TEAM_CONTINUE]: {} },
    { [APPLICATION_COMPLETED]: {} }
  ];

  const machine = create_state_machine(fsm, default_settings);
  const results = inputSequence.map(machine.yield);
  const HTMLedResults = results.map(outputSequence => {
    if (outputSequence == null) return null
    return outputSequence.map(mapObjIndexed((value, sinkName) => {
      if (sinkName === 'DOM') return convertVNodesToHTML(value)
      else return value
    }))
  });

  assert.deepEqual(HTMLedResults, [
    [renderINITscreen],
    [renderTeamScreen([true, false])],
    [{
      DOM: renderReviewScreen({ hasBeenJoined: [true, false] }).DOM, "domainAction":
      updateAction({
        hasApplied: false,
        hasReviewedApplication: true,
        hasBeenJoined: [true, false],
        answers: [appSavedInTeamsStateWithTeam1Joined.userApplication.teams["-KFVqOyjPpR4pdgK-0Wr"].answer, ``]
      }).domainAction
    }],
    [{
      DOM: renderAppliedScreen.DOM,
      "domainAction": updateAction({
        hasApplied: true,
        hasReviewedApplication: true,
        hasBeenJoined: [true, false],
        answers: [appSavedInTeamsStateWithTeam1Joined.userApplication.teams["-KFVqOyjPpR4pdgK-0Wr"].answer, ``]
      }).domainAction
    }]], `["nok","INIT_S","Teams","State_Applied"]`)
});

QUnit.test("Reviewed application saved in `Review` state : INIT -> Review -> Applied", function exec_test(assert) {
  // ["nok","INIT_S","Review","Teams","State_Applied"]
  const inputSequence = [
    INIT_I,
    { [FETCH_EV]: appSavedInReviewState },
    { [APPLICATION_COMPLETED]: {} }
  ];

  const machine = create_state_machine(fsm, default_settings);
  const results = inputSequence.map(machine.yield);
  const HTMLedResults = results.map(outputSequence => {
    if (outputSequence == null) return null
    return outputSequence.map(mapObjIndexed((value, sinkName) => {
      if (sinkName === 'DOM') return convertVNodesToHTML(value)
      else return value
    }))
  });

  assert.deepEqual(HTMLedResults, [
    [renderINITscreen],
    [{ DOM: renderReviewScreen({ hasBeenJoined: [true, false] }).DOM }],
    [{
      DOM: renderAppliedScreen.DOM,
      "domainAction": updateAction({
        hasApplied: true,
        hasReviewedApplication: true,
        hasBeenJoined: [true, false],
        answers: [appSavedInReviewState.userApplication.teams["-KFVqOyjPpR4pdgK-0Wr"].answer, ``]
      }).domainAction
    }]], `["nok","INIT_S","Review","Teams","State_Applied"]`)
});

// old for reference
QUnit.skip("Teams subscription permutations (N = testing events which do not progress the machine, Y = sequence up" +
  " to the final state)", function exec_test(assert) {
  const clickedOnSkipTeam = teamIndex => ({
    formData: {
      'answer': `Team ${teamIndex} skipped`
    }
  });
  const joinInvalid = { [JOIN_OR_UNJOIN_TEAM_CLICKED]: appInTeamDetailInvalidForm };
  const joinValid = { [JOIN_OR_UNJOIN_TEAM_CLICKED]: teamIndex => appInTeamDetailValidForm[teamIndex] };
  const skip = { [SKIP_TEAM_CLICKED]: clickedOnSkipTeam };
  const back = { [BACK_TEAM_CLICKED]: answer => appInTeamDetailBackValidForm(answer) };
  const apply = { [APPLICATION_COMPLETED]: {} };
  const teamContinue = { [TEAM_CONTINUE]: {} };

  const inputSequencePrefixes = {
    reviewedApp: [
      INIT_I,
      { [FETCH_EV]: appSavedInTeamsStateWithTeam1Joined },
      { [TEAM_CLICKED]: 0 },
    ],
    emptyApp: [
      INIT_I,
      { [FETCH_EV]: appUnsavedWithNoData },
      { [ABOUT_CONTINUE]: appInABOUTandValidFormAndNotReviewed },
      { [QUESTION_CONTINUE]: appInQUESTIONandValidFormAndNotReviewed },
      { [TEAM_CLICKED]: 0 },
    ]
  };
  const permutationsGenerator = [
    // 3
    [joinInvalid, joinValid, skip], // N
    [joinInvalid, skip, joinValid], // Y
    [joinValid, joinInvalid, skip], // N
    [joinValid, skip, joinInvalid], // N
    [skip, joinInvalid, joinValid], // Y
    [skip, joinValid, joinInvalid], // Y
    // 2
    [joinValid, skip], // N
    [skip, joinValid], // Y
    [joinInvalid, joinValid], // N
    [joinValid, joinInvalid], // N
    [joinInvalid, skip], // Y
    [skip, joinInvalid], // Y
    // 1
    [joinValid], // N
    [joinInvalid], // Y
    [skip], // Y
    // 0
    [] // Y
  ];
  const suffixGenerator = [back, teamContinue, apply];
  const teamInputSequenceGenerator = multiplyVectorByMatrixAndPrepend(suffixGenerator, permutationsGenerator);
  const generateTeamInputSequence = (acc, input) => {
    let { latestTeamIndex, latestAnswer, sequence } = acc;
    if (input === joinInvalid) {
      sequence = sequence.concat([input]);
      latestAnswer[latestTeamIndex] = '';
    }
    else if (input === joinValid) {
      sequence = sequence.concat({ [JOIN_OR_UNJOIN_TEAM_CLICKED]: input[JOIN_OR_UNJOIN_TEAM_CLICKED](latestTeamIndex) });
      latestAnswer[latestTeamIndex] = teamAnswer(latestTeamIndex);
      latestTeamIndex = (latestTeamIndex + 1) % 2;
    }
    else if (input === skip) {
      sequence = sequence.concat({ [SKIP_TEAM_CLICKED]: skippedTeamAnswer(latestTeamIndex) });
      latestAnswer[latestTeamIndex] = skippedTeamAnswer(latestTeamIndex).formData.answer;
      latestTeamIndex = (latestTeamIndex + 1) % 2;
    }
    else if (input === back) {
      sequence = sequence.concat({ [BACK_TEAM_CLICKED]: input[BACK_TEAM_CLICKED](latestAnswer[latestTeamIndex]) });
    }
    else if (input === teamContinue) {
      sequence = sequence.concat([input]);
    }
    else if (input === apply) {
      sequence = sequence.concat([input]);
    }
    else {
      throw `unknown input!`
    }

    return { latestTeamIndex, latestAnswer, sequence };
  };
  const arrTeamInputSequencesStruct = teamInputSequenceGenerator.map(permutation => {
    return permutation.reduce(generateTeamInputSequence,
      { latestTeamIndex: 0, latestAnswer: [`Team 0 answer`, ``], sequence: [] })
  });
  const arrTeamInputSequences = arrTeamInputSequencesStruct.map(sequenceStruct => sequenceStruct.sequence);
  const reviewedAppTestSequences = multiplyVectorByMatrixAndAppend(
    inputSequencePrefixes.reviewedApp,
    arrTeamInputSequences
  );

  const arrResults = reviewedAppTestSequences.map(sequence => {
    const machine = create_state_machine(fsm, default_settings);
    return sequence.map(machine.yield)
  });
  const HTMLedResults = arrResults.map(results => results.map(outputSequence => {
    if (outputSequence == null) return null
    return outputSequence.map(mapObjIndexed((value, sinkName) => {
      if (sinkName === 'DOM') return convertVNodesToHTML(value)
      else return value
    }))
  }));

  // compute output sequences
  const renderValidTeamDetailScreen = (answer, isJoined) => [{
    "DOM": `<div id=\"page\"><div class=\"ui icon message\"><i class=\"inbox icon\"></i><div class=\"content\"><div class=\"header\">Beyond and further</div><p>1984.09.09</p></div></div><div class=\"ui description\"><p>Complete your application for Beyond and further</p></div><div class=\"ui steps\"><a class=\"step\"><div class=\"content\">About</div></a><a class=\"step\"><div class=\"content\">Question</div></a><a class=\"active step\"><div class=\"content\">Teams</div></a><a class=\"step\"><div class=\"content\">Review</div></a></div><div class=\"ui bottom attached segment\"><div class=\"c-application__team_detail-back ui fluid negative button\" tabindex=\"0\">Back to teams</div><div class=\"ui divided selection list\"><a class=\"item\"><div class=\"ui horizontal label\">Parking</div>Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. </a></div><form class=\"ui form\"><div class=\"ui icon message\"><i class=\"inbox icon\"></i><div class=\"content\"><div class=\"header\">Have you worked parking for any other festivals? Which ones?</div><p>Team lead&#39;s name/role</p></div></div><div class=\"field\"><textarea class=\"c-textfield__input--team_detail_answer\" name=\"userapp[organizer-question]\" placeholder=\"Please enter your answer here\" value=${answer ? '"' + answer + '"' : '"Never"'} required=\"false\"></textarea><div class=\"c-textfield__error c-textfield__error--td\"></div></div></form></div><div class=\"ui fluid buttons\"><button class=\"c-btn c-btn--quiet c-application__submit--team_detail_skip ui button\">Skip this team</button><div class=\"or\"></div><button class=\"c-application__submit--team_detail_join ui positive button\">${isJoined ? 'Unjoin team' : 'Join team'}</button></div><div class=\"c-application__error\"></div></div>`
  }, {
    "DOM": "<div id=\"page\"><div class=\"ui icon message\"><i class=\"inbox icon\"></i><div class=\"content\"><div class=\"header\">Beyond and further</div><p>1984.09.09</p></div></div><div class=\"ui description\"><p>Complete your application for Beyond and further</p></div><div class=\"ui steps\"><a class=\"step\"><div class=\"content\">About</div></a><a class=\"step\"><div class=\"content\">Question</div></a><a class=\"active step\"><div class=\"content\">Teams</div></a><a class=\"step\"><div class=\"content\">Review</div></a></div><div class=\"ui bottom attached segment\"><div class=\"c-application__team_detail-back ui fluid negative button\" tabindex=\"0\">Back to teams</div><div class=\"ui divided selection list\"><a class=\"item\"><div class=\"ui horizontal label\">Box Office</div>The gateway to Cosmic Alignment! Here, you&#39;ll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.</a></div><form class=\"ui form\"><div class=\"ui icon message\"><i class=\"inbox icon\"></i><div class=\"content\"><div class=\"header\">Which festivals have you worked Box Office before?</div><p>Team lead&#39;s name/role</p></div></div><div class=\"field\"><textarea class=\"c-textfield__input--team_detail_answer\" name=\"userapp[organizer-question]\" placeholder=\"Please enter your answer here\" required=\"false\"></textarea><div class=\"c-textfield__error c-textfield__error--td\"></div></div></form></div><div class=\"ui fluid buttons\"><button class=\"c-btn c-btn--quiet c-application__submit--team_detail_skip ui button\">Skip this team</button><div class=\"or\"></div><button class=\"c-application__submit--team_detail_join ui positive button\">Join team</button></div><div class=\"c-application__error\"></div></div>"
  }];
  const renderInvalidTeamDetailScreen = (hasBeenJoined) => [{
    "DOM": `<div id=\"page\"><div class=\"ui icon message\"><i class=\"inbox icon\"></i><div class=\"content\"><div class=\"header\">Beyond and further</div><p>1984.09.09</p></div></div><div class=\"ui description\"><p>Complete your application for Beyond and further</p></div><div class=\"ui steps\"><a class=\"step\"><div class=\"content\">About</div></a><a class=\"step\"><div class=\"content\">Question</div></a><a class=\"active step\"><div class=\"content\">Teams</div></a><a class=\"step\"><div class=\"content\">Review</div></a></div><div class=\"ui bottom attached segment\"><div class=\"c-application__team_detail-back ui fluid negative button\" tabindex=\"0\">Back to teams</div><div class=\"ui divided selection list\"><a class=\"item\"><div class=\"ui horizontal label\">Parking</div>Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. </a></div><form class=\"ui form\"><div class=\"ui icon message\"><i class=\"inbox icon\"></i><div class=\"content\"><div class=\"header\">Have you worked parking for any other festivals? Which ones?</div><p>Team lead&#39;s name/role</p></div></div><div class=\"field\"><textarea class=\"c-textfield__input--team_detail_answer\" name=\"userapp[organizer-question]\" placeholder=\"Please enter your answer here\" required=\"false\"></textarea><div class=\"c-textfield__error c-textfield__error--td\">Mandatory field : please fill in !</div></div></form></div><div class=\"ui fluid buttons\"><button class=\"c-btn c-btn--quiet c-application__submit--team_detail_skip ui button\">Skip this team</button><div class=\"or\"></div><button class=\"c-application__submit--team_detail_join ui positive button\">${hasBeenJoined ? 'Unjoin team' : 'Join team'}</button></div><div class=\"c-application__error\"></div></div>`
  }, {
    "DOM": `<div id=\"page\"><div class=\"ui icon message\"><i class=\"inbox icon\"></i><div class=\"content\"><div class=\"header\">Beyond and further</div><p>1984.09.09</p></div></div><div class=\"ui description\"><p>Complete your application for Beyond and further</p></div><div class=\"ui steps\"><a class=\"step\"><div class=\"content\">About</div></a><a class=\"step\"><div class=\"content\">Question</div></a><a class=\"active step\"><div class=\"content\">Teams</div></a><a class=\"step\"><div class=\"content\">Review</div></a></div><div class=\"ui bottom attached segment\"><div class=\"c-application__team_detail-back ui fluid negative button\" tabindex=\"0\">Back to teams</div><div class=\"ui divided selection list\"><a class=\"item\"><div class=\"ui horizontal label\">Box Office</div>The gateway to Cosmic Alignment! Here, you&#39;ll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.</a></div><form class=\"ui form\"><div class=\"ui icon message\"><i class=\"inbox icon\"></i><div class=\"content\"><div class=\"header\">Which festivals have you worked Box Office before?</div><p>Team lead&#39;s name/role</p></div></div><div class=\"field\"><textarea class=\"c-textfield__input--team_detail_answer\" name=\"userapp[organizer-question]\" placeholder=\"Please enter your answer here\" required=\"false\"></textarea><div class=\"c-textfield__error c-textfield__error--td\">Mandatory field : please fill in !</div></div></form></div><div class=\"ui fluid buttons\"><button class=\"c-btn c-btn--quiet c-application__submit--team_detail_skip ui button\">Skip this team</button><div class=\"or\"></div><button class=\"c-application__submit--team_detail_join ui positive button\">${hasBeenJoined ? 'Unjoin team' : 'Join team'}</button></div><div class=\"c-application__error\"></div></div>`
  }];

  const outputs = [
    // [joinInvalid, joinValid, skip], // N
    [[renderINITscreen], [renderTeamScreen([true, false])], [renderValidTeamDetailScreen(null, true)[0]], [renderInvalidTeamDetailScreen(true)[0]], [renderValidTeamDetailScreen()[1]], [renderValidTeamDetailScreen(teamAnswer(0), false)[0]], [renderTeamScreen([false, false])], [renderTeamScreen([false, false])], null],
    // [joinInvalid, skip, joinValid ], // Y
    [[renderINITscreen], [renderTeamScreen([true, false])], [renderValidTeamDetailScreen(null, true)[0]], [renderInvalidTeamDetailScreen(true)[0]], [renderValidTeamDetailScreen()[1]], [renderValidTeamDetailScreen(skippedTeamAnswer(0).formData.answer, true)[0]], [renderTeamScreen([true, true])], [{
      DOM: renderReviewScreen({ hasBeenJoined: [true, true] }).DOM, "domainAction":
      updateAction({
        hasApplied: false,
        hasReviewedApplication: true,
        hasBeenJoined: [true, true],
        answers: [`Team 0 skipped`, `Team 1 answer`]
      }).domainAction
    }], [{
      DOM: renderAppliedScreen.DOM,
      "domainAction": updateAction({
        hasApplied: true,
        hasReviewedApplication: true,
        hasBeenJoined: [true, true],
        answers: [`Team 0 skipped`, `Team 1 answer`]
      }).domainAction
    }]],
    // [joinValid, joinInvalid, skip], // N
    [[renderINITscreen], [renderTeamScreen([true, false])], [renderValidTeamDetailScreen(null, true)[0]], [renderValidTeamDetailScreen()[1]], [renderInvalidTeamDetailScreen(false)[1]], [renderValidTeamDetailScreen(teamAnswer(0), false)[0]], [renderTeamScreen([false, false])], [renderTeamScreen([false, false])], null],
    // [joinValid, skip, joinInvalid], // N
    [[renderINITscreen], [renderTeamScreen([true, false])], [renderValidTeamDetailScreen(null, true)[0]], [renderValidTeamDetailScreen()[1]], [renderValidTeamDetailScreen(teamAnswer(0), false)[0]], [renderInvalidTeamDetailScreen(false)[0]], [renderTeamScreen([false, false])], [renderTeamScreen([false, false])], null],
    // [skip, joinInvalid, joinValid], // Y
    [[renderINITscreen], [renderTeamScreen([true, false])], [renderValidTeamDetailScreen(null, true)[0]], [renderValidTeamDetailScreen()[1]], [renderInvalidTeamDetailScreen(false)[1]], [renderValidTeamDetailScreen(skippedTeamAnswer(0).formData.answer, true)[0]], [renderTeamScreen([true, true])], [{
      DOM: renderReviewScreen({ hasBeenJoined: [true, true] }).DOM, "domainAction":
      updateAction({
        hasApplied: false,
        hasReviewedApplication: true,
        hasBeenJoined: [true, true],
        answers: [`Team 0 skipped`, `Team 1 answer`]
      }).domainAction
    }], [{
      DOM: renderAppliedScreen.DOM,
      "domainAction": updateAction({
        hasApplied: true,
        hasReviewedApplication: true,
        hasBeenJoined: [true, true],
        answers: [`Team 0 skipped`, `Team 1 answer`]
      }).domainAction
    }]],
    // [skip, joinValid, joinInvalid], // Y // TODO : actually no, joinInvalid would be unjoin and that's ok if
    // answer is empty
    [[renderINITscreen], [renderTeamScreen([true, false])], [renderValidTeamDetailScreen(null, true)[0]], [renderValidTeamDetailScreen()[1]], [renderValidTeamDetailScreen(skippedTeamAnswer(0).formData.answer, true)[0]], [renderInvalidTeamDetailScreen(true)[0]], [renderTeamScreen([true, true])], [{
      DOM: renderReviewScreen({ hasBeenJoined: [true, true] }).DOM, "domainAction":
      updateAction({
        hasApplied: false,
        hasReviewedApplication: true,
        hasBeenJoined: [true, true],
        answers: [``, `Team 1 answer`]
      }).domainAction
    }], [{
      DOM: renderAppliedScreen.DOM,
      "domainAction": updateAction({
        hasApplied: true,
        hasReviewedApplication: true,
        hasBeenJoined: [true, true],
        answers: [``, `Team 1 answer`]
      }).domainAction
    }]],
    // // 2
    // [joinValid, skip], // N
    [[renderINITscreen], [renderTeamScreen([true, false])], [renderValidTeamDetailScreen(null, true)[0]], [renderValidTeamDetailScreen()[1]], [renderValidTeamDetailScreen(teamAnswer(0), false)[0]], [renderTeamScreen([false, false])], [renderTeamScreen([false, false])], null],
    // [skip, joinValid], // Y
    [[renderINITscreen], [renderTeamScreen([true, false])], [renderValidTeamDetailScreen(null, true)[0]], [renderValidTeamDetailScreen()[1]], [renderValidTeamDetailScreen(skippedTeamAnswer(0).formData.answer, true)[0]], [renderTeamScreen([true, true])], [{
      DOM: renderReviewScreen({ hasBeenJoined: [true, true] }).DOM, "domainAction":
      updateAction({
        hasApplied: false,
        hasReviewedApplication: true,
        hasBeenJoined: [true, true],
        answers: [`Team 0 skipped`, `Team 1 answer`]
      }).domainAction
    }], [{
      DOM: renderAppliedScreen.DOM,
      "domainAction": updateAction({
        hasApplied: true,
        hasReviewedApplication: true,
        hasBeenJoined: [true, true],
        answers: [`Team 0 skipped`, `Team 1 answer`]
      }).domainAction
    }]],
    // [joinInvalid, joinValid], // N
    [[renderINITscreen], [renderTeamScreen([true, false])], [renderValidTeamDetailScreen(null, true)[0]], [renderInvalidTeamDetailScreen(true)[0]], [renderValidTeamDetailScreen()[1]], [renderTeamScreen([false, false])], [renderTeamScreen([false, false])], null],
    // [joinValid, joinInvalid], // N
    [[renderINITscreen], [renderTeamScreen([true, false])], [renderValidTeamDetailScreen(null, true)[0]], [renderValidTeamDetailScreen()[1]], [renderInvalidTeamDetailScreen(false)[1]], [renderTeamScreen([false, false])], [renderTeamScreen([false, false])], null],
    // [joinInvalid, skip], // Y
    [[renderINITscreen], [renderTeamScreen([true, false])], [renderValidTeamDetailScreen(null, true)[0]], [renderInvalidTeamDetailScreen(true)[0]], [renderValidTeamDetailScreen()[1]], [renderTeamScreen([true, false])], [{
      DOM: renderReviewScreen({ hasBeenJoined: [true, false] }).DOM, "domainAction":
      updateAction({
        hasApplied: false,
        hasReviewedApplication: true,
        hasBeenJoined: [true, false],
        latestTeamIndex: 1,
        // TODO : correct the answer : undefined
        // TODO : correct the skip with empty answer (not detected by my tests by the way - use as example of data
        // coverage necessity)
        // Keep the bugs!! then do another branch with all tests passing!! but don't forget to mrge the last branch
        // in master
        // TODO : so here the actual output is undefined on the first update action, and no answer proprty on the
        // second!
        answers: [`Team 0 skipped`, ``]
      }).domainAction
    }], [{
      DOM: renderAppliedScreen.DOM,
      "domainAction": updateAction({
        hasApplied: true,
        hasReviewedApplication: true,
        hasBeenJoined: [true, false],
        latestTeamIndex: 1,
        answers: [`Team 0 skipped`, ``]
      }).domainAction
    }]],
    // [skip, joinInvalid], // Y
    [[renderINITscreen], [renderTeamScreen([true, false])], [renderValidTeamDetailScreen(null, true)[0]], [renderValidTeamDetailScreen()[1]], [renderInvalidTeamDetailScreen(false)[1]], [renderTeamScreen([true, false])], [{
      DOM: renderReviewScreen({ hasBeenJoined: [true, false] }).DOM, "domainAction":
      updateAction({
        hasApplied: false,
        hasReviewedApplication: true,
        hasBeenJoined: [true, false],
        latestTeamIndex: 1,
        answers: [`Team 0 skipped`, ``]
      }).domainAction
    }], [{
      DOM: renderAppliedScreen.DOM,
      "domainAction": updateAction({
        hasApplied: true,
        hasReviewedApplication: true,
        hasBeenJoined: [true, false],
        latestTeamIndex: 1,
        answers: [`Team 0 skipped`, ``]
      }).domainAction
    }]],
    // // 1
    // [joinValid], // N
    [[renderINITscreen], [renderTeamScreen([true, false])], [renderValidTeamDetailScreen(null, true)[0]], [renderValidTeamDetailScreen()[1]], [renderTeamScreen([false, false])], [renderTeamScreen([false, false])], null],
    // [joinInvalid], // Y
    // TODO : correct bug : maybe that happpens because of back button putting nothing ? yes
    [[renderINITscreen], [renderTeamScreen([true, false])], [renderValidTeamDetailScreen(null, true)[0]], [renderInvalidTeamDetailScreen(true)[0]], [renderTeamScreen([true, false])], [{
      DOM: renderReviewScreen({ hasBeenJoined: [true, false] }).DOM, "domainAction":
      updateAction({
        hasApplied: false,
        hasReviewedApplication: true,
        hasBeenJoined: [true, false],
        latestTeamIndex: 0,
        answers: [`Team 0 answer`, ``]
      }).domainAction
    }], [{
      DOM: renderAppliedScreen.DOM,
      "domainAction": updateAction({
        hasApplied: true,
        hasReviewedApplication: true,
        hasBeenJoined: [true, false],
        latestTeamIndex: 0,
        answers: [`Team 0 answer`, ``]
      }).domainAction
    }]],
    // [skip], // Y
    [[renderINITscreen], [renderTeamScreen([true, false])], [renderValidTeamDetailScreen(null, true)[0]], [renderValidTeamDetailScreen()[1]], [renderTeamScreen([true, false])], [{
      DOM: renderReviewScreen({ hasBeenJoined: [true, false] }).DOM, "domainAction":
      updateAction({
        hasApplied: false,
        hasReviewedApplication: true,
        hasBeenJoined: [true, false],
        latestTeamIndex: 1,
        answers: [`Team 0 skipped`, ``]
      }).domainAction
    }], [{
      DOM: renderAppliedScreen.DOM,
      "domainAction": updateAction({
        hasApplied: true,
        hasReviewedApplication: true,
        hasBeenJoined: [true, false],
        latestTeamIndex: 1,
        answers: [`Team 0 skipped`, ``]
      }).domainAction
    }]],
    // // 0
    // [] // Y
    [[renderINITscreen], [renderTeamScreen([true, false])], [renderValidTeamDetailScreen(null, true)[0]], [renderTeamScreen([true, false])], [{
      DOM: renderReviewScreen({ hasBeenJoined: [true, false] }).DOM, "domainAction":
      updateAction({
        hasApplied: false,
        hasReviewedApplication: true,
        hasBeenJoined: [true, false],
        latestTeamIndex: 0,
        answers: [`Team 0 answer`, ``]
      }).domainAction
    }], [{
      DOM: renderAppliedScreen.DOM,
      "domainAction": updateAction({
        hasApplied: true,
        hasReviewedApplication: true,
        hasBeenJoined: [true, false],
        latestTeamIndex: 0,
        answers: [`Team 0 answer`, ``]
      }).domainAction
    }]],
  ];
  const testDescriptions = [
    `[joinInvalid, joinValid, skip], // N`,
    `[joinInvalid, skip, joinValid], // Y`,
    `[joinValid, joinInvalid, skip], // N`,
    `[joinValid, skip, joinInvalid], // N`,
    `[skip, joinInvalid, joinValid], // Y`,
    `[skip, joinValid, joinInvalid], // Y`,
    `[joinValid, skip], // N`,
    `[skip, joinValid], // Y`,
    `[joinInvalid, joinValid], // N`,
    `[joinValid, joinInvalid], // N`,
    `[joinInvalid, skip], // Y`,
    `[skip, joinInvalid], // Y`,
    `[joinValid], // N`,
    `[joinInvalid], // Y`,
    `[skip], // Y`,
    `[] // Y`
  ];
  HTMLedResults.forEach((htmlResult, index) => assert.deepEqual(htmlResult, outputs[index], testDescriptions[index]))
});

QUnit.skip("Teams subscription permutations", function exec_test(assert) {
  const clickedOnSkipTeam = teamIndex => ({
    formData: {
      'answer': `Team ${teamIndex} skipped`
    }
  });
  const clickedOnSkipTeamInvalid = teamIndex => ({
    formData: {
      'answer': ``
    }
  });

  const joinInvalid = { [JOIN_OR_UNJOIN_TEAM_CLICKED]: appInTeamDetailInvalidForm };
  const joinValid = { [JOIN_OR_UNJOIN_TEAM_CLICKED]: teamIndex => appInTeamDetailValidForm[teamIndex] };
  const skipValid = { [SKIP_TEAM_CLICKED]: clickedOnSkipTeam };
  const skipInvalid = { [SKIP_TEAM_CLICKED]: clickedOnSkipTeamInvalid };
  const back = { [BACK_TEAM_CLICKED]: answer => appInTeamDetailBackValidForm(answer) };
  const apply = { [APPLICATION_COMPLETED]: {} };
  const teamContinue = { [TEAM_CONTINUE]: {} };

  const inputSequencePrefixes = {
    reviewedApp: [
      INIT_I,
      { [FETCH_EV]: appSavedInTeamsStateWithTeam1Joined },
      { [TEAM_CLICKED]: 0 },
    ],
  };
  // TODO : I am here : add skip & valid in the state machine def
  const nPermutations = genNperm(4);
  const permutationsGenerator = nPermutations.map(perm => {
    return perm.map(indexPlus1 => [joinInvalid, joinValid, skipValid, skipInvalid][indexPlus1 - 1])
  });
  // const permutationsGenerator = [
  //   // 3
  //   [joinInvalid, joinValid, skip], // N
  //   [joinInvalid, skip, joinValid], // Y
  //   [joinValid, joinInvalid, skip], // N
  //   [joinValid, skip, joinInvalid], // N
  //   [skip, joinInvalid, joinValid], // Y
  //   [skip, joinValid, joinInvalid], // Y
  //   // 2
  //   [joinValid, skip], // N
  //   [skip, joinValid], // Y
  //   [joinInvalid, joinValid], // N
  //   [joinValid, joinInvalid], // N
  //   [joinInvalid, skip], // Y
  //   [skip, joinInvalid], // Y
  //   // 1
  //   [joinValid], // N
  //   [joinInvalid], // Y
  //   [skip], // Y
  //   // 0
  //   [] // Y
  // ];
  const suffixGenerator = [back, teamContinue, apply];
  const teamInputSequenceGenerator = multiplyVectorByMatrixAndPrepend(suffixGenerator, permutationsGenerator);
  const generateTeamInputSequence = (acc, input) => {
    let { latestTeamIndex, latestAnswer, sequence } = acc;
    if (input === joinInvalid) {
      sequence = sequence.concat([input]);
      latestAnswer[latestTeamIndex] = '';
    }
    else if (input === joinValid) {
      sequence = sequence.concat({ [JOIN_OR_UNJOIN_TEAM_CLICKED]: input[JOIN_OR_UNJOIN_TEAM_CLICKED](latestTeamIndex) });
      latestAnswer[latestTeamIndex] = teamAnswer(latestTeamIndex);
      latestTeamIndex = (latestTeamIndex + 1) % 2;
    }
    else if (input === skipValid) {
      sequence = sequence.concat({ [SKIP_TEAM_CLICKED]: skippedTeamAnswer(latestTeamIndex) });
      latestAnswer[latestTeamIndex] = skippedTeamAnswer(latestTeamIndex).formData.answer;
      latestTeamIndex = (latestTeamIndex + 1) % 2;
    }
    else if (input === skipInvalid) {
      sequence = sequence.concat({ [SKIP_TEAM_CLICKED]: skippedTeamAnswerInvalid(latestTeamIndex) });
      latestAnswer[latestTeamIndex] = skippedTeamAnswerInvalid(latestTeamIndex).formData.answer;
    }
    else if (input === back) {
      sequence = sequence.concat({ [BACK_TEAM_CLICKED]: input[BACK_TEAM_CLICKED](latestAnswer[latestTeamIndex]) });
    }
    else if (input === teamContinue) {
      sequence = sequence.concat([input]);
    }
    else if (input === apply) {
      sequence = sequence.concat([input]);
    }
    else {
      throw `unknown input!`
    }

    return { latestTeamIndex, latestAnswer, sequence };
  };
  const arrTeamInputSequencesStruct = teamInputSequenceGenerator.map(permutation => {
    return permutation.reduce(generateTeamInputSequence,
      { latestTeamIndex: 0, latestAnswer: [`Team 0 answer`, ``], sequence: [] })
  });
  const arrTeamInputSequences = arrTeamInputSequencesStruct.map(sequenceStruct => sequenceStruct.sequence);
  const reviewedAppTestSequences = multiplyVectorByMatrixAndAppend(
    inputSequencePrefixes.reviewedApp,
    arrTeamInputSequences
  );

  // TODO : rwrite in a streamy way : for each HTMLedResults, run the assert
  const arrResults = reviewedAppTestSequences
    .map(sequence => {
      const machine = create_state_machine(fsm, default_settings);
      return sequence.map(machine.yield)
    })
    .map(arr => arr[arr.length - 1]);
  const HTMLedResults = arrResults.map(lastOutput => {
    if (lastOutput == null) return null
    return mapObjIndexed((value, sinkName) => {
      if (sinkName === 'DOM') return convertVNodesToHTML(value)
      else return value
    }, lastOutput)
  });

  // TODO : rules
  // if join : answer not empty (join [valid && not joined])
  // if join : answer empty (join [invalid && not joined])
  // if unjoin : keep answer (join [joined]) (it is ok to have an empty answer in that case!! pb with previous too then)
  // if skip && not joined : keep answer
  // if skip && joined : answer must be non-empty
  // if back && joined : answer must be non-empty
  // if back && not joined : keep answer
  // those rules ensure that no tema is joined and has an empty answer
  // TODO : redraw the fsm graph yed.
  // add four transitions : skipValid, skipInvalid, backInvalid, joinUnjoin, joinJoinValid, joinJoinInvalid (backValid)
  // so we have now 6 transitions instead of 3!!!
  // also in my tests I need to geenerate 6 permutations : [skipValid, skipInvalid, joinUnjoin, joinJoinValid,
  // joinJoinInvalid, backInvalid] TODO!!
  // compute output sequences TODO : hasBeenJoined: []
  const generateTeamOutputSequence = (acc, input) => {
    let { latestTeamIndex, latestAnswer, hasBeenJoined, isValidSequence } = acc;
    if (input === joinInvalid) {
      latestAnswer[latestTeamIndex] = '';
      isValidSequence = false;
    }
    else if (input === joinValid) {
      latestAnswer[latestTeamIndex] = teamAnswer(latestTeamIndex);
      latestTeamIndex = (latestTeamIndex + 1) % 2;
      hasBeenJoined[latestTeamIndex] = !hasBeenJoined[latestTeamIndex];
      isValidSequence = true;
    }
    else if (input === skipValid) {
      latestAnswer[latestTeamIndex] = skippedTeamAnswer(latestTeamIndex).formData.answer;
      latestTeamIndex = (latestTeamIndex + 1) % 2;
      isValidSequence = true;
    }
    else if (input === skipInvalid) {
      latestAnswer[latestTeamIndex] = skippedTeamAnswerInvalid(latestTeamIndex).formData.answer;
      isValidSequence = false;
    }
    else if (input === back) {
    }
    else if (input === teamContinue) {
    }
    else if (input === apply) {
    }
    else {
      throw `unknown input!`
    }

    return { latestTeamIndex, latestAnswer, hasBeenJoined, isValidSequence };
  };
  const outputSequenceStruct = teamInputSequenceGenerator.map(permutation => {
    return permutation.reduce(generateTeamOutputSequence,
      { latestTeamIndex: 0, latestAnswer: [`Team 0 answer`, ``], hasBeenJoined: [true, false], isValidSequence: true })
  });
  const outputs = [
    // [joinInvalid, joinValid, skip], // N
    [null],
    // [joinInvalid, skip, joinValid ], // Y
    [{
      DOM: renderAppliedScreen.DOM,
      "domainAction": updateAction({
        hasApplied: true,
        hasReviewedApplication: true,
        hasBeenJoined: [true, false], // TODO
        latestTeamIndex: 0, // TODO
        answers: [`Team 0 answer`, ``] // TODO
      }).domainAction
    }],
  ];
  const testDescriptions = nPermutations.map(perm => {
    return perm.map(indexPlus1 => [`joinInvalid`, `joinValid`, `skipValid`, `skipInvalid`][indexPlus1 - 1])
  });
  HTMLedResults.forEach((htmlResult, index) =>
    assert.deepEqual(htmlResult, outputs[index], testDescriptions[index].join(', ')));
});
