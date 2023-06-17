import { isEmpty, isEmptyArray, isNullOrUndefined } from './index'
import { instance as i18n } from '@/plugins/i18n/index'

// 👉 Required Validator
export const requiredValidator = (value: unknown) => {
  if (isNullOrUndefined(value) || isEmptyArray(value) || value === false)
    return 'This field is required'

  return !!String(value).trim().length || i18n.global.t('validator.FieldIsRequired')
}

// 👉 Email Validator
export const emailValidator = (value: unknown) => {
  if (isEmpty(value))
    return true

  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  if (Array.isArray(value))
    return value.every(val => re.test(String(val))) || i18n.global.t('validator.FieldIsNotValidEmail')

  return re.test(String(value)) || i18n.global.t('validator.FieldIsNotValidEmail')
}

// 👉 Password Validator
export const passwordValidator = (password: string) => {
  const regExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()]).{8,}/

  const validPassword = regExp.test(password)

  return (
    // eslint-disable-next-line operator-linebreak
    validPassword ||
    i18n.global.t('validator.PasswordNotMatchPatter')
  )
}

// 👉 Confirm Password Validator
export const confirmedValidator = (value: string, target: string) =>

  value === target || i18n.global.t('validator.ConfirmPasswordNotMatchPassword')

// 👉 Between Validator
export const betweenValidator = (value: unknown, min: number, max: number) => {
  const valueAsNumber = Number(value)

  return (Number(min) <= valueAsNumber && Number(max) >= valueAsNumber) || i18n.global.t('validator.NumberOutOfRange', { min, max })
}

// 👉 Integer Validator
export const integerValidator = (value: unknown) => {
  if (isEmpty(value))
    return true

  if (Array.isArray(value))
    return value.every(val => /^-?[0-9]+$/.test(String(val))) || i18n.global.t('validator.FieldMustBeInteger')

  return /^-?[0-9]+$/.test(String(value)) || i18n.global.t('validator.FieldMustBeInteger')
}

// 👉 Regex Validator
export const regexValidator = (value: unknown, regex: RegExp | string): string | boolean => {
  if (isEmpty(value))
    return true

  let regeX = regex
  if (typeof regeX === 'string')
    regeX = new RegExp(regeX)

  if (Array.isArray(value))
    return value.every(val => regexValidator(val, regeX))

  return regeX.test(String(value)) || i18n.global.t('validator.InvalidRegexpFormat')
}

// 👉 Alpha Validator
export const alphaValidator = (value: unknown) => {
  if (isEmpty(value))
    return true

  return /^[A-Z]*$/i.test(String(value)) || i18n.global.t('validator.ValueContainNotAlphabeticCharacters')
}

// 👉 URL Validator
export const urlValidator = (value: unknown) => {
  if (isEmpty(value))
    return true

  const re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/

  return re.test(String(value)) || i18n.global.t('validator.InvalidUrl')
}

// 👉 Length Validator
export const lengthValidator = (value: unknown, length: number) => {
  if (isEmpty(value))
    return true

  return String(value).length === length || i18n.global.t('validator.FieldTooLong', { length })
}

// 👉 Alpha-dash Validator
export const alphaDashValidator = (value: unknown) => {
  if (isEmpty(value))
    return true

  const valueAsString = String(value)

  return /^[0-9A-Z_-]*$/i.test(valueAsString) || i18n.global.t('validator.NotValidCharacters')
}


//    "FieldIsRequired": "This field is required",
//    "FieldIsNotValidEmail": "The Email field must be a valid email",
//    "PasswordNotMatchPatter": "Field must contain at least one uppercase, lowercase, special character and digit with min 8 chars",
//    "ConfirmPasswordNotMatchPassword": "The Confirm Password field confirmation does not match",
//    "NumberOutOfRange": "Enter number between ${min} and ${max}",
//    "FieldMustBeInteger": "This field must be an integer",
//    "InvalidRegexpFormat": "The Regex field format is invalid",
//    "ValueContainNotAlphabeticCharacters": "The Alpha field may only contain alphabetic characters",
//    "InvalidUrl": "URL is invalid",
//    "FieldTooLong": "The Min Character field must be at least {length} characters",
//    "NotValidCharacters": "All Character are not valid"
