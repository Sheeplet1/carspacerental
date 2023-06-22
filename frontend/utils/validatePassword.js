const checkPasswordValidation = (password) => {
  const isWhitespace = /^(?=.*\s)/;
  if (isWhitespace.test(password)) {
    return "Password must not contain Whitespaces.";
  }


  const isContainsUppercase = /^(?=.*[A-Z])/;
  if (!isContainsUppercase.test(password)) {
    return "Password must have at least one Uppercase Character.";
  }


  const isContainsLowercase = /^(?=.*[a-z])/;
  if (!isContainsLowercase.test(password)) {
    return "Password must have at least one Lowercase Character.";
  }


  const isContainsNumber = /^(?=.*[0-9])/;
  if (!isContainsNumber.test(password)) {
    return "Password must contain at least one Digit.";
  }


  const isContainsSymbol = /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])/;
  if (!isContainsSymbol.test(password)) {
    return "Password must contain at least one Special Symbol.";
  }


  const isValidLength = /^.{8,20}$/;
  if (!isValidLength.test(password)) {
    return "Password must be 8-20 Characters Long.";
  }

  return "";
}

export default checkPasswordValidation;