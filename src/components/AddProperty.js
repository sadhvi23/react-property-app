import React, { useState } from "react";
import { useFormik } from 'formik';
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Button } from "../launchComponents/formLayouts/buttonLayout"
import { Input } from "../launchComponents/formLayouts/inputLayout"
import { addProperty, updateProperty } from "../actions/properties";

const AddProperty = (props) => {

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      is_approved: false,
      is_available: false,
      is_active: false,
      message: ""
    },
    onSubmit: values => {},
  });

  const [property, setProperty] = useState(formik.values);

  // Save property on form submit
  const saveProperty = async (e) => {
    e.preventDefault();
    const { editMode, propertyData} = props
    if (editMode) {
      update(propertyData)
    } else {
      add()
    }
  };

  // Add Property if edit mode is false
  const add = () => {
    const { name, is_approved, is_available } = formik.values;
    if (name) {
      dispatch(addProperty(name, is_approved, is_available))
      .then(data => { 
        setProperty({
          ...formik.values,
          id: data.id,
          name: data.name,
          is_approved: data.is_approved,
          is_available: data.is_available
        });
        localStorage.setItem('propertyId', data.id)
        props.history.push("/properties")
        setProperty({...property, name:'', message: data.name + " has been added successfully" })
      })
      .catch(e => {
        console.log(e.message);
        setProperty({...property, message: e.message})
      });
    }
  }

  // Update property if edit mode is true
  const update = (propertyData) => {
    const { name, is_approved, is_available } = formik.values;
    if (name) {
      dispatch(updateProperty(propertyData.id, name, is_approved, is_available))
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
        setProperty({...property, name:'', message: data.name + " has been updated successfully" })
      })
      .catch(e => {
        console.log(e.message);
        setProperty({...property, message: e.message})
      });
    }
  }

  return (
    <form onSubmit={saveProperty}>
    {props.editMode ? (<h3>Update Property</h3>) : (<h3>Add Property</h3>)}

    <Input divClass="form-group" label="Name" type="name" name="name" class="form-control" placeholder=
    "Enter name" value={formik.values.name} handleChange={formik.handleChange}/>

    <label name="is_approved" value={formik.values.is_approved}>IsApproved</label>
    <Input divClass="form-group" label="true" type="radio" name="is_approved" handleChange={formik.handleChange} value={formik.values.is_approved} />
    <Input divClass="form-group" label="false" type="radio" name="is_approved" handleChange={formik.handleChange} value={formik.values.is_approved} />
    <br />

    <label>IsAvailable</label>
    <Input divClass="form-group" label="true" type="radio" name="is_available" handleChange={formik.handleChange} value={formik.values.is_available} />
    <Input divClass="form-group" label="false" type="radio" name="is_available" handleChange={formik.handleChange} value={formik.values.is_available} />   
    <br />

    {props.editMode ? (
      <Button type="submit" class="btn btn-dark btn-lg btn-block" disabled={!(formik.values.name)} label="UpdateProperty" />
    ) : (
      <Button type="submit" class="btn btn-dark btn-lg btn-block" disabled={!(formik.values.name)} label="AddProperty" />
    )}
    </form>
  );
}

AddProperty.defaultProps = {
  editMode: false,    // false: Create mode, true: Edit mode
}

export default withRouter(AddProperty);
