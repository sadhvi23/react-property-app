import React, { useState } from "react";
import { useFormik } from 'formik';
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Button } from "../launchComponents/formLayouts/buttonLayout"
import { Input } from "../launchComponents/formLayouts/inputLayout"
import { addUser, updateUser, showUser } from "../actions/users";
import notify from "../helpers/notify";

const AddUser = (props) => {

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      role: ""
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
      add()
    }
    notify(user.message)
  };

  // Add user
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
        props.history.push("/panel/users")
        setUser({...user, name:'', message: data.user.name + " has been added successfully and new password is " +  randomPassword})
      })
      .catch(e => {
        console.log(e.message);
        setUser({...user, message: e.message})
      });
    }
  }

  // Update user
  const update = (userData) => {
    const { name, email, role } = user;
    if (name) {
      dispatch(updateUser(userData.id, email, name, role))
      .then(data => { 
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
      })
      .catch(e => {
        console.log(e.message);
        setUser({...user, message: e.message})
      });
    }
  }

  return (
    <form onSubmit={saveUser}>
      {props.location.pathname === "/panel/updateUser" ? (<h3>Update User</h3>) : (<h3>Add User</h3>)}

      <Input divClass="form-group" label="Name" type="name" name="name" class="form-control" placeholder=
      "Enter name" defaultValue={user.name} handleChange={formik.handleChange}/>

      <Input divClass="form-group" label="Email" type="email" name="email" class="form-control" placeholder=
      "Enter email" defaultValue={user.email} handleChange={formik.handleChange}/>

      <label divClass="form-group">
        Role&nbsp;&nbsp;&nbsp; 
        <select name="role" defaultValue={user.role} onChange={formik.handleChange}>
          <option>select role...</option>
          <option key="1" data-key="1">admin</option>
          <option key="2"data-key="2">user</option>
        </select>
      </label>
      <br />
      <br />
      {props.location.pathname === "/panel/updateUser" ? (
        <Button type="submit" class="btn btn-dark btn-lg btn-block" disabled={!(user.name)} label="UpdateUser" />
      ) : (
        <Button type="submit" class="btn btn-dark btn-lg btn-block" disabled={!(formik.values.name)} label="AddUser" />
      )}  
  </form>
  );
}

export default withRouter(AddUser);
