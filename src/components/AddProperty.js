import React, { useState } from "react";
import { useFormik } from 'formik';
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Button } from "../launchComponents/formLayouts/buttonLayout"
import { Input } from "../launchComponents/formLayouts/inputLayout"
import { addProperty, updateProperty, showProperty } from "../actions/properties";
import { listUser } from "../actions/users"

const AddProperty = (props) => {

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      is_approved: false,
      is_available: false,
      owner_id: null,
      owner_email: "",
      users: [],
      message: ""
    }
  });

  const [property, setProperty] = useState(formik.values);

  // Get a property
  const getProperty = (propertyId) => {
    dispatch(showProperty(propertyId))
    .then(res => { 
      console.log("----", res)
      setProperty({ 
        ...property, 
        id: res.property.id,
        name: res.property.name,
        is_approved: res.property.is_approved,
        is_available: res.property.is_available,
        owner_id: res.property.owner_id,
        owner_email: res.owner,
        message: "Request has been processed successfully" });
    })
    .catch(e => {
      console.log(e.message);
      setProperty({...property, message: e.message})
    });
  }

  const editMode = () => {
    return (props.location.pathname === "/panel/updateProperty")
  }

  if (editMode() && property.name === "") {
    getProperty(props.location.state.id)
  }

  // Save property on form submit
  const saveProperty = async (e) => {
    e.preventDefault();
    // Update name when edit in form
    if (formik.values.name !== "") { property.name = formik.values.name}
    if (editMode()) {
      update(props.location.state)
    } else {
      add()
    }
  };

  // Handle checkbox input
  const handleOptionChange = (e) => {
    if (e.target.value === "is_approved") {
      property.is_approved = true
    }
    if (e.target.value === "is_available") {
      property.is_available = true
    }    
  }

  // Add Property if edit mode is false
  const add = () => {
    const { name, is_approved, is_available, owner_id } = property;
    console.log("===", property, formik.values)
    if (name) {
      dispatch(addProperty(name, is_approved, is_available, owner_id))
      .then(data => { 
        setProperty({
          ...property,
          id: data.id,
          name: data.name,
          is_approved: data.is_approved,
          is_available: data.is_available
        });
        localStorage.setItem('propertyId', data.id)
        props.history.push("/panel/properties")
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
    const { name, is_approved, is_available, owner_id } = property;
    if (name) {
      dispatch(updateProperty(propertyData.id, name, is_approved, is_available, owner_id))
      .then(data => { 
        setProperty({
          ...property,
          id: data.id,
          name: data.name,
          is_approved: data.is_approved,
          is_available: data.is_available,
          is_active: data.is_active
        });
        localStorage.setItem('propertyId', data.id)
        props.history.push("/panel/properties")
        setProperty({...property, name:'', message: data.name + " has been updated successfully" })
      })
      .catch(e => {
        console.log(e.message);
        setProperty({...property, message: e.message})
      });
    }
  }

  // Fetch users and show it in a drop down
  const getUsers = () => {
    dispatch(listUser())
    .then(res => { 
      setProperty({ ...property, users: res, message: "Request has been processed successfully" });
    })
    .catch(e => {
      console.log(e.message);
      setProperty({...property, message: e.message})
    });
  }

  // Get owner selected value
  const onSelect = (e) => {
    const selectedIndex = e.target.options.selectedIndex;
    console.log(e.target.options[selectedIndex].getAttribute('data-key'));
    property.owner_id = e.target.options[selectedIndex].getAttribute('data-key')
  }

  return (
    <form onSubmit={saveProperty}>
    { editMode() ? (<h3>Update Property</h3>) : (<h3>Add Property</h3>)}

    <Input divClass="form-group" label="Name" type="name" name="name" class="form-control" placeholder=
    "Enter name" defaultValue={property.name} handleChange={formik.handleChange}/>

    { editMode() ? (
      <div>
        <label divClass="form-group">
          Owner&nbsp;&nbsp;&nbsp; 
          <select name="role" value={property.owner_email} onChange={onSelect} onClick={getUsers}>
          <option>select owner...</option>
          {property.users && property.users.length ? (
            property.users.map((u, index) => (
              <option data-key={u.id}>{u.email}</option>
            ))
          ) : 
            null 
          }
          </select>
        </label>
        
        <br /><br />
        <div className="checkbox">
          <label>
            <input type="checkbox" checked={property.is_approved} value="is_approved" onChange={handleOptionChange} />
            &nbsp;&nbsp;IsApproved
          </label>
        </div>
        <br />
        <div className="checkbox">
          <label>
            <input type="checkbox" checked={property.is_available} value="is_available" onChange={handleOptionChange} />
            &nbsp;&nbsp;IsAvailable
          </label>
        </div>
        <br />
        <Button type="submit" class="btn btn-dark btn-lg btn-block" disabled={!(property.name)} label="UpdateProperty" />
      </div>
    ) : (
      <div>
        <label divClass="form-group">
          Owner&nbsp;&nbsp;&nbsp; 
          <select name="role" onChange={onSelect} onClick={getUsers}>
          <option>select owner...</option>
          {property.users && property.users.length ? (
            property.users.map((u, index) => (
              <option data-key={u.id}>{u.email}</option>
            ))
          ) : 
            null 
          }
          </select>
        </label>
        
        <br /><br />
        <div className="radio">
          <label>
            <input type="checkbox" value="is_approved" onChange={handleOptionChange} />
            &nbsp;&nbsp;IsApproved
          </label>
        </div>
        <br />
        <div className="radio">
          <label>
            <input type="checkbox" value="is_available" onChange={handleOptionChange} />
            &nbsp;&nbsp;IsAvailable
          </label>
        </div>
        <br />
        <Button type="submit" class="btn btn-dark btn-lg btn-block" disabled={!(formik.values.name)} label="AddProperty" />
      </div>  
    )}
    </form>
  );
};

export default withRouter(AddProperty);
