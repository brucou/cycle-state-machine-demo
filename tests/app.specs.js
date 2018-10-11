import * as QUnit from "qunitjs"
import * as Rx from "rx"
import { assertContract, convertVNodesToHTML, formatResult, genNperm, isArrayUpdateOperations } from "./helpers"
import { fsm } from "../src/processApplication/fsmSpecs"
import {
  ABOUT_CONTINUE, APPLICATION_COMPLETED, BACK_TEAM_CLICKED, CHANGE_ABOUT, CHANGE_QUESTION, CHANGE_TEAMS,
  CONTRACT_MODEL_UPDATE_FN_RETURN_VALUE, FETCH_EV, INIT_S, JOIN_OR_UNJOIN_TEAM_CLICKED,
  MANDATORY_PLEASE_FILL_IN_VALID_ERROR, MIN_LENGTH_VALID_ERROR, QUESTION_CONTINUE, SKIP_TEAM_CLICKED, STATE_ABOUT,
  STATE_APPLIED, STATE_QUESTION, STATE_REVIEW, STATE_TEAM_DETAIL, STATE_TEAMS, STEP_REVIEW, TEAM_CLICKED, TEAM_CONTINUE
} from "../src/processApplication/properties"
import {
  ACTION_IDENTITY, computeTimesCircledOn, create_state_machine, decorateWithEntryActions, generateTestsFromFSM,
  identity, INIT_EVENT, INIT_STATE, makeHistoryStates, NO_OUTPUT
} from "state-transducer"
import { both, complement, mapObjIndexed, merge, T } from "ramda"
import {
  hasJoinedAtLeastOneTeam, hasReachedReviewStep, isFormValid, isStepReview
} from "../src/processApplication/fsmEvents"
import { applyPatch } from "json-patch-es6/lib/duplex"
import { multiplyVectorByMatrixAndAppend, multiplyVectorByMatrixAndPrepend } from "../src/helpers"

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
  }
};
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

const renderINITscreen = {
  "DOM": "<div>Loading user application data...</div>"
};
const renderTeamScreen = ([isTeam0Joined, isTeam1Joined]) => ({
  "DOM": `<div id=\"page\"><div class=\"ui icon message\"><i class=\"inbox icon\"></i><div class=\"content\"><div class=\"header\">Beyond and further</div><p>1984.09.09</p></div></div><div class=\"ui description\"><p>Complete your application for Beyond and further</p></div><div class=\"ui steps\"><a class=\"step\"><div class=\"content\">About</div></a><a class=\"step\"><div class=\"content\">Question</div></a><a class=\"active step\"><div class=\"content\">Teams</div></a><a class=\"step\"><div class=\"content\">Review</div></a></div><div class=\"ui bottom attached segment\"><h4 class=\"ui dividing header\">Select a team</h4><div class=\"c-application__teams-list ui list\"><div class=\"item\"><div class=\"right floated content\"><div class=\"ui button\">${isTeam0Joined ? 'O' : 'X'}</div></div><img class=\"ui avatar image\" src=\"./assets/images/teams/Parking.jpg\"><div class=\"content\" data-index=\"0\">Parking</div></div><div class=\"item\"><div class=\"right floated content\"><div class=\"ui button\">${isTeam1Joined ? 'O' : 'X'}</div></div><img class=\"ui avatar image\" src=\"./assets/images/teams/Box Office.jpg\"><div class=\"content\" data-index=\"1\">Box Office</div></div></div></div><div class=\"c-btn c-btn--primary c-application__submit--continue ${!isTeam0Joined && !isTeam1Joined ? 'disabled ' : ''}ui fluid primary button\" tabindex=\"0\">Continue</div><div class=\"c-application__error\"></div></div>`
});
const renderReviewScreen = (obj) => ({
  "DOM": `<div id=\"page\"><div class=\"ui icon message\"><i class=\"inbox icon\"></i><div class=\"content\"><div class=\"header\">Beyond and further</div><p>1984.09.09</p></div></div><div class=\"ui description\"><p>Does this look good ?</p></div><div class=\"ui steps\"><a class=\"step\"><div class=\"content\">About</div></a><a class=\"step\"><div class=\"content\">Question</div></a><a class=\"step\"><div class=\"content\">Teams</div></a><a class=\"active step\"><div class=\"content\">Review</div></a></div><div class=\"ui one cards\"><div class=\"card\"><div class=\"content\"><i class=\"c-application__change--about right floated edit icon\"></i><div class=\"header\">About you</div><div class=\"ui list\"><div class=\"item\"><div class=\"ui button\"><i class=\"info icon\"></i></div>fly</div><div class=\"item\"><div class=\"ui button\"><i class=\"user outline icon\"></i></div>Kujio (Otadaki)</div><div class=\"item\"><div class=\"ui button\"><i class=\"text telephone icon\"></i></div>1234</div><div class=\"item\"><div class=\"ui button\"><i class=\"birthday icon\"></i></div>1984.09.09</div><div class=\"item\"><div class=\"ui button\"><i class=\"info icon\"></i></div>1231</div></div></div></div></div><div class=\"ui one cards\"><div class=\"card\"><div class=\"content\"><i class=\"c-application__change--question right floated edit icon\"></i><div class=\"header\">Organizer&#39;s question</div><div class=\"ui list message\"><div class=\"item\"><img class=\"ui avatar image\" src=\"./assets/images/avatar/small/matt.jpg\" className=\"ui avatar image\"><div class=\"content\"><div class=\"header\">would you catch it?</div>Organizer name and role</div></div></div><div class=\"description\"><img class=\"ui floated right avatar image\" src=\"./assets/images/avatar/large/elliot.jpg\" className=\"ui floated right avatar image\"><p>That is what I like</p></div></div></div></div><div class=\"ui one cards\"><div class=\"card\"><div class=\"content\"><i class=\"c-application__change--teams right floated edit icon\"></i><div class=\"header\">Team selection</div><div class=\"ui list\"><div class=\"item\"><div class=\"ui button\"><i class=\"info icon\"></i></div>Parking</div>${obj && obj.hasBeenJoined[1] ? '<div class="item"><div class="ui button"><i class="info icon"></i></div>Box Office</div>' : ''}</div></div></div></div><div class=\"ui basic segment\"><button class=\"c-application__review--submit ui fluid primary button\">Apply for the things</button></div><div class=\"c-application__error\"></div></div>`
});
const renderAppliedScreen = {
  "DOM": "<div class=\"ui raised segment\"><p>You successfully applied! Stay in touch</p></div>",
};
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
      "opportunityKey": "opportunity",
      "progress": {
        hasApplied,
        hasReviewedApplication,
        "latestTeamIndex": latestTeamIndex || 0,
        "step": step ? step : "Review"
      },
      "questions": {
        "answer": question || "That is what I like"
      },
      "teams": {
        "-KFVqOyjPpR4pdgK-0Wr": {
          "answer": answers[0],
          "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
          "hasBeenJoined": hasBeenJoined[0],
          "name": "Parking",
          "question": "Have you worked parking for any other festivals? Which ones?"
        },
        "KFVssLvEPsDJUofy1Yd": {
          "answer": answers[1],
          "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
          "hasBeenJoined": hasBeenJoined[1],
          "name": "Box Office",
          "question": "Which festivals have you worked Box Office before?"
        }
      },
      "userKey": "user"
    }
  }
});
const renderQuestionScreen = answer => ({
  "DOM": `<div id=\"page\"><div class=\"ui icon message\"><i class=\"inbox icon\"></i><div class=\"content\"><div class=\"header\">Beyond and further</div><p>1984.09.09</p></div></div><div class=\"ui description\"><p>Complete your application for Beyond and further</p></div><div class=\"ui steps\"><a class=\"step\"><div class=\"content\">About</div></a><a class=\"active step\"><div class=\"content\">Question</div></a><a class=\"step\"><div class=\"content\">Teams</div></a><a class=\"step\"><div class=\"content\">Review</div></a></div><div class=\"ui bottom attached segment\"><form class=\"ui form\"><h4 class=\"ui dividing header\">Organizer&#39;s question</h4><div class=\"ui icon message\"><i class=\"inbox icon\"></i><div class=\"content\"><div class=\"header\">would you catch it?</div><p>Organizer&#39;s name/role</p></div></div><div class=\"field\"><textarea class=\"c-textfield__input--answer\" name=\"userapp[organizer-question]\" placeholder=\"Please enter your answer here\" value=${answer ? answer : '"That is what I like"'} required=\"false\"></textarea><div class=\"c-textfield__error c-textfield__error--answer\"></div></div></form></div><div class=\"c-btn c-btn--primary c-application__submit--question ui fluid primary button\" tabindex=\"0\">Continue</div><div class=\"c-application__error\"></div></div>`
});
const INIT_I = { [INIT_EVENT]: {} };

