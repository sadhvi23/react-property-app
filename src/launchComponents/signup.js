import { useDispatch } from "react-redux";
import {withRouter} from 'react-router-dom';

import { signUp } from "../actions/users";
import { Button } from "./formLayouts/buttonLayout"
import { Input } from "./formLayouts/inputLayout"
import validateForm from "../helpers/validateForm"

// Signup Function to handle registration
const SignUp = (props) => {
  const dispatch = useDispatch();

   // Store details and use services
   const saveUser = async e => {
    e.preventDefault()
    // Validate when user click on login or register
    validateForm(props.formik.values, props.setUser, e.target.name, e.target.value)
    const { email, name, password } = props.formik.values;
    dispatch(signUp(email, password, name))
      .then(data => { 
        props.setUser({
          ...props.formik.values,
          id: data.user.id,
          email: data.user.email,
          password: data.user.password,
          name: data.user.name,
          token: data.token
        });
        localStorage.setItem('userId', data.user.id)
        props.history.push("/dashboard")
        props.setUser({...props.formik.values, email: '', name: '', password: '', message: "Request has been processed successfully" })
      })
      .catch(e => {
        console.log(e.message);
        props.setUser({...props.formik.values, message: e.message})
      });
  };

  return (
    <form onSubmit={saveUser}>
      <h3>Register</h3>

      <Input divClass="form-group" label="Name" type="name" name="name" class="form-control" placeholder=
      "Enter name" value={props.formik.values.name} handleChange={props.formik.handleChange}/>

      <Input divClass="form-group" label="Email" type="email" name="email" class="form-control" placeholder=
      "Enter email" value={props.formik.values.email} handleChange={props.formik.handleChange}/> 

      <Input divClass="form-group" label="Password" type="password" name="password" class="form-control" placeholder=
      "Enter password" value={props.formik.values.password} handleChange={props.formik.handleChange}/>

      <Button type="submit" class="btn btn-dark btn-lg btn-block" disabled={!(props.formik.values.email && props.formik.values.password)} label="Register" />
    </form>
  )
};

export default withRouter(SignUp);
