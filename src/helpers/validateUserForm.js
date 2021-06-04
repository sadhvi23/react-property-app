const validateUserForm = (user, setUser, object) => {
  // Validate form fields and form validation
  let { formErrors, emailValid, passwordValid, nameValid }  = user
  let fieldName = "";
  let value = "";

  Object.keys(object).map(key => {
    fieldName = object[key].name
    value = object[key].value
    if (fieldName && value) {
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
        case 'name':
          nameValid = value.length >= 2; 
          if (formErrors) {
            formErrors.name = nameValid ? '' : " is too short";
          }
          break;
        default:
          break;
      }
    } else {
       return true
    }
  })
  setUser({ ...user, formErrors: formErrors});
  if (typeof formErrors["password"] === "undefined") {
    user.formValid = emailValid && nameValid
  } else {
    user.formValid = emailValid && passwordValid
  }
}

export default validateUserForm;
