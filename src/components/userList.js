import React, { useState } from "react";
import { useDispatch } from "react-redux";

import UserItem from "./userItem";
import { listUser, deactivateUser, deleteUser } from "../actions/users";
import notify from "../helpers/notify";
import AddUser from "./AddUser"

const UserList = () => {

  const dispatch = useDispatch();

  const intialValues = {
    users: [],
    message: "",
    editMode: false
  }
  const [data, setData] = useState(intialValues);
  const [user, setUser] = useState({key: 0});

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

  // Set edit mode as true and key as item id when click on update button
  const handleUpdate = (u) => {
    setData({...data, editMode: true})
    setUser({...user, key: u.id})
  }

  const isButtonDisable = () => {
    if (localStorage.currentUserRole === 'super_admin') {
      return false
    } else {
      return true
    }
  }
  
  return (
    <div >
      <h4 className="title">Users</h4>
      {data.users && data.users.length ? (
        data.users.map((u, index) => (
          <div>
            <UserItem user={u} key={u.id} />
            <button onClick={() => {onClickDeactivate(u)}} disabled={isButtonDisable()}>Inactive</button>&nbsp;
            <button onClick={() => {onClickDelete(u)}} disabled={isButtonDisable()}>Delete</button>&nbsp;
            {u && <button onClick={() => { handleUpdate(u)}} disabled={isButtonDisable()}>Edit</button>}
            {user.key === u.id && <AddUser editMode={data.editMode} userData={u} />}
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
    </div>
  );
};

export default UserList;
