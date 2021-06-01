import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { useFormik } from 'formik';

import Login from './login'
import SignUp from './signup'
import { RouteLayout } from "./formLayouts/routeLayout"
import LinkLayout from "./formLayouts/linkLayout"
import TabHeaders from "../components/tabHeaders"

const Launch = () => {

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      formErrors: { email: "", password: "" },
      emailValid: false,
      passwordValid: false,
      formValid: false,
      message: "",
      className: ""
    },
    onSubmit: values => {
    },
  });

  const [user, setUser] = useState(formik.values);
 
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
        </div>
      </nav>

      <div className="outer">
        <div className="inner">
          <Switch>
            <RouteLayout path="/sign-up" class={SignUp} setUser={setUser} formik={formik} />
            {user == null ? (
              <RouteLayout path="/sign-in" class={Login} setUser={setUser} formik={formik}  />
            ) : (
              <RouteLayout path="/dashboard" class={TabHeaders} setUser={setUser} formik={formik}/>
            )}
            <RouteLayout path="/" class={Login} setUser={setUser} formik={formik} />
          </Switch>
        </div>
      </div>
    </div></Router>
  );
}

export default Launch;
