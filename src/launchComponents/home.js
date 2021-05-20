import React from 'react';
import { withRouter } from "react-router-dom";

const Home = (props) => {
  const handleLogout = e => {
    e.preventDefault();
    props.setUser({ email: '', password: '' })
    props.history.push("/login");
  }
  return (
    <div>
      <h1>Welcome {props.user.name}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default withRouter(Home);