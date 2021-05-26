import React, { useState } from "react";
import { useFormik } from 'formik';
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Button } from "../launchComponents/formLayouts/buttonLayout"
import { Input } from "../launchComponents/formLayouts/inputLayout"
import { addProperty } from "../actions/properties";

const AddProperty = (props) => {

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      is_approved: false,
      is_available: false,
      is_active: false
    },
    onSubmit: values => {},
  });

  const [property, setProperty] = useState(formik.values);

  const saveProperty = async (e) => {
    e.preventDefault();
    const { name, is_approved, is_available, is_active } = formik.values;
    if (name) {
      dispatch(addProperty(name, is_approved, is_available, is_active))
      .then(data => { 
        setProperty({
          ...props.formik.values,
          id: data.id,
          name: data.name,
          is_approved: data.is_approved,
          is_available: data.is_available,
          is_active: data.is_active
        });
        localStorage.setItem('propertyId', data.id)
        props.history.push("/properties")
        setProperty({...props.formik.values, name:'', message: "Request has been processed successfully" })
      })
      .catch(e => {
        console.log(e.message);
        setProperty({...props.formik.values, message: e.message})
      });
    }
  };

  return (
    <form onSubmit={saveProperty}>
    <h3>Add Property</h3>

    <Input divClass="form-group" label="Name" type="name" name="name" class="form-control" placeholder=
    "Enter name" value={formik.values.name} handleChange={formik.handleChange}/>

    <label>IsApproved</label>
    <Input divClass="form-group" label="true" type="radio" name="is_approved" handleChange={formik.handleChange} value={formik.values.is_approved} />
    <Input divClass="form-group" label="false" type="radio" name="is_approved" handleChange={formik.handleChange} value={formik.values.is_approved} />
    <br />

    <label>IsAvailable</label>
    <Input divClass="form-group" label="true" type="radio" name="is_available" handleChange={formik.handleChange} value={formik.values.is_available} />
    <Input divClass="form-group" label="false" type="radio" name="is_available" handleChange={formik.handleChange} value={formik.values.is_available} />   
    <br />

    <label>IsActive</label>
    <Input divClass="form-group" label="true" type="radio" name="is_active" handleChange={formik.handleChange} value={formik.values.is_active} />
    <Input divClass="form-group" label="false" type="radio" name="is_active" handleChange={formik.handleChange} value={formik.values.is_active} />   
    <br />

    <Button type="submit" class="btn btn-dark btn-lg btn-block" disabled={!(formik.values.name)} label="AddProperty" />
  </form>
  );
}

export default withRouter(AddProperty);
