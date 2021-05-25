import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch } from "react-router-dom";

import Login from './login'
import SignUp from './signup'
import Home from './home'
import { ToasterMessage } from "./formLayouts/toasterMessage"
import { RouteLayout } from "./formLayouts/routeLayout"
import LinkLayout from "./formLayouts/linkLayout"

const Launch = () => {
  const initialUserState = {
    email: "",
    password: "",
    name: "",
    formErrors: { email: "", password: "" },
    emailValid: false,
    passwordValid: false,
    formValid: false,
    error: ""
  };
  const [user, setUser] = useState(initialUserState);

  // Handle input changes
  const handleInputChange = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  }; 

  return (<Router>
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <LinkLayout path="/sign-in" label="AjackusProperty" />
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <LinkLayout path="/sign-in" label="Sign in" />
              <LinkLayout path="/sign-up" label="Sign up" />
            </ul>
          </div> 
          <ToasterMessage message={user.error} />
        </div>
      </nav>

      <div className="outer">
        <div className="inner">
          <Switch>
            <RouteLayout path="/sign-up" class={SignUp} user={user} setUser={setUser} handleInputChange={handleInputChange} />
            {user == null ? (
              <RouteLayout path="/sign-in" class={Login} user={user} setUser={setUser} handleInputChange={handleInputChange} />
            ) : (
              <RouteLayout path="/home" class={Home} user={user} setUser={setUser} handleInputChange={handleInputChange} />
            )}
            <RouteLayout path="/" class={Login} user={user} setUser={setUser} handleInputChange={handleInputChange} />
          </Switch>
        </div>
      </div>
    </div></Router>
  );
}

export default Launch;
