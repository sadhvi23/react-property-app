import React, { useState } from "react";
import { useDispatch } from "react-redux";

import UserItem from "./userItem";
import { showUser } from "../actions/users";

const MyProfile = () => {

  const dispatch = useDispatch();

  const intialValues = {
    id: "",
    email: "",
    name: "",
    password: "",
    role: "",
    message: "",
  }
  const [data, setData] = useState(intialValues);

  // Show User API
  if (data.name === "") {
    dispatch(showUser(localStorage.userId))
    .then(res => { 
      setData({ 
        ...data, 
        id: res.user.id,
        email: res.user.email,
        name: res.user.name,
        password: res.user.password,
        role: res.role,
        message: "Request has been processed successfully" });
    })
    .catch(e => {
      console.log(e.message);
      setData({...data, message: e.message})
    });
  }
  
  return (
    <div >
      <h4 className="title">User</h4>
        <div>
          <UserItem user={data} key={data.id} />
          <br /><br />
        </div>
    </div>
  );
};

export default MyProfile;
