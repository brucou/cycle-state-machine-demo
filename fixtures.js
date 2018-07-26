import { OPPORTUNITY_REF, PROJECTS_REF, TEAMS_REF } from "./src/domain/index";
import { keys, values } from "ramda";

export const fakeOpportunityKey = '-KErS0cwMWYVp6cYjoQd';
export const fakeProjectKey = '-KErPvaii3BxrycFpmuZ';
export const fakeUserKey = 'facebook:10209589368915969';

export const teams = {
  [`${TEAMS_REF}!${fakeProjectKey}`]: [
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
    },
    {
      "teamKey": "-KFVutiLHVSRKVO2awPu",
      "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
      "description": " Keep an eye out and make sure everyone is safe. Guarding checkpoints, checking credentials and keeping the peace. Requiring friendly but FIRM personality. ",
      "isPublic": false,
      "name": "Safety",
      "project": {
        "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
        "name": "Cosmic Alignment",
        "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
      },

      "question": "Have you ever worked security before? For who?"
    },
    {
      "teamKey": "-KFVw9umDvGfJIZfQcdz",
      "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
      "description": "Jack of all trades unite! Get to see all aspects of the festival start to finish and help find solutions on the fly to whatever comes our way. ",
      "name": "Site Operations",
      "project": {
        "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
        "name": "Cosmic Alignment",
        "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
      },

      "question": "Thinking out of the box, in your opinion, what are 3 of the most important  \"tools\"?"
    },
    {
      "teamKey": "-KFVxEG8Fj-48lBLF3T-",
      "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
      "description": "Help run the festival from the administration side.  The Maps, Line Up, Activities, Where, Why, How, What, When & Who. All the answers are at the info booth.  ",
      "name": "Headquarters",
      "project": {
        "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
        "name": "Cosmic Alignment",
        "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
      },

      "question": "Are you computer literate? "
    },
    {
      "teamKey": "-KFVyzlAx25POUjqlj0_",
      "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
      "description": "Direct people on how to sort their garbage. Make sure the grounds stay clean and help us reduce our impact. ",
      "name": "Impact Reduction",
      "project": {
        "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
        "name": "Cosmic Alignment",
        "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
      },

      "question": "How do you think festivals can become more sustainable? "
    },
    {
      "teamKey": "-KFW-JXErboYrkV_1ujX",
      "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
      "description": "Interested in lending a hand backstage?. The requirements include heavy lifting, working quickly as a team and understanding detailed instructions.",
      "name": "Stage Hands",
      "project": {
        "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
        "name": "Cosmic Alignment",
        "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
      },

      "question": "In 160 characters, describe how you wrap cable."
    },
    {
      "teamKey": "-KFW06MthUzkquaLh_bf",
      "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
      "description": "What goes up.... The build team comes together to create the infratstructure of the festival. Featuring climbing, painting, power tools and more.",
      "name": "Build",
      "project": {
        "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
        "name": "Cosmic Alignment",
        "ownerProfileKey": "-KEMTVUivQTtyS8eYqKg"
      },

      "question": "Lincoln logs or Legos and why."
    }
  ],
};

export const projects = {
  [`${PROJECTS_REF}!${fakeProjectKey}`]:
    {
      "description": "Gather to co create a conscience experience at Cosmic Alignment. Our collective minds, bodies and souls can make this year the best yet!",
      "name": "Cosmic Alignment",
      "ownerProfileKey": "-KKpmYho9huRSTwOtcmM",
      "date": "27.07.2017",
      "location": "Austin, Texas"
    }
};

export const opportunities = {
  [`${OPPORTUNITY_REF}!${fakeOpportunityKey}`]:
    {
      "authorProfileKey": "-KEMTVUivQTtyS8eYqKg",
      "confirmationsOn": false,
      "description": "Be an important part of the great Cosmic Alignment gathering. We can't make this happen without you!",
      "isPublic": true,
      "name": "2016 Volunteer",
      "question": "What good can you bring to Cosmic Alignment?"
    }
}

export const defaultUser = {
  displayName: 'Joe',
  email: 'joe@gmail.com',
  phoneNumber: '+1-23421534',
};

/**
 * @modifies {localforage}
 * @param localforage
 */
export function loadTestData(localforage) {
  return Promise.all([teams, projects, opportunities].map(domainObjectTestData => {
    const key = keys(domainObjectTestData)[0];
    const value = values(domainObjectTestData)[0];

    return localforage.setItem(key, value);
  }))
}
