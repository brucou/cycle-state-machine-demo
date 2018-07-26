import { cond, curry, gt, isEmpty, length, mapObjIndexed, pipe, T } from 'ramda';
import {
  FIELD_MIN_LENGTH, MANDATORY_PLEASE_FILL_IN_VALID_ERROR, MIN_LENGTH_VALID_ERROR
} from "./properties"
import { traceFn } from "@rxcc/utils"

//////
// Form data validation

function pleaseFillFieldIn() {
  return MANDATORY_PLEASE_FILL_IN_VALID_ERROR
}

function pleaseMinLength() {
  return MIN_LENGTH_VALID_ERROR
}

// Helper functions

function _validateScreenFields(validationSpecs, formData) {
  return mapObjIndexed((value, key) => validationSpecs[key](value))(formData)
}

export const validateScreenFields = curry(_validateScreenFields);

// About screen validation
const validateSuperPower = cond([[isEmpty, pleaseFillFieldIn], [T, T]]);
const validateLegalName = cond([[isEmpty, pleaseFillFieldIn], [T, T]]);
const validatePreferredName = cond([[isEmpty, pleaseFillFieldIn], [T, T]]);
const validatePhone = cond([[pipe(length, gt(FIELD_MIN_LENGTH)), pleaseMinLength], [T, T]]);
const validateBirthday = cond([[pipe(length, gt(FIELD_MIN_LENGTH)), pleaseMinLength], [T, T]]);
const validateZipCode = cond([[pipe(length, gt(FIELD_MIN_LENGTH)), pleaseMinLength], [T, T]]);

export const aboutScreenFieldValidationSpecs = {
  'superPower': validateSuperPower,
  'legalName': validateLegalName,
  'preferredName': validatePreferredName,
  'phone': traceFn(validatePhone, `validatePhone`),
  'birthday': validateBirthday,
  'zipCode': validateZipCode
};

// Question screen validation
const validateAnswer = cond([[isEmpty, pleaseFillFieldIn], [T, T]]);
export const questionScreenFieldValidationSpecs = {
  'answer': validateAnswer
};

// Team detail's answer validation
const validateTeamDetailAnswer = cond([[isEmpty, pleaseFillFieldIn], [T, T]]);
export const teamDetailScreenFieldValidationSpecs = {
  'answer': validateTeamDetailAnswer
};
