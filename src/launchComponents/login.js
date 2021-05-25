import { login } from "../actions/users";
import { Button } from "./formLayouts/buttonLayout"
import { Input } from "./formLayouts/inputLayout"

// Handle login page
const Login = (props) => {

  props.formik.values.className = login

  return (
    <form onSubmit={props.formik.handleSubmit}>
      <h3>Log in</h3>

      <Input divClass="form-group" label="Email" type="email" class="form-control" placeholder=
      "Enter email" value={props.formik.values.email} handleChange={props.formik.handleChange}/>
      

      <Input divClass="form-group" label="Password" type="password" class="form-control" placeholder=
      "Enter password" value={props.formik.values.password} handleChange={props.formik.handleChange}/>

      <Button type="submit" class="btn btn-dark btn-lg btn-block" disabled={!(props.formik.values.email && props.formik.values.password)} label="Sign in" />
    </form>
  );
};

export default Login;
