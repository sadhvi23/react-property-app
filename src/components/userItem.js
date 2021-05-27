import React from "react";

const UserItem = props => {
  const { user } = props;

  return (
    <div className="media-left">
      <br />
    <div><b style={{ textTransform: "capitalize" }}>{user.name}</b></div>
    <div><b>{user.email}</b></div>
    <div><b>{user.role}</b></div>
      <img src="https://i.vippng.com/png/small/159-1591244_user-icon-blue-jpg.png" alt={user.name} />
    </div>
  );
};

export default UserItem;