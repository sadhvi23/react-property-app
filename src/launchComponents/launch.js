import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from './login'
import SignUp from './signup'
import Home from './home'
import FormErrors from './formValidations/formErrors'

const Launch = () => {
  const initialUserState = {
    email: "",
    password: "",
    name: "",
    formErrors: { email: "", password: "" },
    emailValid: false,
    passwordValid: false,
    formValid: false
  };
  const [user, setUser] = useState(initialUserState);

  // Validate form fields and form validation
  const validateField= (fieldName, value) => {
    let { formErrors, emailValid, passwordValid }  = user
    switch(fieldName) {
      case 'email':
        emailValid = (/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i).test(value)
        formErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 4;
        formErrors.password = passwordValid ? '': ' is too short';
        break;
      default:
        break;
    }
    setUser({formErrors: formErrors, emailValid: emailValid,passwordValid: passwordValid }, validateForm);
  }

  // Do form validation
  const validateForm = () => {
    setUser({formValid: user.emailValid && user.passwordValid});
  }

  return (<Router>
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/sign-in"}>AjackusProperty</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-in"}>Sign in</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="outer">
        <div className="inner">
          <Switch>
            <Route path="/sign-up" render={() => {
              return(
                <div>
                  <SignUp user={user} setUser={setUser} validateField={validateField}/>
                  <div className="panel panel-default">
                    <FormErrors formErrors={user.formErrors} />
                  </div>
                </div>
              )
            }} />
            {user == null ? (
              <Route path="/sign-in" render={() => {
                return(
                  <div>
                    <Login user={user} setUser={setUser} validateField={validateField}/>
                    <div className="panel panel-default">
                      <FormErrors formErrors={user.formErrors} />
                    </div>
                  </div>
                )
              }} />
            ) : (
              <Route path="/home" render={() => {
                return(
                  <div>
                    <Home user={user} setUser={setUser}/>
                  </div>
                )
              }} />
            )}
            <Route path="/" render={() => {
              return(
                <div>
                  <Login user={user} setUser={setUser} validateField={validateField}/>
                  <div className="panel panel-default">
                    <FormErrors formErrors={user.formErrors} />
                  </div>
                </div>
              )
            }} />
          </Switch>
        </div>
      </div>
    </div></Router>
  );
}

export default Launch;
