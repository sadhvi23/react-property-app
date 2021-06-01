import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from 'react-router-dom';

import UserItem from "./userItem";
import { listUser, deactivateUser, deleteUser } from "../actions/users";
import notify from "../helpers/notify";

const UserList = (props) => {

  const dispatch = useDispatch();

  const intialValues = {
    users: [],
    message: "",
    editMode: false
  }
  const [data, setData] = useState(intialValues);

  // List User API
  if (data.users && data.users.length === 0) {
    dispatch(listUser())
    .then(res => { 
      setData({ users: res, message: "Request has been processed successfully" });
    })
    .catch(e => {
      console.log(e.message);
      setData({...data, message: e.message})
    });
  }

  // Deactivate button click fire API and show message as a toaster
  const onClickDeactivate = (user) => {
    handleDeactivation(user)
    notify(data.message)
  }

  // Delete button click fire API and show message as a toaster
  const onClickDelete = (user) => {
    handleDelete(user)
    notify(data.message)
    // To refresh component
    window.location.reload(false);
  }

  // Deactivate user API
  const handleDeactivation = (user) => {
    dispatch(deactivateUser(user.id))
    .then(res => { 
      setData({ ...data, message: user.name + " has been deactivated successfully" });
    })
    .catch(e => {
      console.log(e.message);
      setData({...data, message: e.message})
    });
  }

   // Delete user API
   const handleDelete = (user) => {
    dispatch(deleteUser(user.id))
    .then(res => { 
      setData({ ...data, message: user.name + " has been deleted successfully" });
    })
    .catch(e => {
      console.log(e.message);
      setData({...data, message: e.message})
    });
  }

  const isButtonDisable = () => {
    return !(localStorage.currentUserRole === 'super_admin')
  }

  const onClickAddUser = () => {
    props.history.push("/panel/addUser")
  }

  const onClickUpdateUser = (u) => {
    props.history.push("/panel/updateUser", u)
  }
  
  return (
    <div className="outer">
      <h4 className="title">Users</h4>
      {data.users && data.users.length ? (
        data.users.map((u, index) => (
          <div>
            <UserItem user={u} key={u.id} />
            <button onClick={() => {onClickDeactivate(u)}} disabled={isButtonDisable()}>Deactivate</button>&nbsp;
            <button onClick={() => {onClickDelete(u)}} disabled={isButtonDisable()}>Delete</button>&nbsp;
            {u && <button onClick={() => onClickUpdateUser(u)} disabled={isButtonDisable()}>Edit</button>}
            <br /><br />
          </div>
        ))
      ) : (
        <div >
          <span>
            No users found!
          </span>
        </div>
      )}
      {!isButtonDisable() &&
      <button children = "Add new user" onClick={onClickAddUser} />}
    </div>
  );
};

export default withRouter(UserList);
