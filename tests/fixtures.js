// Fixtures
import {
  MANDATORY_PLEASE_FILL_IN_VALID_ERROR, MIN_LENGTH_VALID_ERROR, STATE_ABOUT, STATE_QUESTION, STATE_TEAMS, STEP_ABOUT,
  STEP_REVIEW
} from "../src/processApplication/properties"

export const USER_KEY = 'user';
export const OP_KEY = 'opportunity';
export const USER = {
  displayName: 'Joe',
  email: 'joe@gmail.com',
  phoneNumber: '+1-23421534'
};
export const OPPORTUNITY = { description: 'if you only had one shot', question: 'would you catch it?' };
export const TEAMS = [
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
export const PROJECT = { name: 'Beyond and further', date: '1984.09.09', location: 'right here' };
export const teamsInfo = {
  "-KFVqOyjPpR4pdgK-0Wr": {
    description: "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of" +
    " this highly social position. ",
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
export const unjoinedTeamsInfo = {
  "-KFVqOyjPpR4pdgK-0Wr": {
    description: "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
    name: "Parking",
    question: "Have you worked parking for any other festivals? Which ones?",
    hasBeenJoined: false,
    answer: ''
  },
  "KFVssLvEPsDJUofy1Yd": {
    description: "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
    name: "Box Office",
    question: "Which festivals have you worked Box Office before?",
    hasBeenJoined: false,
    answer: ''
  },
};
export const appInABOUTandValidFormAndNotReviewed = {
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
export const appInQUESTIONandInvalidForm = {
  formData: {
    'answer': '',
  },
  validationData: {
    'answer': MANDATORY_PLEASE_FILL_IN_VALID_ERROR
  }
};
export const appInQUESTIONandValidFormAndNotReviewed = {
  formData: {
    'answer': 'That is what I like',
  },
  validationData: {
    'answer': true
  }
};
export const appInTeamDetailInvalidForm = {
  formData: {
    'answer': ''
  },
  validationData: {
    'answer': MANDATORY_PLEASE_FILL_IN_VALID_ERROR
  }
};
// that is the index on the team clicked on
export const teamAnswer = teamIndex => `Team ${teamIndex} answer`;

/**
 *
 * @param {UserApplication} userApplication
 * @returns {{user: User, opportunity: Opportunity, teams: Array<Team>, project: Project, errorMessage: String,
 *   validationMessages: Object, userApplication: UserApplication}}
 */
export function makeAppFixture(userApplication) {
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

/**
 *
 * @param superPower
 * @param phone
 * @param preferredName
 * @param zipCode
 * @param legalName
 * @param birthday
 * @param answer
 * @param teamsInfo
 * @param step
 * @param hasApplied
 * @param hasReviewedApplication
 * @param latestTeamIndex
 * @returns {UserApplication}
 */
export function makeUserApplication({
                                      superPower, phone, preferredName, zipCode, legalName, birthday, answer, teamsInfo,
                                      step, hasApplied, hasReviewedApplication, latestTeamIndex
                                    }) {
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

export const appUnsavedWithNoData = makeAppFixture(makeUserApplication({
  superPower: '',
  phone: '',
  preferredName: '',
  zipCode: '',
  legalName: '',
  birthday: '',
  answer: '',
  teamsInfo: unjoinedTeamsInfo,
  step: STEP_ABOUT,
  hasApplied: false,
  hasReviewedApplication: false,
  latestTeamIndex: 0
}));
export const appInABOUTandInvalidForm = {
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
export const appInABOUTandValidFormAndReviewed = {
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
export const appInTeamDetailValidForm = [
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
export const clickedOnSkipTeamValid = {
  formData: {
    'answer': 'skipped'
  },
  validationData: {
    'answer': true
  }
};
export const clickedOnSkipTeamInvalid = {
  formData: {
    'answer': ''
  },
  validationData: {
    'answer': MANDATORY_PLEASE_FILL_IN_VALID_ERROR
  }
};
export const clickedOnBackInvalid = {
  formData: {
    'answer': ''
  },
  validationData: {
    'answer': MANDATORY_PLEASE_FILL_IN_VALID_ERROR
  }
};
export const appInQUESTIONandValidFormAndReviewed = {
  formData: {
    'answer': 'That is what I like so much',
  },
  validationData: {
    'answer': true
  }
};
export const clickedOnTeam = 0;
export const appSavedInTeamsStateWithTeam1Joined = makeAppFixture(makeUserApplication({
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
export const appSavedInAboutState = makeAppFixture(makeUserApplication({
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
export const appSavedInQuestionState = makeAppFixture(makeUserApplication({
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
export const appSavedInReviewState = makeAppFixture(makeUserApplication({
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
export const inputSequencesFixture = [
  [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }],
  [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }],
  [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }],
  [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 0 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 0 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 0 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 0 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 0 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 0 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 0 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 0 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 0 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 0 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 0 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 0 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 0 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 0 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 0 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 0 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 0 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 0 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 0 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 0 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "skip_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "join_team_clicked": {
      "formData": { "answer": "Team 1 answer" },
      "validationData": { "answer": true }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "back_team_clicked": {
      "formData": { "answer": "" },
      "validationData": { "answer": "Mandatory field : please fill in !" }
    }
  }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }], [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_clicked": 0 }, {
    "back_team_clicked": {
      "formData": { "answer": "skipped" },
      "validationData": { "answer": true }
    }
  }, { "team_continue": {} }, { "application_completed": {} }],
  [{ "init": {} }, {
    "fetch": {
      "user": {
        "displayName": "Joe",
        "email": "joe@gmail.com",
        "phoneNumber": "+1-23421534"
      },
      "opportunity": { "description": "if you only had one shot", "question": "would you catch it?" },
      "teams": [{
        "teamKey": "-KFVqOyjPpR4pdgK-0Wr",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
        "name": "Parking",
        "question": "Have you worked parking for any other festivals? Which ones?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }, {
        "teamKey": "KFVssLvEPsDJUofy1Yd",
        "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
        "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
        "name": "Box Office",
        "question": "Which festivals have you worked Box Office before?",
        "project": {
          "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
          "name": "Cosmic Alignment",
          "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
        }
      }],
      "project": { "name": "Beyond and further", "date": "1984.09.09", "location": "right here" },
      "errorMessage": null,
      "validationMessages": {},
      "userApplication": {
        "userKey": "user",
        "opportunityKey": "opportunity",
        "about": {
          "aboutYou": { "superPower": "fly" },
          "personal": {
            "phone": "1234",
            "preferredName": "Otadaki",
            "zipCode": "1231",
            "legalName": "Kujio",
            "birthday": "09.09.09"
          }
        },
        "questions": { "answer": "That is what I like" },
        "teams": {
          "-KFVqOyjPpR4pdgK-0Wr": {
            "description": "Be one of the first faces people see and direct them their parking spot. Enjoy the many perks of this highly social position. ",
            "name": "Parking",
            "question": "Have you worked parking for any other festivals? Which ones?",
            "hasBeenJoined": true,
            "answer": "Never"
          },
          "KFVssLvEPsDJUofy1Yd": {
            "description": "The gateway to Cosmic Alignment! Here, you'll be selling GA tickets, banding guests and checking in artists. This job requires organization and a friendly face.",
            "name": "Box Office",
            "question": "Which festivals have you worked Box Office before?",
            "hasBeenJoined": false,
            "answer": ""
          }
        },
        "progress": { "step": "Teams", "hasApplied": false, "hasReviewedApplication": true, "latestTeamIndex": 0 }
      }
    }
  }, { "team_continue": {} }, { "application_completed": {} }]
];
