import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { useFormik } from 'formik';

import Login from './login'
import SignUp from './signup'
import { RouteLayout } from "./formLayouts/routeLayout"
import Dashboard from "../components/dashboard"

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
    }
  });

  const [user, setUser] = useState(formik.values);
 
  return (<Router>
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <h3>Property APP</h3>
        </div>
      </nav>

      <div className="outer">
        <div className="inner">
          <Switch>
            <RouteLayout path="/panel/sign-up" class={SignUp} setUser={setUser} formik={formik} />
            {user == null ? (
              <div>
                <RouteLayout path="/panel/sign-in" class={Login} setUser={setUser} formik={formik}  />
                <RouteLayout path="/user/sign-in" class={Login} setUser={setUser} formik={formik}  />
              </div>
            ) : (
              <RouteLayout path="/dashboard" class={Dashboard} setUser={setUser} formik={formik}/>
            )}
            <RouteLayout path="/" class={Login} setUser={setUser} formik={formik} />
          </Switch>
        </div>
      </div>
    </div></Router>
  );
}

export default Launch;
