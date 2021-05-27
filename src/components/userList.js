import React, { useState } from "react";
import { useDispatch } from "react-redux";

import UserItem from "./userItem";
import { listUser, deactivateUser } from "../actions/users";
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
      // const response = res.map((user) => ({...user, [user.editMode]: true}))
      setData({ users: res, message: "Request has been processed successfully" });
    })
    .catch(e => {
      console.log(e.message);
      setData({...data, message: e.message})
    });
  }

  // Deactivate button click fire API and show message as a toaster
  const onClick = (user, message) => {
    handleDeactivation(user)
    notify(message)
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

  // Set edit mode as true and key as item id when click on update button
  const handleUpdate = (u) => {
    setData({...data, editMode: true})
    setUser({...user, key: u.id})
  }
  
  return (
    <div >
      <h4 className="title">Users</h4>
      {data.users && data.users.length ? (
        data.users.map((u, index) => (
          <div>
            <UserItem user={u} key={u.id} />
            <button onClick={() => {onClick(u, data.message)}}>Deactivate</button>&nbsp;&nbsp;
            {u && <button onClick={() => { handleUpdate(u)}}>Edit User</button>}
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
