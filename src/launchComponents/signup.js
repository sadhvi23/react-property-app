// import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";

import { signUp } from "../actions/users";
import { Button } from "./formLayouts/buttonLayout"
import { Input } from "./formLayouts/inputLayout"

// Signup Function to handle registration
const SignUp = (props) => {
  const dispatch = useDispatch();

  // Handle input changes
  const handleInputChange = event => {
    const { name, value } = event.target;
    props.setUser({ ...props.user, [name]: value }, props.validateField(name, value));
  };

  // Store details and use services
  const saveUser = async e => {
    e.preventDefault();
    const { email, name, password } = props.user;
    dispatch(signUp(email, name, password))
      .then(data => {
        props.setUser({
          id: data.user.id,
          email: data.user.email,
          password: data.user.password,
          name: data.user.name
        });
        localStorage.setItem('userId', data.user.id)
        props.history.push('/home')
        props.setUser({ email: '', name: '', password: '' })
      })
      .catch(e => {
        console.log(e);
        alert("Invalid Credentials")
      });
  };

  return (
    <form onSubmit={saveUser}>
      <h3>Register</h3>

      <Input divClass="form-group" label="Name" type="name" class="form-control" placeholder=
      "Enter name" value={props.user.name} handleChange={handleInputChange}/>

      <Input divClass="form-group" label="Email" type="email" class="form-control" placeholder=
      "Enter email" value={props.user.eamil} handleChange={handleInputChange}/> 

      <Input divClass="form-group" label="Password" type="password" class="form-control" placeholder=
      "Enter password" value={props.user.password} handleChange={handleInputChange}/>

      <Button type="submit" class="btn btn-dark btn-lg btn-block" label="Register" />
    </form>
  )
};

export default SignUp;
