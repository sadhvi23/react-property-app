import {withRouter, useLocation } from 'react-router-dom';
import { useDispatch } from "react-redux";

import { login } from "../actions/users";
import { Button } from "./formLayouts/buttonLayout"
import { Input } from "./formLayouts/inputLayout"
import validateForm from "../helpers/validateForm"
import errorHandler from "../helpers/errorHandler"
import notify from "../helpers/notify"

// Handle login page
const Login = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  
  // Store details and use services
  const saveUser = async e => {
    e.preventDefault()
    // Validate when user click on login or register
    validateForm(props.formik.values, props.setUser, e.target.name, e.target.value)
    const { email, name, password } = props.formik.values;
    dispatch(login(email, password, name))
      .then(data => { 
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
        props.history.push("/dashboard")
        props.setUser({...props.formik.values, email: '', name: '', password: '', message: "Request has been processed successfully" })
      })
      .catch(e => {
        notify(e.message)
        props.setUser({...props.formik.values, message: e.message})
      });
  };  

  // onClick on signup button redirect to signup uri
  const onClick = () => {
    props.history.push("/panel/sign-up")
  }
  
  return (
    <div>
      <form onSubmit={saveUser}>
        <h3>Log in</h3>

        <Input divClass="form-group" label="Email" type="email" name="email" class="form-control" placeholder=
        "Enter email" value={props.formik.values.email} handleChange={props.formik.handleChange}/>
        

        <Input divClass="form-group" label="Password" type="password" name="password" class="form-control" placeholder=
        "Enter password" value={props.formik.values.password} handleChange={props.formik.handleChange}/>

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
