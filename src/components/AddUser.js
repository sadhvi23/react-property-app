import React, { useState } from "react";
import { useFormik } from 'formik';
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Button } from "../launchComponents/formLayouts/buttonLayout"
import { Input } from "../launchComponents/formLayouts/inputLayout"
import { addUser, updateUser, showUser } from "../actions/users";
import notify from "../helpers/notify";
import FormErrors from "../helpers/formErrors"
import validateUserForm from "../helpers/validateUserForm"
import errorHandler from "../helpers/errorHandler"

const AddUser = (props) => {

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      role: "",
      formErrors: {name: "", email: "", role: ""},
      formValid: ""
    }
  });

  const [user, setUser] = useState(formik.values);
  

  // Get a user
  const getUser = (userId) => {
    dispatch(showUser(userId))
    .then(res => { 
      setUser({ 
        ...user, 
        id: res.user.id,
        email: res.user.email,
        name: res.user.name,
        password: res.user.password,
        role: res.role,
        message: "Request has been processed successfully" });
    })
    .catch(e => {
      console.log(e.message);
      setUser({...user, message: e.message})
    });
  }

  if (props.location.pathname === "/panel/updateUser" && user.email === "") {
    getUser(props.location.state.id)
  }
  
  // Save user on form submit
  const saveUser = async (e) => {
    e.preventDefault();
    if (props.location.pathname === "/panel/updateUser") {
      update(props.location.state)
    } else {
      validateUserForm(user, setUser, e.target)
      if (user.formValid) {
        add()
      }
    }
  };

  // Add user
  const add = () => {
    const { name, email, role } = formik.values;
    const randomPassword = Math.random().toString(36).slice(-8);
    if (name) {
      dispatch(addUser(email, randomPassword, name, role))
      .then(data => { 
        errorHandler(data)
        setUser({
          ...formik.values,
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          password: data.user.password,
          role: data.role
        });
        props.history.push("/panel/users")
        setUser({...user, name:'', message: data.user.name + " has been added successfully and new password is " +  randomPassword})
        notify(user.message)
      })
      .catch(e => {
        console.log(e.message);
        notify(e.message)
        setUser({...user, message: ""})
      });
    }
  }

  // Update user
  const update = (userData) => {
    const { name, email, role } = user;
    if (name) {
      dispatch(updateUser(userData.id, email, name, role))
      .then(data => {
        errorHandler(data) 
        setUser({
          ...user,
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          password: data.user.password,
          role: data.role
        });
        localStorage.setItem('userId', data.id)
        props.history.push("/panel/users")
        setUser({...user, name:'', message: data.user.name + " has been updated successfully" })
        notify(user.message)
      })
      .catch(e => {
        console.log(e.message);
        notify(e.message)
        setUser({...user, message: ""})
      });
    }
  }

  return (
    <div className="outer">
      <div className="inner">
        <form onSubmit={saveUser}>
          {props.location.pathname === "/panel/updateUser" ? (<h3>Update User</h3>) : (<h3>Add User</h3>)}

          <Input divClass="form-group" label="Name" type="name" name="name" class="form-control" placeholder=
          "Enter name" defaultValue={user.name} handleChange={formik.handleChange} required={true}/>

          <FormErrors formErrors={user.formErrors} fieldname={"name"}/>

          <Input divClass="form-group" label="Email" type="email" name="email" class="form-control" placeholder=
          "Enter email" defaultValue={user.email} handleChange={formik.handleChange} required={true}/>

          <FormErrors formErrors={user.formErrors} fieldname={"email"}/>

          <label divClass="form-group">
            Role&nbsp;&nbsp;&nbsp; 
            <select name="role" defaultValue={user.role} onChange={formik.handleChange} required>
              <option>select role...</option>
              <option key="1" data-key="1">admin</option>
              <option key="2"data-key="2">user</option>
            </select>
          </label>

          <FormErrors formErrors={user.formErrors} fieldname={"role"}/>

          <br />
          <br />
          {props.location.pathname === "/panel/updateUser" ? (
            <Button type="submit" class="btn btn-dark btn-lg btn-block" disabled={!(user.name)} label="UpdateUser" />
          ) : (
            <Button type="submit" class="btn btn-dark btn-lg btn-block" disabled={!(formik.values.name)} label="AddUser" />
          )}  
      </form>
    </div>
  </div>
  );
}

export default withRouter(AddUser);
