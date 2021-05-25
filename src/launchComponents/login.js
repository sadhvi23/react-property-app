import React from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";

import { login } from "../actions/users";
import { Button } from "./formLayouts/buttonLayout"
import { Input } from "./formLayouts/inputLayout"
import validateForm from "../helpers/validateForm"

// Handle login page
const Login = (props) => {
  const dispatch = useDispatch(); 

  // Store details and use service
  const saveUser = async e => {
    e.preventDefault();
    // Validate when user click on login or register
    validateForm(props.user, props.setUser, e.target.name, e.target.value)
    const { email, password } = props.user;
    dispatch(login(email, password))
      .then(data => {
        props.setUser({
          ...props.user,
          id: data.user.id,
          email: data.user.email,
          password: data.user.password,
          token: data.token
        });
        localStorage.setItem('userId', data.user.id)
        props.history.push('/home')
        props.setUser({...props.user, email: '', password: '' })
      })
      .catch(e => {
        props.setUser({...props.user, error: e.message})
      });
  };

  return (
    <form onSubmit={saveUser}>
      <h3>Log in</h3>

      <Input divClass="form-group" label="Email" type="email" class="form-control" placeholder=
      "Enter email" value={props.user.email} handleChange={props.handleInputChange}/>
      

      <Input divClass="form-group" label="Password" type="password" class="form-control" placeholder=
      "Enter password" value={props.user.password} handleChange={props.handleInputChange}/>

      <Button type="submit" class="btn btn-dark btn-lg btn-block" disabled={!(props.user.email && props.user.password)} label="Sign in" />
    </form>
  );
};

export default withRouter(Login);
