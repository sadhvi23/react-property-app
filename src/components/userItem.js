import React from "react";

const UserItem = props => {
  const { user } = props;

  return (
    <div className="media-left">
      <br />
    <div><b style={{ textTransform: "capitalize" }}>Name: {user.name}</b></div>
    <div><b>Email: {user.email}</b></div>
      <img src="https://static.vecteezy.com/system/resources/thumbnails/000/643/326/small/vector60-7909-01.jpg" alt={user.name} />
    </div>
  );
};

export default UserItem;