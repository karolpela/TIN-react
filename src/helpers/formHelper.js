const formMode = {
  NEW: 'NEW',
  EDIT: 'EDIT'
};

export const formValidationKeys = {
  notEmpty: 'notEmpty',
  len_2_12: 'len_2_12',
  len_2_20: 'len_2_20',
  len_2_40: 'len_2_40',
  len_2_60: 'len_2_60',
  isPhoneNo: 'isPhoneNo',
  isShoeSize: 'isShoeSize',
  isInteger: 'isInteger',
  isDate: 'isDate',
  notInFuture: 'notInFuture',
  afterOrEqualToStartDate: 'afterOrEqualToStartDate',
  wrongPhoneNoOrPassword: 'wrongPhoneNoOrPassword'
};

export function getValidationErrorKey(error) {
  if (error === '') return '';
  return `form.validation.messages.${error}`;
}

export default formMode;
