import * as QUnit from "qunitjs"
import * as Rx from "rx"
import {
  assertContract, convertVNodesToHTML, isArrayUpdateOperations, multiConcatLeft, multiConcatRight
} from "./helpers"
import { fsm } from "../src/processApplication/fsmSpecs"
import {
  ABOUT_CONTINUE, APPLICATION_COMPLETED, BACK_TEAM_CLICKED, CHANGE_ABOUT, CHANGE_QUESTION,
  CONTRACT_MODEL_UPDATE_FN_RETURN_VALUE, FETCH_EV, JOIN_OR_UNJOIN_TEAM_CLICKED, QUESTION_CONTINUE, SKIP_TEAM_CLICKED,
  STATE_REVIEW, STATE_TEAM_DETAIL, STATE_TEAMS, STEP_REVIEW, TEAM_CLICKED, TEAM_CONTINUE
} from "../src/processApplication/properties"
import {
  ACTION_IDENTITY, computeTimesCircledOn, create_state_machine, decorateWithEntryActions, generateTestsFromFSM,
  identity, INIT_EVENT, INIT_STATE, makeHistoryStates, NO_OUTPUT
} from "state-transducer"
import { complement, mapObjIndexed, merge } from "ramda"
import { applyPatch } from "json-patch-es6/lib/duplex"
import {
  renderAboutErrorScreen, renderAboutInitScreen, renderAboutScreen, renderAppliedScreen, renderINITscreen,
  renderInvalidTeamDetailJoinScreen, renderInvalidTeamDetailUnjoinScreen, renderQuestionErrorScreen,
  renderQuestionScreen, renderReviewScreen, renderTeamDetailBackToUnjoinScreen, renderTeamDetailJoinScreen,
  renderTeamScreen
} from "./snapshots"
import {
  hasJoinedAtLeastOneTeam, isTeamJoined, isTeamJoinedAndFormInvalid, isTeamNotJoinedAndFormInvalid,
  isTeamNotJoinedAndFormValid
} from "../src/processApplication/fsmEvents"
import { initializeModel } from "../src/processApplication/modelUpdates"
import { fakeOpportunityKey, fakeProjectKey, fakeUserKey } from "../fixtures"
import { ALL_PATHS_LIMITED_TO_N_LOOPS } from "graph-adt"
import {
  appInABOUTandInvalidForm, appInABOUTandValidFormAndNotReviewed, appInABOUTandValidFormAndReviewed,
  appInQUESTIONandInvalidForm, appInQUESTIONandValidFormAndNotReviewed, appInQUESTIONandValidFormAndReviewed,
  appInTeamDetailInvalidForm, appInTeamDetailValidForm, appSavedInQuestionState, appSavedInReviewState,
  appSavedInTeamsStateWithTeam1Joined, appUnsavedWithNoData, clickedOnBackInvalid, clickedOnSkipTeamInvalid,
  clickedOnSkipTeamValid, clickedOnTeam, inputSequencesFixture, OP_KEY, USER_KEY
} from './fixtures'

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

const default_settings = {
  updateState: applyJSONpatch,
};

