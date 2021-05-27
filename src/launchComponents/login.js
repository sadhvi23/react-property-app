import {withRouter} from 'react-router-dom';
import { useDispatch } from "react-redux";

import { login } from "../actions/users";
import { Button } from "./formLayouts/buttonLayout"
import { Input } from "./formLayouts/inputLayout"
import validateForm from "../helpers/validateForm"

// Handle login page
const Login = (props) => {
  const dispatch = useDispatch();
  
  // Store details and use services
  const saveUser = async e => {
    e.preventDefault()
    // Validate when user click on login or register
    validateForm(props.formik.values, props.setUser, e.target.name, e.target.value)
    const { email, name, password } = props.formik.values;
    dispatch(login(email, password, name))
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
        localStorage.setItem("token", data.token)
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
      <h3>Log in</h3>

      <Input divClass="form-group" label="Email" type="email" name="email" class="form-control" placeholder=
      "Enter email" value={props.formik.values.email} handleChange={props.formik.handleChange}/>
      

      <Input divClass="form-group" label="Password" type="password" name="password" class="form-control" placeholder=
      "Enter password" value={props.formik.values.password} handleChange={props.formik.handleChange}/>

      <Button type="submit" class="btn btn-dark btn-lg btn-block" disabled={!(props.formik.values.email && props.formik.values.password)} label=
      "Sign in"/>
    </form>
  );
};

export default withRouter(Login);