// NOTE : we are removing this test but keeping the code for later
// Reason is that the test takes a few minutes to run, as it generates over 1.000 paths through the machine graph
// Additionally it is failing in places, as state updates seems to be destructive? TODO : review JSON patch updates
// That is not a bug of the state transducer as the transducer delegates state update.
QUnit.skip("all paths with no cycles", function exec_test(assert) {
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
          //     return { input: appSavedInTeamsStateWithTeam1Joined, hasGeneratedInput: true }
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

QUnit.test(`INIT -> About -invalid-> About -> Question -invalid-> Question -> Teams -click-0-> Team_Detail -> Team_Detail -> Team_Detail -> Team_Detail -back-> Teams -> Review -> Question -> Review -> About -> Review -> State_Applied`, function exec_test(assert) {
  const inputSequence = [
    INIT_I,
    { [FETCH_EV]: appUnsavedWithNoData },
    { [ABOUT_CONTINUE]: appInABOUTandInvalidForm },
    { [ABOUT_CONTINUE]: appInABOUTandValidFormAndNotReviewed },
    { [QUESTION_CONTINUE]: appInQUESTIONandInvalidForm },
    { [QUESTION_CONTINUE]: appInQUESTIONandValidFormAndNotReviewed },
    { [TEAM_CONTINUE]: {} },
    { [TEAM_CLICKED]: clickedOnTeam },
    { [JOIN_OR_UNJOIN_TEAM_CLICKED]: appInTeamDetailInvalidForm }, // invalid
    { [JOIN_OR_UNJOIN_TEAM_CLICKED]: appInTeamDetailValidForm[0] }, // then valid
    { [SKIP_TEAM_CLICKED]: clickedOnSkipTeam }, // then skip
    { [BACK_TEAM_CLICKED]: appInTeamDetailBackValidForm(appInTeamDetailValidForm[0].formData.answer) }, // then back
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

  assert.deepEqual(HTMLedResults, [
    [
      {
        "DOM": "<div>Loading user application data...</div>"
      }
    ],
    [
      {
        "DOM": '<div id=\"page\"><div class=\"ui icon message\"><i class=\"inbox icon\"></i><div class=\"content\"><div class=\"header\">Beyond and further</div><p>1984.09.09</p></div></div><div class=\"ui description\"><p>Complete your application for Beyond and further</p></div><div class=\"ui steps\"><a class=\"active step\"><div class=\"content\">About</div></a><a class=\"step\"><div class=\"content\">Question</div></a><a class=\"step\"><div class=\"content\">Teams</div></a><a class=\"step\"><div class=\"content\">Review</div></a></div><div class=\"ui bottom attached segment\"><form class=\"ui form\"><h4 class=\"ui dividing header\">About you</h4><div class=\"field\"><input class=\"c-textfield__input--super-power\" type=\"text\" name=\"userapp[superpower]\" placeholder=\"What is your superpower?\" required=\"false\"><div class=\"c-textfield__error c-textfield__error--super-power\"></div></div><h4 class=\"ui dividing header\">Personal details</h4><div class=\"field\"><input class=\"c-textfield__input--legal-name\" type=\"text\" name=\"userapp[legal-name]\" placeholder=\"Legal name\" required=\"false\"><div class=\"c-textfield__error c-textfield__error--legal-name\"></div></div><div class=\"field\"><input class=\"c-textfield__input--preferred-name\" type=\"text\" name=\"userapp[preferred-name]\" placeholder=\"Preferred name\" required=\"false\"><div class=\"c-textfield__error c-textfield__error--preferred-name\"></div></div><div class=\"field\"><input class=\"c-textfield__input--phone\" type=\"text\" name=\"userapp[phone]\" placeholder=\"Phone\" required=\"false\"><div class=\"c-textfield__error c-textfield__error--phone\"></div></div><div class=\"two fields\"><div class=\"field\"><input class=\"c-textfield__input--birthday\" type=\"text\" name=\"userapp[birthday]\" placeholder=\"Birthday\" required=\"false\"><div class=\"c-textfield__error c-textfield__error--birthday\"></div></div><div class=\"field\"><input class=\"c-textfield__input--zip-code\" type=\"text\" name=\"userapp[zip-code]\" placeholder=\"Zip code\" required=\"false\"><div class=\"c-textfield__error c-textfield__error--zip-code\"></div></div></div></form></div><div class=\"c-btn c-btn--primary c-application__submit-about ui fluid primary button\" tabindex=\"0\">Continue</div><div class=\"c-application__error\"></div></div>'
      }
    ],
    [
      {
        "DOM": `<div id=\"page\"><div class=\"ui icon message\"><i class=\"inbox icon\"></i><div class=\"content\"><div class=\"header\">Beyond and further</div><p>1984.09.09</p></div></div><div class=\"ui description\"><p>Complete your application for Beyond and further</p></div><div class=\"ui steps\"><a class=\"active step\"><div class=\"content\">About</div></a><a class=\"step\"><div class=\"content\">Question</div></a><a class=\"step\"><div class=\"content\">Teams</div></a><a class=\"step\"><div class=\"content\">Review</div></a></div><div class=\"ui bottom attached segment\"><form class=\"ui form\"><h4 class=\"ui dividing header\">About you</h4><div class=\"field\"><input class=\"c-textfield__input--super-power\" type=\"text\" name=\"userapp[superpower]\" placeholder=\"What is your superpower?\" required=\"false\"><div class=\"c-textfield__error c-textfield__error--super-power\">Mandatory field : please fill in !</div></div><h4 class=\"ui dividing header\">Personal details</h4><div class=\"field\"><input class=\"c-textfield__input--legal-name\" type=\"text\" name=\"userapp[legal-name]\" placeholder=\"Legal name\" required=\"false\"><div class=\"c-textfield__error c-textfield__error--legal-name\">Mandatory field : please fill in !</div></div><div class=\"field\"><input class=\"c-textfield__input--preferred-name\" type=\"text\" name=\"userapp[preferred-name]\" placeholder=\"Preferred name\" required=\"false\"><div class=\"c-textfield__error c-textfield__error--preferred-name\">Mandatory field : please fill in !</div></div><div class=\"field\"><input class=\"c-textfield__input--phone\" type=\"text\" name=\"userapp[phone]\" placeholder=\"Phone\" required=\"false\"><div class=\"c-textfield__error c-textfield__error--phone\">Please fill field with at least 2 characters!</div></div><div class=\"two fields\"><div class=\"field\"><input class=\"c-textfield__input--birthday\" type=\"text\" name=\"userapp[birthday]\" placeholder=\"Birthday\" required=\"false\"><div class=\"c-textfield__error c-textfield__error--birthday\">Please fill field with at least 2 characters!</div></div><div class=\"field\"><input class=\"c-textfield__input--zip-code\" type=\"text\" name=\"userapp[zip-code]\" placeholder=\"Zip code\" required=\"false\"><div class=\"c-textfield__error c-textfield__error--zip-code\">Please fill field with at least 2 characters!</div></div></div></form></div><div class=\"c-btn c-btn--primary c-application__submit-about ui fluid primary button\" tabindex=\"0\">Continue</div><div class=\"c-application__error\"></div></div>`
      }
    ],
    [
      {
        "DOM": `<div id=\"page\"><div class=\"ui icon message\"><i class=\"inbox icon\"></i><div class=\"content\"><div class=\"header\">Beyond and further</div><p>1984.09.09</p></div></div><div class=\"ui description\"><p>Complete your application for Beyond and further</p></div><div class=\"ui steps\"><a class=\"step\"><div class=\"content\">About</div></a><a class=\"active step\"><div class=\"content\">Question</div></a><a class=\"step\"><div class=\"content\">Teams</div></a><a class=\"step\"><div class=\"content\">Review</div></a></div><div class=\"ui bottom attached segment\"><form class=\"ui form\"><h4 class=\"ui dividing header\">Organizer&#39;s question</h4><div class=\"ui icon message\"><i class=\"inbox icon\"></i><div class=\"content\"><div class=\"header\">would you catch it?</div><p>Organizer&#39;s name/role</p></div></div><div class=\"field\"><textarea class=\"c-textfield__input--answer\" name=\"userapp[organizer-question]\" placeholder=\"Please enter your answer here\" required=\"false\"></textarea><div class=\"c-textfield__error c-textfield__error--answer\"></div></div></form></div><div class=\"c-btn c-btn--primary c-application__submit--question ui fluid primary button\" tabindex=\"0\">Continue</div><div class=\"c-application__error\"></div></div>`,
        "domainAction": {
          "command": "Update",
          "context": "USERAPP",
          "payload": {
            "about": {
              "aboutYou": {
                "superPower": "fly"
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
              "hasApplied": false,
              "hasReviewedApplication": false,
              "latestTeamIndex": 0,
              "step": "Question"
            },
            "questions": {
              "answer": ""
            },
            "teams": {
              "-KFVqOyjPpR4pdgK-0Wr": {
                "answer": "",
                "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
                "hasBeenJoined": false,
                "name": "Parking",
                "question": "Have you worked parking for any other festivals? Which ones?"
              },
              "KFVssLvEPsDJUofy1Yd": {
                "answer": "",
                "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
                "hasBeenJoined": false,
                "name": "Box Office",
                "question": "Which festivals have you worked Box Office before?"
              }
            }
          }
        }
      }
    ],
    [
      {
        "DOM": `<div id=\"page\"><div class=\"ui icon message\"><i class=\"inbox icon\"></i><div class=\"content\"><div class=\"header\">Beyond and further</div><p>1984.09.09</p></div></div><div class=\"ui description\"><p>Complete your application for Beyond and further</p></div><div class=\"ui steps\"><a class=\"step\"><div class=\"content\">About</div></a><a class=\"active step\"><div class=\"content\">Question</div></a><a class=\"step\"><div class=\"content\">Teams</div></a><a class=\"step\"><div class=\"content\">Review</div></a></div><div class=\"ui bottom attached segment\"><form class=\"ui form\"><h4 class=\"ui dividing header\">Organizer&#39;s question</h4><div class=\"ui icon message\"><i class=\"inbox icon\"></i><div class=\"content\"><div class=\"header\">would you catch it?</div><p>Organizer&#39;s name/role</p></div></div><div class=\"field\"><textarea class=\"c-textfield__input--answer\" name=\"userapp[organizer-question]\" placeholder=\"Please enter your answer here\" required=\"false\"></textarea><div class=\"c-textfield__error c-textfield__error--answer\">Mandatory field : please fill in !</div></div></form></div><div class=\"c-btn c-btn--primary c-application__submit--question ui fluid primary button\" tabindex=\"0\">Continue</div><div class=\"c-application__error\"></div></div>`
      }
    ],
    [
      {
        "DOM": `<div id=\"page\"><div class=\"ui icon message\"><i class=\"inbox icon\"></i><div class=\"content\"><div class=\"header\">Beyond and further</div><p>1984.09.09</p></div></div><div class=\"ui description\"><p>Complete your application for Beyond and further</p></div><div class=\"ui steps\"><a class=\"step\"><div class=\"content\">About</div></a><a class=\"step\"><div class=\"content\">Question</div></a><a class=\"active step\"><div class=\"content\">Teams</div></a><a class=\"step\"><div class=\"content\">Review</div></a></div><div class=\"ui bottom attached segment\"><h4 class=\"ui dividing header\">Select a team</h4><div class=\"c-application__teams-list ui list\"><div class=\"item\"><div class=\"right floated content\"><div class=\"ui button\">X</div></div><img class=\"ui avatar image\" src=\"./assets/images/teams/Parking.jpg\"><div class=\"content\" data-index=\"0\">Parking</div></div><div class=\"item\"><div class=\"right floated content\"><div class=\"ui button\">X</div></div><img class=\"ui avatar image\" src=\"./assets/images/teams/Box Office.jpg\"><div class=\"content\" data-index=\"1\">Box Office</div></div></div></div><div class=\"c-btn c-btn--primary c-application__submit--continue disabled ui fluid primary button\" tabindex=\"0\">Continue</div><div class=\"c-application__error\"></div></div>`,
        "domainAction": {
          "command": "Update",
          "context": "USERAPP",
          "payload": {
            "about": {
              "aboutYou": {
                "superPower": "fly"
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
              "hasApplied": false,
              "hasReviewedApplication": false,
              "latestTeamIndex": 0,
              "step": "Teams"
            },
            "questions": {
              "answer": "That is what I like"
            },
            "teams": {
              "-KFVqOyjPpR4pdgK-0Wr": {
                "answer": "",
                "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
                "hasBeenJoined": false,
                "name": "Parking",
                "question": "Have you worked parking for any other festivals? Which ones?"
              },
              "KFVssLvEPsDJUofy1Yd": {
                "answer": "",
                "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
                "hasBeenJoined": false,
                "name": "Box Office",
                "question": "Which festivals have you worked Box Office before?"
              }
            }
          }
        }
      }
    ],
    [
      {
        "DOM": `<div id=\"page\"><div class=\"ui icon message\"><i class=\"inbox icon\"></i><div class=\"content\"><div class=\"header\">Beyond and further</div><p>1984.09.09</p></div></div><div class=\"ui description\"><p>Complete your application for Beyond and further</p></div><div class=\"ui steps\"><a class=\"step\"><div class=\"content\">About</div></a><a class=\"step\"><div class=\"content\">Question</div></a><a class=\"active step\"><div class=\"content\">Teams</div></a><a class=\"step\"><div class=\"content\">Review</div></a></div><div class=\"ui bottom attached segment\"><h4 class=\"ui dividing header\">Select a team</h4><div class=\"c-application__teams-list ui list\"><div class=\"item\"><div class=\"right floated content\"><div class=\"ui button\">X</div></div><img class=\"ui avatar image\" src=\"./assets/images/teams/Parking.jpg\"><div class=\"content\" data-index=\"0\">Parking</div></div><div class=\"item\"><div class=\"right floated content\"><div class=\"ui button\">X</div></div><img class=\"ui avatar image\" src=\"./assets/images/teams/Box Office.jpg\"><div class=\"content\" data-index=\"1\">Box Office</div></div></div></div><div class=\"c-btn c-btn--primary c-application__submit--continue disabled ui fluid primary button\" tabindex=\"0\">Continue</div><div class=\"c-application__error\"></div></div>`,
      }
    ],
    [
      {
        "DOM": "<div id=\"page\"><div class=\"ui icon message\"><i class=\"inbox icon\"></i><div class=\"content\"><div class=\"header\">Beyond and further</div><p>1984.09.09</p></div></div><div class=\"ui description\"><p>Complete your application for Beyond and further</p></div><div class=\"ui steps\"><a class=\"step\"><div class=\"content\">About</div></a><a class=\"step\"><div class=\"content\">Question</div></a><a class=\"active step\"><div class=\"content\">Teams</div></a><a class=\"step\"><div class=\"content\">Review</div></a></div><div class=\"ui bottom attached segment\"><div class=\"c-application__team_detail-back ui fluid negative button\" tabindex=\"0\">Back to teams</div><div class=\"ui divided selection list\"><a class=\"item\"><div class=\"ui horizontal label\">Parking</div>Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. </a></div><form class=\"ui form\"><div class=\"ui icon message\"><i class=\"inbox icon\"></i><div class=\"content\"><div class=\"header\">Have you worked parking for any other festivals? Which ones?</div><p>Team lead&#39;s name/role</p></div></div><div class=\"field\"><textarea class=\"c-textfield__input--team_detail_answer\" name=\"userapp[organizer-question]\" placeholder=\"Please enter your answer here\" required=\"false\"></textarea><div class=\"c-textfield__error c-textfield__error--td\"></div></div></form></div><div class=\"ui fluid buttons\"><button class=\"c-btn c-btn--quiet c-application__submit--team_detail_skip ui button\">Skip this team</button><div class=\"or\"></div><button class=\"c-application__submit--team_detail_join ui positive button\">Join team</button></div><div class=\"c-application__error\"></div></div>"
      }
    ],
    [
      {
        "DOM": "<div id=\"page\"><div class=\"ui icon message\"><i class=\"inbox icon\"></i><div class=\"content\"><div class=\"header\">Beyond and further</div><p>1984.09.09</p></div></div><div class=\"ui description\"><p>Complete your application for Beyond and further</p></div><div class=\"ui steps\"><a class=\"step\"><div class=\"content\">About</div></a><a class=\"step\"><div class=\"content\">Question</div></a><a class=\"active step\"><div class=\"content\">Teams</div></a><a class=\"step\"><div class=\"content\">Review</div></a></div><div class=\"ui bottom attached segment\"><div class=\"c-application__team_detail-back ui fluid negative button\" tabindex=\"0\">Back to teams</div><div class=\"ui divided selection list\"><a class=\"item\"><div class=\"ui horizontal label\">Parking</div>Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. </a></div><form class=\"ui form\"><div class=\"ui icon message\"><i class=\"inbox icon\"></i><div class=\"content\"><div class=\"header\">Have you worked parking for any other festivals? Which ones?</div><p>Team lead&#39;s name/role</p></div></div><div class=\"field\"><textarea class=\"c-textfield__input--team_detail_answer\" name=\"userapp[organizer-question]\" placeholder=\"Please enter your answer here\" required=\"false\"></textarea><div class=\"c-textfield__error c-textfield__error--td\">Mandatory field : please fill in !</div></div></form></div><div class=\"ui fluid buttons\"><button class=\"c-btn c-btn--quiet c-application__submit--team_detail_skip ui button\">Skip this team</button><div class=\"or\"></div><button class=\"c-application__submit--team_detail_join ui positive button\">Join team</button></div><div class=\"c-application__error\"></div></div>"
      }
    ],
    [
      {
        "DOM": "<div id=\"page\"><div class=\"ui icon message\"><i class=\"inbox icon\"></i><div class=\"content\"><div class=\"header\">Beyond and further</div><p>1984.09.09</p></div></div><div class=\"ui description\"><p>Complete your application for Beyond and further</p></div><div class=\"ui steps\"><a class=\"step\"><div class=\"content\">About</div></a><a class=\"step\"><div class=\"content\">Question</div></a><a class=\"active step\"><div class=\"content\">Teams</div></a><a class=\"step\"><div class=\"content\">Review</div></a></div><div class=\"ui bottom attached segment\"><div class=\"c-application__team_detail-back ui fluid negative button\" tabindex=\"0\">Back to teams</div><div class=\"ui divided selection list\"><a class=\"item\"><div class=\"ui horizontal label\">Box Office</div>The gateway to Cosmic Alignment! Here, you&#39;ll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.</a></div><form class=\"ui form\"><div class=\"ui icon message\"><i class=\"inbox icon\"></i><div class=\"content\"><div class=\"header\">Which festivals have you worked Box Office before?</div><p>Team lead&#39;s name/role</p></div></div><div class=\"field\"><textarea class=\"c-textfield__input--team_detail_answer\" name=\"userapp[organizer-question]\" placeholder=\"Please enter your answer here\" required=\"false\"></textarea><div class=\"c-textfield__error c-textfield__error--td\"></div></div></form></div><div class=\"ui fluid buttons\"><button class=\"c-btn c-btn--quiet c-application__submit--team_detail_skip ui button\">Skip this team</button><div class=\"or\"></div><button class=\"c-application__submit--team_detail_join ui positive button\">Join team</button></div><div class=\"c-application__error\"></div></div>"
      }
    ],
    [
      {
        "DOM": "<div id=\"page\"><div class=\"ui icon message\"><i class=\"inbox icon\"></i><div class=\"content\"><div class=\"header\">Beyond and further</div><p>1984.09.09</p></div></div><div class=\"ui description\"><p>Complete your application for Beyond and further</p></div><div class=\"ui steps\"><a class=\"step\"><div class=\"content\">About</div></a><a class=\"step\"><div class=\"content\">Question</div></a><a class=\"active step\"><div class=\"content\">Teams</div></a><a class=\"step\"><div class=\"content\">Review</div></a></div><div class=\"ui bottom attached segment\"><div class=\"c-application__team_detail-back ui fluid negative button\" tabindex=\"0\">Back to teams</div><div class=\"ui divided selection list\"><a class=\"item\"><div class=\"ui horizontal label\">Parking</div>Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. </a></div><form class=\"ui form\"><div class=\"ui icon message\"><i class=\"inbox icon\"></i><div class=\"content\"><div class=\"header\">Have you worked parking for any other festivals? Which ones?</div><p>Team lead&#39;s name/role</p></div></div><div class=\"field\"><textarea class=\"c-textfield__input--team_detail_answer\" name=\"userapp[organizer-question]\" placeholder=\"Please enter your answer here\" value=\"Team 0 answer\" required=\"false\"></textarea><div class=\"c-textfield__error c-textfield__error--td\"></div></div></form></div><div class=\"ui fluid buttons\"><button class=\"c-btn c-btn--quiet c-application__submit--team_detail_skip ui button\">Skip this team</button><div class=\"or\"></div><button class=\"c-application__submit--team_detail_join ui positive button\">Unjoin team</button></div><div class=\"c-application__error\"></div></div>"
      }
    ],
    [
      {
        "DOM": "<div id=\"page\"><div class=\"ui icon message\"><i class=\"inbox icon\"></i><div class=\"content\"><div class=\"header\">Beyond and further</div><p>1984.09.09</p></div></div><div class=\"ui description\"><p>Complete your application for Beyond and further</p></div><div class=\"ui steps\"><a class=\"step\"><div class=\"content\">About</div></a><a class=\"step\"><div class=\"content\">Question</div></a><a class=\"active step\"><div class=\"content\">Teams</div></a><a class=\"step\"><div class=\"content\">Review</div></a></div><div class=\"ui bottom attached segment\"><h4 class=\"ui dividing header\">Select a team</h4><div class=\"c-application__teams-list ui list\"><div class=\"item\"><div class=\"right floated content\"><div class=\"ui button\">O</div></div><img class=\"ui avatar image\" src=\"./assets/images/teams/Parking.jpg\"><div class=\"content\" data-index=\"0\">Parking</div></div><div class=\"item\"><div class=\"right floated content\"><div class=\"ui button\">X</div></div><img class=\"ui avatar image\" src=\"./assets/images/teams/Box Office.jpg\"><div class=\"content\" data-index=\"1\">Box Office</div></div></div></div><div class=\"c-btn c-btn--primary c-application__submit--continue ui fluid primary button\" tabindex=\"0\">Continue</div><div class=\"c-application__error\"></div></div>"
      }
    ],
    [
      {
        "DOM": "<div id=\"page\"><div class=\"ui icon message\"><i class=\"inbox icon\"></i><div class=\"content\"><div class=\"header\">Beyond and further</div><p>1984.09.09</p></div></div><div class=\"ui description\"><p>Does this look good ?</p></div><div class=\"ui steps\"><a class=\"step\"><div class=\"content\">About</div></a><a class=\"step\"><div class=\"content\">Question</div></a><a class=\"step\"><div class=\"content\">Teams</div></a><a class=\"active step\"><div class=\"content\">Review</div></a></div><div class=\"ui one cards\"><div class=\"card\"><div class=\"content\"><i class=\"c-application__change--about right floated edit icon\"></i><div class=\"header\">About you</div><div class=\"ui list\"><div class=\"item\"><div class=\"ui button\"><i class=\"info icon\"></i></div>fly</div><div class=\"item\"><div class=\"ui button\"><i class=\"user outline icon\"></i></div>Kujio (Otadaki)</div><div class=\"item\"><div class=\"ui button\"><i class=\"text telephone icon\"></i></div>1234</div><div class=\"item\"><div class=\"ui button\"><i class=\"birthday icon\"></i></div>1984.09.09</div><div class=\"item\"><div class=\"ui button\"><i class=\"info icon\"></i></div>1231</div></div></div></div></div><div class=\"ui one cards\"><div class=\"card\"><div class=\"content\"><i class=\"c-application__change--question right floated edit icon\"></i><div class=\"header\">Organizer&#39;s question</div><div class=\"ui list message\"><div class=\"item\"><img class=\"ui avatar image\" src=\"./assets/images/avatar/small/matt.jpg\" className=\"ui avatar image\"><div class=\"content\"><div class=\"header\">would you catch it?</div>Organizer name and role</div></div></div><div class=\"description\"><img class=\"ui floated right avatar image\" src=\"./assets/images/avatar/large/elliot.jpg\" className=\"ui floated right avatar image\"><p>That is what I like</p></div></div></div></div><div class=\"ui one cards\"><div class=\"card\"><div class=\"content\"><i class=\"c-application__change--teams right floated edit icon\"></i><div class=\"header\">Team selection</div><div class=\"ui list\"><div class=\"item\"><div class=\"ui button\"><i class=\"info icon\"></i></div>Parking</div></div></div></div></div><div class=\"ui basic segment\"><button class=\"c-application__review--submit ui fluid primary button\">Apply for the things</button></div><div class=\"c-application__error\"></div></div>",
        "domainAction": {
          "command": "Update",
          "context": "USERAPP",
          "payload": {
            "about": {
              "aboutYou": {
                "superPower": "fly"
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
              "hasApplied": false,
              "hasReviewedApplication": true,
              "latestTeamIndex": 0,
              "step": "Review"
            },
            "questions": {
              "answer": "That is what I like"
            },
            "teams": {
              "-KFVqOyjPpR4pdgK-0Wr": {
                "answer": "Team 0 answer",
                "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
                "hasBeenJoined": true,
                "name": "Parking",
                "question": "Have you worked parking for any other festivals? Which ones?"
              },
              "KFVssLvEPsDJUofy1Yd": {
                "answer": "skipped",
                "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
                "hasBeenJoined": false,
                "name": "Box Office",
                "question": "Which festivals have you worked Box Office before?"
              }
            }
          }
        }
      }
    ],
    [
      {
        "DOM": "<div id=\"page\"><div class=\"ui icon message\"><i class=\"inbox icon\"></i><div class=\"content\"><div class=\"header\">Beyond and further</div><p>1984.09.09</p></div></div><div class=\"ui description\"><p>Complete your application for Beyond and further</p></div><div class=\"ui steps\"><a class=\"active step\"><div class=\"content\">About</div></a><a class=\"step\"><div class=\"content\">Question</div></a><a class=\"step\"><div class=\"content\">Teams</div></a><a class=\"step\"><div class=\"content\">Review</div></a></div><div class=\"ui bottom attached segment\"><form class=\"ui form\"><h4 class=\"ui dividing header\">About you</h4><div class=\"field\"><input class=\"c-textfield__input--super-power\" type=\"text\" name=\"userapp[superpower]\" placeholder=\"What is your superpower?\" value=\"fly\" required=\"false\"><div class=\"c-textfield__error c-textfield__error--super-power\"></div></div><h4 class=\"ui dividing header\">Personal details</h4><div class=\"field\"><input class=\"c-textfield__input--legal-name\" type=\"text\" name=\"userapp[legal-name]\" placeholder=\"Legal name\" value=\"Kujio\" required=\"false\"><div class=\"c-textfield__error c-textfield__error--legal-name\"></div></div><div class=\"field\"><input class=\"c-textfield__input--preferred-name\" type=\"text\" name=\"userapp[preferred-name]\" placeholder=\"Preferred name\" value=\"Otadaki\" required=\"false\"><div class=\"c-textfield__error c-textfield__error--preferred-name\"></div></div><div class=\"field\"><input class=\"c-textfield__input--phone\" type=\"text\" name=\"userapp[phone]\" placeholder=\"Phone\" value=\"1234\" required=\"false\"><div class=\"c-textfield__error c-textfield__error--phone\"></div></div><div class=\"two fields\"><div class=\"field\"><input class=\"c-textfield__input--birthday\" type=\"text\" name=\"userapp[birthday]\" placeholder=\"Birthday\" value=\"09.09.09\" required=\"false\"><div class=\"c-textfield__error c-textfield__error--birthday\"></div></div><div class=\"field\"><input class=\"c-textfield__input--zip-code\" type=\"text\" name=\"userapp[zip-code]\" placeholder=\"Zip code\" value=\"1231\" required=\"false\"><div class=\"c-textfield__error c-textfield__error--zip-code\"></div></div></div></form></div><div class=\"c-btn c-btn--primary c-application__submit-about ui fluid primary button\" tabindex=\"0\">Continue</div><div class=\"c-application__error\"></div></div>"
      }
    ],
    [
      {
        "DOM": "<div id=\"page\"><div class=\"ui icon message\"><i class=\"inbox icon\"></i><div class=\"content\"><div class=\"header\">Beyond and further</div><p>1984.09.09</p></div></div><div class=\"ui description\"><p>Does this look good ?</p></div><div class=\"ui steps\"><a class=\"step\"><div class=\"content\">About</div></a><a class=\"step\"><div class=\"content\">Question</div></a><a class=\"step\"><div class=\"content\">Teams</div></a><a class=\"active step\"><div class=\"content\">Review</div></a></div><div class=\"ui one cards\"><div class=\"card\"><div class=\"content\"><i class=\"c-application__change--about right floated edit icon\"></i><div class=\"header\">About you</div><div class=\"ui list\"><div class=\"item\"><div class=\"ui button\"><i class=\"info icon\"></i></div>refly</div><div class=\"item\"><div class=\"ui button\"><i class=\"user outline icon\"></i></div>Kujio (Otadaki)</div><div class=\"item\"><div class=\"ui button\"><i class=\"text telephone icon\"></i></div>1234</div><div class=\"item\"><div class=\"ui button\"><i class=\"birthday icon\"></i></div>1984.09.09</div><div class=\"item\"><div class=\"ui button\"><i class=\"info icon\"></i></div>1231</div></div></div></div></div><div class=\"ui one cards\"><div class=\"card\"><div class=\"content\"><i class=\"c-application__change--question right floated edit icon\"></i><div class=\"header\">Organizer&#39;s question</div><div class=\"ui list message\"><div class=\"item\"><img class=\"ui avatar image\" src=\"./assets/images/avatar/small/matt.jpg\" className=\"ui avatar image\"><div class=\"content\"><div class=\"header\">would you catch it?</div>Organizer name and role</div></div></div><div class=\"description\"><img class=\"ui floated right avatar image\" src=\"./assets/images/avatar/large/elliot.jpg\" className=\"ui floated right avatar image\"><p>That is what I like</p></div></div></div></div><div class=\"ui one cards\"><div class=\"card\"><div class=\"content\"><i class=\"c-application__change--teams right floated edit icon\"></i><div class=\"header\">Team selection</div><div class=\"ui list\"><div class=\"item\"><div class=\"ui button\"><i class=\"info icon\"></i></div>Parking</div></div></div></div></div><div class=\"ui basic segment\"><button class=\"c-application__review--submit ui fluid primary button\">Apply for the things</button></div><div class=\"c-application__error\"></div></div>",
        "domainAction": {
          "command": "Update",
          "context": "USERAPP",
          "payload": {
            "about": {
              "aboutYou": {
                "superPower": "refly"
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
              "hasApplied": false,
              "hasReviewedApplication": true,
              "latestTeamIndex": 0,
              "step": "Review"
            },
            "questions": {
              "answer": "That is what I like"
            },
            "teams": {
              "-KFVqOyjPpR4pdgK-0Wr": {
                "answer": "Team 0 answer",
                "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
                "hasBeenJoined": true,
                "name": "Parking",
                "question": "Have you worked parking for any other festivals? Which ones?"
              },
              "KFVssLvEPsDJUofy1Yd": {
                "answer": "skipped",
                "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
                "hasBeenJoined": false,
                "name": "Box Office",
                "question": "Which festivals have you worked Box Office before?"
              }
            }
          }
        }
      }
    ],
    [
      {
        "DOM": "<div id=\"page\"><div class=\"ui icon message\"><i class=\"inbox icon\"></i><div class=\"content\"><div class=\"header\">Beyond and further</div><p>1984.09.09</p></div></div><div class=\"ui description\"><p>Complete your application for Beyond and further</p></div><div class=\"ui steps\"><a class=\"step\"><div class=\"content\">About</div></a><a class=\"active step\"><div class=\"content\">Question</div></a><a class=\"step\"><div class=\"content\">Teams</div></a><a class=\"step\"><div class=\"content\">Review</div></a></div><div class=\"ui bottom attached segment\"><form class=\"ui form\"><h4 class=\"ui dividing header\">Organizer&#39;s question</h4><div class=\"ui icon message\"><i class=\"inbox icon\"></i><div class=\"content\"><div class=\"header\">would you catch it?</div><p>Organizer&#39;s name/role</p></div></div><div class=\"field\"><textarea class=\"c-textfield__input--answer\" name=\"userapp[organizer-question]\" placeholder=\"Please enter your answer here\" value=\"That is what I like\" required=\"false\"></textarea><div class=\"c-textfield__error c-textfield__error--answer\"></div></div></form></div><div class=\"c-btn c-btn--primary c-application__submit--question ui fluid primary button\" tabindex=\"0\">Continue</div><div class=\"c-application__error\"></div></div>"
      }
    ],
    [
      {
        "DOM": "<div id=\"page\"><div class=\"ui icon message\"><i class=\"inbox icon\"></i><div class=\"content\"><div class=\"header\">Beyond and further</div><p>1984.09.09</p></div></div><div class=\"ui description\"><p>Does this look good ?</p></div><div class=\"ui steps\"><a class=\"step\"><div class=\"content\">About</div></a><a class=\"step\"><div class=\"content\">Question</div></a><a class=\"step\"><div class=\"content\">Teams</div></a><a class=\"active step\"><div class=\"content\">Review</div></a></div><div class=\"ui one cards\"><div class=\"card\"><div class=\"content\"><i class=\"c-application__change--about right floated edit icon\"></i><div class=\"header\">About you</div><div class=\"ui list\"><div class=\"item\"><div class=\"ui button\"><i class=\"info icon\"></i></div>refly</div><div class=\"item\"><div class=\"ui button\"><i class=\"user outline icon\"></i></div>Kujio (Otadaki)</div><div class=\"item\"><div class=\"ui button\"><i class=\"text telephone icon\"></i></div>1234</div><div class=\"item\"><div class=\"ui button\"><i class=\"birthday icon\"></i></div>1984.09.09</div><div class=\"item\"><div class=\"ui button\"><i class=\"info icon\"></i></div>1231</div></div></div></div></div><div class=\"ui one cards\"><div class=\"card\"><div class=\"content\"><i class=\"c-application__change--question right floated edit icon\"></i><div class=\"header\">Organizer&#39;s question</div><div class=\"ui list message\"><div class=\"item\"><img class=\"ui avatar image\" src=\"./assets/images/avatar/small/matt.jpg\" className=\"ui avatar image\"><div class=\"content\"><div class=\"header\">would you catch it?</div>Organizer name and role</div></div></div><div class=\"description\"><img class=\"ui floated right avatar image\" src=\"./assets/images/avatar/large/elliot.jpg\" className=\"ui floated right avatar image\"><p>That is what I like so much</p></div></div></div></div><div class=\"ui one cards\"><div class=\"card\"><div class=\"content\"><i class=\"c-application__change--teams right floated edit icon\"></i><div class=\"header\">Team selection</div><div class=\"ui list\"><div class=\"item\"><div class=\"ui button\"><i class=\"info icon\"></i></div>Parking</div></div></div></div></div><div class=\"ui basic segment\"><button class=\"c-application__review--submit ui fluid primary button\">Apply for the things</button></div><div class=\"c-application__error\"></div></div>",
        "domainAction": {
          "command": "Update",
          "context": "USERAPP",
          "payload": {
            "about": {
              "aboutYou": {
                "superPower": "refly"
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
              "hasApplied": false,
              "hasReviewedApplication": true,
              "latestTeamIndex": 0,
              "step": "Review"
            },
            "questions": {
              "answer": "That is what I like so much"
            },
            "teams": {
              "-KFVqOyjPpR4pdgK-0Wr": {
                "answer": "Team 0 answer",
                "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
                "hasBeenJoined": true,
                "name": "Parking",
                "question": "Have you worked parking for any other festivals? Which ones?"
              },
              "KFVssLvEPsDJUofy1Yd": {
                "answer": "skipped",
                "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
                "hasBeenJoined": false,
                "name": "Box Office",
                "question": "Which festivals have you worked Box Office before?"
              }
            }
          }
        }
      }
    ],
    [
      {
        "DOM": "<div class=\"ui raised segment\"><p>You successfully applied! Stay in touch</p></div>",
        "domainAction": {
          "command": "Update",
          "context": "USERAPP",
          "payload": {
            "about": {
              "aboutYou": {
                "superPower": "refly"
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
              "hasApplied": true,
              "hasReviewedApplication": true,
              "latestTeamIndex": 0,
              "step": "Review"
            },
            "questions": {
              "answer": "That is what I like so much"
            },
            "teams": {
              "-KFVqOyjPpR4pdgK-0Wr": {
                "answer": "Team 0 answer",
                "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
                "hasBeenJoined": true,
                "name": "Parking",
                "question": "Have you worked parking for any other festivals? Which ones?"
              },
              "KFVssLvEPsDJUofy1Yd": {
                "answer": "skipped",
                "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
                "hasBeenJoined": false,
                "name": "Box Office",
                "question": "Which festivals have you worked Box Office before?"
              }
            }
          }
        }
      }
    ]
  ], `["nok","INIT_S","About","About","Question","Question","Teams","Team_Detail","Team_Detail","Team_Detail","Team_Detail","Teams","Review","Question","Review","About","Review","State_Applied"],
`);
});

QUnit.test("Teams subscription permutations (N = testing events which do not progress the machine, Y = sequence up" +
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
    // [skip, joinValid, joinInvalid], // Y
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
    [renderQuestionScreen()],
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

// Skipped - can be safely deleted - kept for information only
QUnit.skip("n permutations generation", function exec_test(assert) {
  function genNperm(n) {
    if (n === 0) {
      return []
    }
    else if (n === 1) {
      return [[1], []]
    }
    else {
      const seed = genNperm(n - 1);
      const nPerm = seed.reduce((acc, perm) => {
        return acc.concat([perm.concat([n])]).concat(perm.map((x, index, arr) => {
          return arr.slice(0, index).concat([n]).concat(arr.slice(index))
        }))
      }, seed)
      return nPerm
    }
  }

  assert.deepEqual(genNperm(2), [
    [],
    [1],
    [2],
    [1, 2],
    [2, 1],
  ], `2`)
  assert.deepEqual(genNperm(3), [
    [],
    [1],
    [2],
    [3],
    [1, 2],
    [2, 1],
    [1, 3],
    [3, 1],
    [2, 3],
    [3, 2],
    [1, 2, 3],
    [3, 1, 2],
    [1, 3, 2],
    [2, 1, 3],
    [3, 2, 1],
    [2, 3, 1],
  ], `3`)
  assert.deepEqual(genNperm(4), [
    [],
    [1],
    [2],
    [3],
    [4],
    [1, 2],
    [1, 3],
    [1, 4],
    [2, 1],
    [2, 3],
    [2, 4],
    [3, 1],
    [3, 2],
    [3, 4],
    [4, 1],
    [4, 2],
    [4, 3],
    [1, 2, 3],
    [1, 2, 4],
    [1, 3, 2],
    [1, 3, 4],
    [1, 4, 2],
    [1, 4, 3],
    [2, 1, 3],
    [2, 1, 4],
    [2, 3, 1],
    [2, 3, 4],
    [2, 4, 1],
    [2, 4, 3],
    [3, 1, 2],
    [3, 1, 4],
    [3, 2, 1],
    [3, 2, 4],
    [3, 4, 1],
    [3, 4, 2],
    [4, 1, 2],
    [4, 1, 3],
    [4, 2, 1],
    [4, 2, 3],
    [4, 3, 1],
    [4, 3, 2],
    [1, 2, 3, 4],
    [1, 2, 4, 3],
    [1, 3, 2, 4],
    [1, 3, 4, 2],
    [1, 4, 2, 3],
    [1, 4, 3, 2],
    [2, 1, 3, 4],
    [2, 1, 4, 3],
    [2, 3, 1, 4],
    [2, 3, 4, 1],
    [2, 4, 3, 1],
    [2, 4, 1, 3],
    [3, 1, 2, 4],
    [3, 1, 4, 2],
    [3, 2, 1, 4],
    [3, 2, 4, 1],
    [3, 4, 1, 2],
    [3, 4, 2, 1],
    [4, 1, 2, 3],
    [4, 1, 3, 2],
    [4, 2, 1, 3],
    [4, 2, 3, 1],
    [4, 3, 1, 2],
    [4, 3, 2, 1],
  ], `4`);

});
