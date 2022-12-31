/* eslint-disable no-unused-vars */
export function checkRequired(value) {
  if (!value) {
    return false;
  }
  value = value.toString().trim();
  if (value === '') {
    return false;
  }
  return true;
}

export function checkTextLengthRange(value, min, max) {
  if (!value) {
    return false;
  }
  value = value.toString().trim();
  const length = value.length;
  if (max && length > max) {
    return false;
  }
  if (min && length < min) {
    return false;
  }
  return true;
}

// instead of checking e-mail address
export function checkPhoneNo(value) {
  if (!value) {
    return false;
  }
  value = value.toString().trim();
  const re = /^\d{9}$/;
  return re.test(value);
}

export function checkNumber(value) {
  if (!value) {
    return false;
  }
  if (isNaN(value)) {
    return false;
  }
  return true;
}

export function checkNumberRange(value, min, max) {
  if (!value) {
    return false;
  }
  if (isNaN(value)) {
    return false;
  }
  value = parseFloat(value);
  if (value < min) {
    return false;
  }
  if (value > max) {
    return false;
  }
  return true;
}

export function checkDate(value) {
  // check if yyyy-MM-dd
  if (!value) {
    return false;
  }
  const pattern = /(\d{4})-(\d{2})-(\d{2})/;
  return pattern.test(value);
}

export function checkDateIfAfter(value, compareTo) {
  if (!value) {
    return false;
  }
  if (!compareTo) {
    return false;
  }
  const pattern = /(\d{4})-(\d{2})-(\d{2})/;
  if (!pattern.test(value)) {
    return false;
  }
  if (!pattern.test(compareTo)) {
    return false;
  }
  const valueDate = new Date(value);
  const compareToDate = new Date(compareTo);
  if (valueDate.getTime() < compareToDate.getTime()) {
    return false;
  }
  return true;
}

export function checkDateIfAfterOrEqual(value, compareTo) {
  if (!value) {
    return false;
  }
  if (!compareTo) {
    return false;
  }
  const pattern = /(\d{4})-(\d{2})-(\d{2})/;
  if (!pattern.test(value)) {
    return false;
  }
  if (!pattern.test(compareTo)) {
    return false;
  }
  const valueDate = new Date(value);
  const compareToDate = new Date(compareTo);
  if (valueDate.getTime() <= compareToDate.getTime()) {
    return false;
  }
  return true;
}

export function checkShoeSize(value) {
  // true for eg. 40 or 40.5
  if (!value) {
    return false;
  }
  const pattern = /^[1-9][0-9](\.[5])?$/;
  return pattern.test(value);
}
