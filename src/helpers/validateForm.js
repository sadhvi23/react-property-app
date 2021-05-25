const validateForm = (user, setUser, fieldName, value) => {
  // Validate form fields and form validation
  let { formErrors, emailValid, passwordValid }  = user
  switch(fieldName) {
    case 'email':
      emailValid = (/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i).test(value)
      if (formErrors) {
        formErrors.email = emailValid ? '' : ' is invalid';
      }
      break;
    case 'password':
      passwordValid = value.length >= 4;
      if (formErrors) {
        formErrors.password = passwordValid ? '': ' is too short';
      }
      break;
    default:
      break;
  }
  setUser({ ...user, formErrors: formErrors, emailValid: emailValid, passwordValid: passwordValid }, setUser({...user, formValid: user.emailValid && user.passwordValid}));
}

export default validateForm;