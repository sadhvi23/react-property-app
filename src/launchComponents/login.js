import {withRouter, useLocation } from 'react-router-dom';
import { useDispatch } from "react-redux";

import { login } from "../actions/users";
import { Button } from "./formLayouts/buttonLayout"
import { Input } from "./formLayouts/inputLayout"
import validateUserForm from "../helpers/validateUserForm"
import errorHandler from "../helpers/errorHandler"
import notify from "../helpers/notify"
import FormErrors from "../helpers/formErrors"

// Handle login page
const Login = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();

  if (localStorage.token) {
    props.history.push("/properties")
  }
  
  // Store details and use services
  const saveUser = async e => {
    e.preventDefault()
    // Validate when user click on login or register
    validateUserForm(props.formik.values, props.setUser, e.target)
    if (props.formik.values.formValid) {
      loginUser()
    }
  }; 
  
  // Login User
  const loginUser = () => {
    const { email, name, password } = props.formik.values;
    dispatch(login(email, password, name))
      .then(data => { 
        // Block sign-in for user to panel
        if (data.role === 'user' && (location.pathname === '/' || location.pathname === "/panel/sign-in")) {
          data = { status: 'error', message: "User don't have permission to login into admin panel" }
        }
        // Block sign-in for admin to user App
        if ((data.role === 'super_admin' || data.role === 'admin') && location.pathname === '/user/sign-in') {
          data = { status: 'error', message: "Admin don't have permission to login into user App" }
        }
        errorHandler(data)
        props.setUser({
          ...props.formik.values,
          id: data.user.id,
          email: data.user.email,
          password: data.user.password,
          name: data.user.name,
          token: data.token
        });
        localStorage.setItem('userId', data.user.id)
        localStorage.setItem('currentUserRole', data.role)
        localStorage.setItem("token", data.token)
        props.history.push("/properties")
        props.setUser({...props.formik.values, email: '', name: '', password: '', message: "Request has been processed successfully" })
      })
      .catch(e => {
        notify(e.message)
        props.setUser({...props.formik.values, message: e.message})
    });
  }

  // onClick on signup button redirect to signup uri
  const onClick = () => {
    props.history.push("/panel/sign-up")
  }
  
  return (
    <div>
      <form onSubmit={saveUser}>
        <h3>Log in</h3>

        <Input divClass="form-group" label="Email" type="email" name="email" class="form-control" placeholder=
        "Enter email" value={props.formik.values.email} handleChange={props.formik.handleChange} required={true}/>

        <FormErrors formErrors={props.formik.values.formErrors} fieldname={"email"}/>

        <Input divClass="form-group" label="Password" type="password" name="password" class="form-control" placeholder=
        "Enter password" value={props.formik.values.password} handleChange={props.formik.handleChange} required={true}/>

        <FormErrors formErrors={props.formik.values.formErrors} fieldname={"password"}/>

        <Button type="submit" class="btn btn-dark btn-lg btn-block" disabled={!(props.formik.values.email && props.formik.values.password)} label=
        "Sign in"/>
      </form>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <div>
        { (location.pathname === '/panel/sign-in') &&
          <Button type="register" class="btn btn-dark btn-lg btn-block" label="Sign up" onClick={onClick} />
        }
      </div>
    </div>
  );
};

export default withRouter(Login);
