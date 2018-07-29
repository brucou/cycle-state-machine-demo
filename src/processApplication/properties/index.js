

// Process application steps (UI point of view)
export const STEP_ABOUT = 'About';
export const STEP_QUESTION = 'Question';
export const STEP_TEAMS = 'Teams';
export const STEP_REVIEW = 'Review';

// About screen text messages
export const ABOUT_YOU = `About you`;
export const WHAT_IS_YOUR_SUPER_POWER = "What is your superpower?"
export const PERSONAL_DETAILS = `Personal details`
export const PREFERRED_NAME = "Preferred name"
export const BIRTHDAY = "Birthday"
export const ZIPCODE = "Zip code"
export const CONTINUE = `Continue`
export const COMPLETE_YOUR_APPLICATION_FOR = `Complete your application for`;

// Init screen text message
export const LOADING_USER_APPLICATION_DATA = 'Loading user application data...';

// Applied screen text message
export const YOU_SUCCESSFULLY_APPLIED = `You successfully applied! Stay in touch`;

// Validation errors
export const FIELD_MIN_LENGTH = 2;
export const MANDATORY_PLEASE_FILL_IN_VALID_ERROR = `Mandatory field : please fill in !`
export const MIN_LENGTH_VALID_ERROR = `Please fill field with at least ${FIELD_MIN_LENGTH} characters!`

// Selectors
export const USER_APPLICATION_QUESTION_SCREEN_ANSWER_ERROR_SELECTOR = '.c-textfield__error.c-textfield__error--answer';
export const USER_APPLICATION_ABOUT_SCREEN_SUPERPOWER_ERROR_SELECTOR = '.c-textfield__error.c-textfield__error--super-power';
export const USER_APPLICATION_ABOUT_SCREEN_LEGAL_NAME_ERROR_SELECTOR = '.c-textfield__error.c-textfield__error--legal-name';
export const USER_APPLICATION_ABOUT_SCREEN_PREFERRED_NAME_ERROR_SELECTOR = '.c-textfield__error.c-textfield__error--preferred-name';
export const USER_APPLICATION_ABOUT_SCREEN_PHONE_ERROR_SELECTOR = '.c-textfield__error.c-textfield__error--phone';
export const USER_APPLICATION_ABOUT_SCREEN_BIRTHDAY_ERROR_SELECTOR = '.c-textfield__error.c-textfield__error--birthday';
export const USER_APPLICATION_ABOUT_SCREEN_ZIPCODE_ERROR_SELECTOR = '.c-textfield__error.c-textfield__error--zip-code';
export const USER_APPLICATION_CONTINUE_BUTTON_SELECTOR = '.c-btn.c-btn--primary.c-application__submit';
export const USER_APPLICATION_ABOUT_CONTINUE_BUTTON_SELECTOR = '.c-btn.c-btn--primary.c-application__submit-about';
export const USER_APPLICATION_QUESTION_CONTINUE_BUTTON_SELECTOR = '.c-btn.c-btn--primary.c-application__submit--question';
export const USER_APPLICATION_TEAM_CONTINUE_BUTTON_SELECTOR= '.c-btn.c-btn--primary.c-application__submit--continue';
export const USER_APPLICATION_TEAMLIST_SELECTOR = '.c-application__teams-list';
export const USER_APPLICATION_SKIP_TEAM_SELECTOR = '.c-btn.c-btn--quiet.c-application__submit--team_detail_skip';
export const USER_APPLICATION_JOIN_UNJOIN_TEAM_SELECTOR = '.c-application__submit--team_detail_join';
export const USER_APPLICATION_BACK_TO_TEAMS_SELECTOR = '.c-application__team_detail-back';
export const USER_APPLICATION_REVIEW_ABOUT_SELECTOR = '.c-application__change--about';
export const USER_APPLICATION_REVIEW_OPP_QUESTION_SELECTOR = '.c-application__change--question';
export const USER_APPLICATION_REVIEW_TEAMS_SELECTOR = '.c-application__change--teams';
export const USER_APPLICATION_REVIEW_SUBMIT_SELECTOR = '.c-application__review--submit';
export const USER_APPLICATION_FORM_INPUT_SUPERPOWER_SELECTOR = '.c-textfield__input--super-power';
export const USER_APPLICATION_FORM_INPUT_LEGAL_NAME_SELECTOR = '.c-textfield__input--legal-name';
export const USER_APPLICATION_FORM_INPUT_PREFERRED_NAME_SELECTOR = '.c-textfield__input--preferred-name';
export const USER_APPLICATION_FORM_INPUT_PHONE_SELECTOR = '.c-textfield__input--phone';
export const USER_APPLICATION_FORM_INPUT_BIRTHDAY_SELECTOR = '.c-textfield__input--birthday';
export const USER_APPLICATION_FORM_INPUT_ZIPCODE_SELECTOR = '.c-textfield__input--zip-code';
export const USER_APPLICATION_FORM_INPUT_OPP_ANSWER_SELECTOR = '.c-textfield__input--answer';
export const USER_APPLICATION_FORM_INPUT_TEAM_ANSWER_SELECTOR = '.c-textfield__input--team_detail_answer';

// Steps (process perspective, not UI)
export const STEP_TEAM_DETAIL = 'team_detail';
export const STEP_APPLIED = 'step_applied';
export const applicationProcessSteps = {
  // NOTE !! It is very important that the keys and the values are equal!!
  // To avoid subtile bugs when sometimes we compare on values(..), other times on keys(..)
  [STEP_ABOUT]: STEP_ABOUT,
  [STEP_QUESTION]: STEP_QUESTION,
  [STEP_TEAMS]: STEP_TEAMS,
  [STEP_TEAM_DETAIL]: STEP_TEAM_DETAIL,
  [STEP_REVIEW]: STEP_REVIEW,
  [STEP_APPLIED]: STEP_APPLIED
};

export const aboutYouFields = ['superPower'];
export const personalFields = ['birthday', 'phone', 'preferredName', 'zipCode', 'legalName'];
export const questionFields = ['answer'];

// Sinks for the application
export const DOMAIN_ACTION= 'domainAction';
export const DOM = 'DOM';

// Control states monikers
// DOC must be idenifier for functions, so no spaces!!
export const INIT_S = 'INIT_S';
export const STATE_ABOUT = 'About';
export const STATE_QUESTION = 'Question';
export const STATE_TEAMS = 'Teams';
export const STATE_TEAM_DETAIL = 'Team_Detail';
export const STATE_REVIEW = 'Review';
export const STATE_APPLIED = 'State_Applied';

// Events' moniker
export const FETCH_EV = 'fetch';
export const ABOUT_CONTINUE = 'about_continue';
export const QUESTION_CONTINUE = 'question_continue';
export const TEAM_CLICKED = 'team_clicked';
export const SKIP_TEAM_CLICKED = 'skip_team_clicked';
export const JOIN_OR_UNJOIN_TEAM_CLICKED = 'join_team_clicked';
export const BACK_TEAM_CLICKED = 'back_team_clicked';
export const TEAM_CONTINUE = 'team_continue';
export const CHANGE_ABOUT = 'change_about';
export const CHANGE_QUESTION = 'change_question';
export const CHANGE_TEAMS = 'change_teams';
export const APPLICATION_COMPLETED = 'application_completed';
