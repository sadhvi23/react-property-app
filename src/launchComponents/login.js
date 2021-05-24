import React from "react";
import { useDispatch } from "react-redux";
// import { withRouter } from "react-router-dom";

import { login } from "../actions/users";
import { Button } from "./formLayouts/buttonLayout"
import { Input } from "./formLayouts/inputLayout"

// Handle login page
const Login = (props) => {
  const dispatch = useDispatch();

  // Handle input changes
  const handleInputChange = event => {
    const { name, value } = event.target;
    props.setUser({ ...props.user, [name]: value }, props.validateField(name, value));
  };  

  // Store details and use service
  const saveUser = async e => {
    e.preventDefault();
    const { email, password } = props.user;
    dispatch(login(email, password))
      .then(data => {
        props.setUser({
          id: data.user.id,
          email: data.user.email,
          password: data.user.password,
          token: data.token
        });
        console.log(data);
        localStorage.setItem('userId', data.user.id)
        props.history.push('/home')
        props.setUser({ email: '', password: '' })
      })
      .catch(e => {
        console.log(e);
        alert("Invalid Credentials")
      });
  };

  return (
    <form onSubmit={saveUser}>
      <h3>Log in</h3>

      <Input divClass="form-group" label="Email" type="email" class="form-control" placeholder=
      "Enter email" value={props.user.email} handleChange={handleInputChange}/>
      

      <Input divClass="form-group" label="Password" type="password" class="form-control" placeholder=
      "Enter password" value={props.user.password} handleChange={handleInputChange}/>

      <Button type="submit" class="btn btn-dark btn-lg btn-block" disabled={!(props.user.email && props.user.password)} label="Sign in" />
    </form>
  );
};

export default Login;