const updateAction = ({ step, superPower, hasApplied, hasReviewedApplication, hasBeenJoined, answers, question, latestTeamIndex }) => ({
  "domainAction": {
    "command": "Update",
    "context": "USERAPP",
    "payload": {
      userKey: USER_KEY,
      opportunityKey: OP_KEY,
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

function getTeamIndex(extS) {
  const { userApplication: { progress: { latestTeamIndex } } } = extS;
  return latestTeamIndex
}

const INIT_I = { [INIT_EVENT]: {} };

QUnit.module("Testing demo app", {});

QUnit.skip(`INIT -> About -invalid-> About -> Question -invalid-> Question -> Teams -click-0-> Team_Detail -> Team_Detail -> Team_Detail -> Team_Detail -> Team_Detail -> Team_Detail -> Team_Detail -back-> Teams -> Review -> Question -> Review -> About -> Review -> State_Applied`, function exec_test(assert) {
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
        "DOM": renderReviewScreen({ hasBeenJoined: [false, true], superPower: 'refly' }).DOM,
        "domainAction": updateAction({
          superPower: 'refly',
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
        "DOM": renderReviewScreen({
          hasBeenJoined: [false, true],
          superPower: 'refly',
          question: "That is what I like so much"
        }).DOM,
        "domainAction": updateAction({
          "step": "Review",
          superPower: 'refly',
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
          superPower: 'refly',
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

QUnit.skip("Reviewed application saved in `Question` state : INIT -> Question -> Review -> Applied", function exec_test(assert) {
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
    [renderQuestionScreen({ answer: `That is what I like` })],
    [{
      DOM: renderReviewScreen({ hasBeenJoined: [true, false] }).DOM, "domainAction":
      updateAction({
        hasApplied: false,
        hasReviewedApplication: true,
        hasBeenJoined: [true, false],
        question: `That is what I like`,
        answers: [appSavedInQuestionState.userApplication.teams["-KFVqOyjPpR4pdgK-0Wr"].answer, ``]
      }).domainAction
    }],
    [{
      DOM: renderAppliedScreen.DOM,
      "domainAction": updateAction({
        hasApplied: true,
        question: `That is what I like`,
        hasReviewedApplication: true,
        hasBeenJoined: [true, false],
        answers: [appSavedInQuestionState.userApplication.teams["-KFVqOyjPpR4pdgK-0Wr"].answer, ``]
      }).domainAction
    }]], `["nok","INIT_S","Question","Review","State_Applied"]`)
});

QUnit.skip("Reviewed application saved in `Teams` state : INIT -> Teams -> Review -> Applied", function exec_test(assert) {
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
        question: `That is what I like`,
        hasReviewedApplication: true,
        hasBeenJoined: [true, false],
        answers: [appSavedInTeamsStateWithTeam1Joined.userApplication.teams["-KFVqOyjPpR4pdgK-0Wr"].answer, ``]
      }).domainAction
    }],
    [{
      DOM: renderAppliedScreen.DOM,
      "domainAction": updateAction({
        hasApplied: true,
        question: `That is what I like`,
        hasReviewedApplication: true,
        hasBeenJoined: [true, false],
        answers: [appSavedInTeamsStateWithTeam1Joined.userApplication.teams["-KFVqOyjPpR4pdgK-0Wr"].answer, ``]
      }).domainAction
    }]], `["nok","INIT_S","Teams","State_Applied"]`)
});

QUnit.skip("Reviewed application saved in `Review` state : INIT -> Review -> Applied", function exec_test(assert) {
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
        question: `That is what I like`,
        hasReviewedApplication: true,
        hasBeenJoined: [true, false],
        answers: [appSavedInReviewState.userApplication.teams["-KFVqOyjPpR4pdgK-0Wr"].answer, ``]
      }).domainAction
    }]], `["nok","INIT_S","Review","Teams","State_Applied"]`)
});

