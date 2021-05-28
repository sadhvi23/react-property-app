import React, { useState } from "react";
import { useFormik } from 'formik';
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Button } from "../launchComponents/formLayouts/buttonLayout"
import { Input } from "../launchComponents/formLayouts/inputLayout"
import { addUser, updateUser } from "../actions/users";
import notify from "../helpers/notify";

const AddUser = (props) => {

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      role: ""
    },
    onSubmit: values => {},
  });

  const [user, setUser] = useState(formik.values);

  // Save user on form submit
  const saveUser = async (e) => {
    e.preventDefault();
    const { editMode, userData} = props
    if (editMode) {
      update(userData)
    } else {
      add()
    }
  };

  // Add user if edit mode is false
  const add = () => {
    const { name, email, role } = formik.values;
    const randomPassword = Math.random().toString(36).slice(-8);
    if (name) {
      dispatch(addUser(email, randomPassword, name, role))
      .then(data => { 
        setUser({
          ...formik.values,
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          password: data.user.password,
          role: data.role
        });
        localStorage.setItem('userId', data.id)
        props.history.push("/users")
        setUser({...user, name:'', message: data.user.name + " has been added successfully and new password is " +  randomPassword})
      })
      .catch(e => {
        console.log(e.message);
        setUser({...user, message: e.message})
      });
    }
  }

  // Update user if edit mode is true
  const update = (userData) => {
    const { name, email, role } = formik.values;
    if (name) {
      dispatch(updateUser(userData.id, email, name, role))
      .then(data => { 
        setUser({
          ...formik.values,
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          password: data.user.password,
          role: data.role
        });
        localStorage.setItem('userId', data.id)
        props.history.push("/users")
        setUser({...user, name:'', message: data.user.name + " has been updated successfully" })
      })
      .catch(e => {
        console.log(e.message);
        setUser({...user, message: e.message})
      });
    }
  }

  return (
    <form onSubmit={saveUser} onClick={notify(user.message)}>
      {props.editMode ? (<h3>Update User</h3>) : (<h3>Add User</h3>)}

      <Input divClass="form-group" label="Name" type="name" name="name" class="form-control" placeholder=
      "Enter name" value={formik.values.name} handleChange={formik.handleChange}/>

      <Input divClass="form-group" label="Email" type="email" name="email" class="form-control" placeholder=
      "Enter email" value={formik.values.email} handleChange={formik.handleChange}/>

      <label divClass="form-group">
        Role&nbsp;&nbsp;&nbsp; 
        <select name="role" value={formik.values.role} onChange={formik.handleChange}>
          <option>admin</option>
          <option>user</option>
        </select>
      </label>
      <br />
      <br />
      {props.editMode ? (
        <Button type="submit" class="btn btn-dark btn-lg btn-block" disabled={!(formik.values.name)} label="UpdateUser" />
      ) : (
        <Button type="submit" class="btn btn-dark btn-lg btn-block" disabled={!(formik.values.name)} label="AddUser" />
      )}  
  </form>
  );
}

AddUser.defaultProps = {
  editMode: false,    // false: Create mode, true: Edit mode
}

export default withRouter(AddUser);
