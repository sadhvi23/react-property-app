import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";

import { signUp } from "../actions/users";
import { Button } from "./formLayouts/buttonLayout"
import { Input } from "./formLayouts/inputLayout"
import validateForm from "../helpers/validateForm"

// Signup Function to handle registration
const SignUp = (props) => {
  const dispatch = useDispatch();

  // Store details and use services
  const saveUser = async e => {
    e.preventDefault();
    // Validate when user click on login or register
    validateForm(props.user, props.setUser, e.target.name, e.target.value)
    const { email, name, password } = props.user;
    dispatch(signUp(email, name, password))
      .then(data => { 
        props.setUser({
          ...props.user,
          id: data.user.id,
          email: data.user.email,
          password: data.user.password,
          name: data.user.name
        });
        localStorage.setItem('userId', data.user.id)
        props.history.push('/home')
        props.setUser({...props.user, email: '', name: '', password: '' })
      })
      .catch(e => {
        console.log(e.message);
        props.setUser({...props.user, error: e.message})
      });
  };

  return (
    <form onSubmit={saveUser}>
      <h3>Register</h3>

      <Input divClass="form-group" label="Name" type="name" class="form-control" placeholder=
      "Enter name" value={props.user.name} handleChange={props.handleInputChange}/>

      <Input divClass="form-group" label="Email" type="email" class="form-control" placeholder=
      "Enter email" value={props.user.eamil} handleChange={props.handleInputChange}/> 

      <Input divClass="form-group" label="Password" type="password" class="form-control" placeholder=
      "Enter password" value={props.user.password} handleChange={props.handleInputChange}/>

      <Button type="submit" class="btn btn-dark btn-lg btn-block" disabled={!(props.user.email && props.user.password)} label="Register" />
    </form>
  )
};

export default withRouter(SignUp);