QUnit.test("Teams subscription permutations", function exec_test(assert) {
  // NOTE : We are testing here input sequences which are allowed. A more exhaustive testing would also test input
  // sequences which are not allowed result in a NO_OUTPUT of the state machine
  // A. Generate permutations for teams by creating a section of the original state machine
  const partialFsmDef = {
    initialExtendedState: appSavedInTeamsStateWithTeam1Joined,
    states: fsm.states,
    events: fsm.events,
    transitions: [{ from: INIT_STATE, event: INIT_EVENT, to: STATE_TEAMS, action: initializeModel }]
      .concat(fsm.transitions.slice(1)),
  };
  const genPartialFsmDef = {
    transitions: [
      {
        from: INIT_STATE,
        event: INIT_EVENT,
        to: STATE_TEAMS,
        gen: extS => ({ input: appSavedInTeamsStateWithTeam1Joined, hasGeneratedInput: true })
      },
      {
        from: STATE_TEAMS, event: TEAM_CLICKED, to: STATE_TEAM_DETAIL, gen: function genTEAMStoTEAMDETAIL(extS) {
          return { input: clickedOnTeam, hasGeneratedInput: true }
        }
      },
      {
        from: STATE_TEAM_DETAIL, event: SKIP_TEAM_CLICKED, guards: [
          {
            predicate: complement(isTeamJoinedAndFormInvalid),
            to: STATE_TEAM_DETAIL,
            gen: function genTEAMStoTEAMDETAILSKIPvalid(extS) {
              return {
                input: isTeamJoined(extS, null) ? clickedOnSkipTeamValid : clickedOnSkipTeamInvalid,
                hasGeneratedInput: true
              }
            }
          },
          {
            predicate: isTeamJoinedAndFormInvalid,
            to: STATE_TEAM_DETAIL,
            gen: function genTEAMStoTEAMDETAILSKIPinvalid(extS) {
              return { input: clickedOnSkipTeamInvalid, hasGeneratedInput: isTeamJoined(extS, null) }
            }
          },
        ]
      },
      {
        from: STATE_TEAM_DETAIL,
        event: JOIN_OR_UNJOIN_TEAM_CLICKED,
        guards: [
          {
            predicate: isTeamJoined, to: STATE_TEAM_DETAIL, gen: function genTEAMStoTEAMDETAILunjoin(extS) {
              return { input: appInTeamDetailInvalidForm, hasGeneratedInput: isTeamJoined(extS, null) }
            }
          },
          {
            predicate: isTeamNotJoinedAndFormValid,
            to: STATE_TEAM_DETAIL,
            gen: function genTEAMStoTEAMDETAILjoin(extS) {
              return {
                input: appInTeamDetailValidForm[getTeamIndex(extS)],
                hasGeneratedInput: !isTeamJoined(extS, null)
              }
            }
          },
          {
            predicate: isTeamNotJoinedAndFormInvalid,
            to: STATE_TEAM_DETAIL,
            gen: function genTEAMStoTEAMDETAILjoinInvalid(extS) {
              return { input: appInTeamDetailInvalidForm, hasGeneratedInput: !isTeamJoined(extS, null) }
            }
          }
        ]
      },
      {
        from: STATE_TEAM_DETAIL,
        event: BACK_TEAM_CLICKED,
        guards: [
          {
            predicate: isTeamJoinedAndFormInvalid,
            to: STATE_TEAM_DETAIL,
            gen: function genTEAMStoTEAMDETAILbackInvalid(extS) {
              return { input: appInTeamDetailInvalidForm, hasGeneratedInput: isTeamJoined(extS, null) }
            }
          },
          {
            predicate: complement(isTeamJoinedAndFormInvalid),
            to: STATE_TEAMS,
            gen: function genTEAMStoTEAMDETAILbackValid(extS) {
              return {
                input: isTeamJoined(extS, null) ? clickedOnSkipTeamValid : clickedOnSkipTeamInvalid,
                hasGeneratedInput: true
              }
            }
          },
        ],
      },
      {
        from: STATE_TEAMS,
        event: TEAM_CONTINUE,
        guards: [
          {
            predicate: hasJoinedAtLeastOneTeam,
            to: STATE_REVIEW,
            gen: extS => ({ input: {}, hasGeneratedInput: hasJoinedAtLeastOneTeam(extS) })
          },
          {
            predicate: complement(hasJoinedAtLeastOneTeam),
            to: STATE_TEAMS,
            gen: extS => ({ input: {}, hasGeneratedInput: !hasJoinedAtLeastOneTeam(extS) })
          }
        ]
      },
    ]
  };
  const generators = genPartialFsmDef.transitions;
  const strategy = ALL_PATHS_LIMITED_TO_N_LOOPS({ maxNumberOfTraversals: 1, targetVertex: STATE_REVIEW });
  let counter = 0;
  const settings = merge(default_settings, {
    strategy,
    onResult: result => {
      counter++;
      console.info('result', result)
    },
    userKey: fakeUserKey,
    opportunityKey: fakeOpportunityKey,
    projectKey: fakeProjectKey,
  });
  // const teamsInputSequence = generateTestsFromFSM(partialFsmDef, generators, settings)
  //   .map(({ inputSequence }) => inputSequence.slice(1))

  // B. Create test input sequences
  const apply = { [APPLICATION_COMPLETED]: {} };
  const inputSequencePrefix = [
    INIT_I,
    { [FETCH_EV]: appSavedInTeamsStateWithTeam1Joined },
  ];
  const inputSequenceSuffix = [apply];
  const inputSequences = inputSequencesFixture;
  // const inputSequences = multiConcatRight(multiConcatLeft(inputSequencePrefix, teamsInputSequence), inputSequenceSuffix);

  // C. Compute expected test output sequences (compute only last output)
  const team0 = appSavedInTeamsStateWithTeam1Joined.userApplication.teams["-KFVqOyjPpR4pdgK-0Wr"];
  const team1 = appSavedInTeamsStateWithTeam1Joined.userApplication.teams["KFVssLvEPsDJUofy1Yd"];
  // NOTE : we use a closure here as we update initOutput in place in the reducer!! So we generate fresh object each
  // time
  const initOutput = () => ({
    // all the information relevant to the user application
    superPower: appSavedInTeamsStateWithTeam1Joined.userApplication.about.aboutYou.superPower,
    phone: appSavedInTeamsStateWithTeam1Joined.userApplication.about.personal.phone,
    preferredName: appSavedInTeamsStateWithTeam1Joined.userApplication.about.personal.preferredName,
    zipCode: appSavedInTeamsStateWithTeam1Joined.userApplication.about.personal.zipCode,
    legalName: appSavedInTeamsStateWithTeam1Joined.userApplication.about.personal.legalName,
    birthday: appSavedInTeamsStateWithTeam1Joined.userApplication.about.personal.birthday,
    answer: appSavedInTeamsStateWithTeam1Joined.userApplication.questions.answer,
    teamsRequestStatus: [
      { hasBeenJoined: team0.hasBeenJoined, answer: team0.answer },
      { hasBeenJoined: team1.hasBeenJoined, answer: team1.answer }
    ],
    step: appSavedInTeamsStateWithTeam1Joined.userApplication.progress.step,
    hasApplied: appSavedInTeamsStateWithTeam1Joined.userApplication.progress.hasApplied,
    hasReviewedApplication: appSavedInTeamsStateWithTeam1Joined.userApplication.progress.hasReviewedApplication,
    latestTeamIndex: appSavedInTeamsStateWithTeam1Joined.userApplication.progress.latestTeamIndex,
  });
  const generateOutputSequence = (acc, input) => {
    let {
      superPower, phone, preferredName, zipCode, legalName, birthday, answer, teamsRequestStatus, step, hasApplied,
      hasReviewedApplication, latestTeamIndex
    } = acc;
    const eventName = Object.keys(input)[0];
    const eventData = input[eventName];

    if (eventName === INIT_EVENT) {
    }
    else if (eventName === FETCH_EV) {
    }
    else if (eventName === TEAM_CLICKED) {
    }
    else if (eventName === TEAM_CONTINUE) {
    }
    else if (eventName === APPLICATION_COMPLETED) {
    }
    else if (eventName === JOIN_OR_UNJOIN_TEAM_CLICKED) {
      // 3 possibilities : have to update hasBeenJoined and answer and latestTeamIndex
      const hasBeenJoined = teamsRequestStatus[latestTeamIndex].hasBeenJoined;
      const { formData: { answer }, validationData: { answer: isValid } } = eventData;

      if (hasBeenJoined) {
        // unjoin that team
        teamsRequestStatus[latestTeamIndex].hasBeenJoined = false;
        teamsRequestStatus[latestTeamIndex].answer = answer;
        latestTeamIndex = (latestTeamIndex + 1) % 2;
      }
      else {
        // Join that team if answer is valid
        if (isValid === true) {
          teamsRequestStatus[latestTeamIndex].hasBeenJoined = true;
          teamsRequestStatus[latestTeamIndex].answer = answer;
          latestTeamIndex = (latestTeamIndex + 1) % 2;
        }
        else {
          // Don't change anything
        }
      }
    }
    else if (eventName === SKIP_TEAM_CLICKED) {
      // 2 possibilities : team joined && invalid answer, or not
      const hasBeenJoined = teamsRequestStatus[latestTeamIndex].hasBeenJoined;
      const { formData: { answer }, validationData: { answer: isValid } } = eventData;

      // NOTE : beware that isValid is true or a string...
      if (hasBeenJoined && isValid !== true) {
        // Don't do anything
      }
      else {
        teamsRequestStatus[latestTeamIndex].answer = answer;
        latestTeamIndex = (latestTeamIndex + 1) % 2;
      }
    }
    else if (eventName === BACK_TEAM_CLICKED) {
      // 2 possibilities : team joined && invalid answer, or not
      const hasBeenJoined = teamsRequestStatus[latestTeamIndex].hasBeenJoined;
      const { formData: { answer }, validationData: { answer: isValid } } = eventData;

      if (hasBeenJoined && isValid !== true) {
        // Don't do anything
      }
      else {
        teamsRequestStatus[latestTeamIndex].answer = answer;
      }
    }
    else {
      throw `unknown input!`
    }

    return {
      superPower, phone, preferredName, zipCode, legalName, birthday, answer, teamsRequestStatus, step, hasApplied,
      hasReviewedApplication, latestTeamIndex
    };
  };
  const outputSequenceStructs = inputSequences.map(inputSequence => {
    const outputSequenceStruct = inputSequence.reduce(generateOutputSequence, initOutput());
    return  outputSequenceStruct
  });
  const expectedFinalOutputs = outputSequenceStructs
    .map(outputSequenceStruct => {
      const { latestTeamIndex, teamsRequestStatus, answer, superPower } = outputSequenceStruct;

      return {
        DOM: renderAppliedScreen.DOM,
        domainAction: updateAction({
          superPower,
          question: answer,
          latestTeamIndex,
          hasReviewedApplication: true,
          hasApplied: true,
          step: STEP_REVIEW,
          hasBeenJoined: teamsRequestStatus.map(team => team.hasBeenJoined),
          answers: teamsRequestStatus.map(team => team.answer),
        }).domainAction
      }
    });

  // D. Generate actual results
  const actualFinalOutputs = inputSequences
    .map(inputSequence => {
      const machine = create_state_machine(fsm, default_settings);
      const outputSequence = inputSequence.map(machine.yield);

      return outputSequence
    })
    .map(arr => arr[arr.length - 1]);
  const HTMLedResults = actualFinalOutputs.map(lastOutput => {
    if (lastOutput == null) {
      debugger
      throw `should never happen: by construction the input sequence leads to successful application`
    }

    // NOTE : lastOutput is an array, and should only have one element
    return mapObjIndexed((value, sinkName) => {
      if (sinkName === 'DOM') return convertVNodesToHTML(value)
      else return value
    }, lastOutput[0])
  });

  // E. Analyze results
  const testDescriptions = inputSequences.map(inputSequence => {
    return inputSequence.reduce((acc, input) => {
      const eventName = Object.keys(input)[0];
      acc = [acc, eventName].join('->');

      return acc
    }, '')
  });
  HTMLedResults.forEach(
    (HTMLedResult, index) => assert.deepEqual(HTMLedResult, expectedFinalOutputs[index], testDescriptions[index])
  );
});
