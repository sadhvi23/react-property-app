import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { useFormik } from 'formik';
import { useDispatch } from "react-redux";

import Login from './login'
import SignUp from './signup'
import Home from './home'
import { ToasterMessage } from "./formLayouts/toasterMessage"
import { RouteLayout } from "./formLayouts/routeLayout"
import LinkLayout from "./formLayouts/linkLayout"
import validateForm from "../helpers/validateForm"

const Launch = () => {
  const dispatch = useDispatch();

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
      saveUser(values)
    },
  });

  const [user, setUser] = useState(formik.values);

  // Store details and use services
  const saveUser = values => {
    // Validate when user click on login or register
    validateForm(formik.values, setUser, values.name,values.value)
    const { email, name, password } = formik.values;
    dispatch(formik.values.className(email, password, name))
      .then(data => { 
        setUser({
          ...formik.values,
          id: data.user.id,
          email: data.user.email,
          password: data.user.password,
          name: data.user.name,
          token: data.token
        });
        localStorage.setItem('userId', data.user.id)
        setUser({...formik.values, email: '', name: '', password: '', message: "Request has been processed successfully" })
      })
      .catch(e => {
        console.log(e.message);
        setUser({...formik.values, message: e.message})
      });
      
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
          <ToasterMessage message={user.message} />
        </div>
      </nav>

      <div className="outer">
        <div className="inner">
          <Switch>
            <RouteLayout path="/sign-up" class={SignUp} formik={formik}/>
            {user == null ? (
              <RouteLayout path="/sign-in" class={Login} formik={formik} />
            ) : (
              <RouteLayout path="/home" class={Home} formik={formik} />
            )}
            <RouteLayout path="/" class={Login} formik={formik}/>
          </Switch>
        </div>
      </div>
    </div></Router>
  );
}

export default Launch;
