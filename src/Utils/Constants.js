export const ERROR_FIELD_TYPES = {
  EMAIL: "email",
  PHONE: "phone",
  PASSWORD: "password",
};

export const VALID_EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const VALID_PHONE_REGEX = /^\d{10}$/;
export const VALID_PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const checkEmptyFieldOrError = (value, type) => {
  if (value === "") return true;

  // check email
  if (type === ERROR_FIELD_TYPES.EMAIL) {
    // check email
    if (!VALID_EMAIL_REGEX.test(value)) {
      return true;
    }
  }

  // check phone
  if (type === ERROR_FIELD_TYPES.PHONE) {
    // check phone number
    if (!VALID_PHONE_REGEX.test(value)) {
      return true;
    }
  }

  if (type === ERROR_FIELD_TYPES.PASSWORD) {
    // check password
    if (!VALID_PASSWORD_REGEX.test(value)) {
      return true;
    }
  }

  return false;
};

export const formatAmount = (amount, format = "en-IN") => {
  if(amount == null || amount == 0 || amount == undefined)  return amount;
  return amount.toLocaleString();
};
