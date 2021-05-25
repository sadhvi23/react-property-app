import React from 'react';
import { withRouter } from "react-router-dom";

const Home = (props) => {
  const handleLogout = e => {
    e.preventDefault();
    props.history.push("/login");
  }
  return (
    <div>
      <h1>Welcome {props.formik.values.name}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default withRouter(Home);