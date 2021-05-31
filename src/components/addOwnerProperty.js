import React, { useState } from "react";
import { useFormik } from 'formik';
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Button } from "../launchComponents/formLayouts/buttonLayout"
import { Input } from "../launchComponents/formLayouts/inputLayout"
import { addOwner } from "../actions/properties";
import notify from "../helpers/notify";

const AddOwnerProperty = (props) => {

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      message: ""
    },
    onSubmit: values => {},
  });

  const [user, setUser] = useState(formik.values);

  // Save owner on form submit
  const saveOwner = async (e) => {
    e.preventDefault();
    const { email } = formik.values;
    dispatch(addOwner(props.property.id, email))
    .then(res => { 
      setUser({ ...user, message:  email + " has been added to " +  props.property.name});
      props.history.push("/properties") 
    })
    .catch(e => {
      console.log(e.message);
      setUser({...user, message: e.message})
    });
  };

  return (
    <form onSubmit={saveOwner} onClick={notify(user.message)}>
      <h5>Enter Email to add owner</h5>

      <Input divClass="form-group" label="Email" type="email" name="email" class="form-control" placeholder=
      "Enter email" value={formik.values.email} handleChange={formik.handleChange}/>

      <Button type="submit" class="btn btn-dark btn-lg btn-block" disabled={!(formik.values.email)} label="AddOwner" />
  </form>
  );
}

export default withRouter(AddOwnerProperty);
