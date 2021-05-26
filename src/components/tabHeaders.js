import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { withRouter } from "react-router-dom";
import "./tabHeaders.css"

import PropertyList from './propertyList'
import UserList from './userList'
import AddProperty from './AddProperty'
import { RouteLayout } from '.././launchComponents/formLayouts/routeLayout'
import LinkLayout from '.././launchComponents/formLayouts/linkLayout'


function TabHeaders(props) {

  const handleLogout = e => {
    e.preventDefault();
    props.setUser({ ...props.formik.values, email: '', password: '' })
    props.history.push("/login");
  }

  return (<Router>
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <LinkLayout path="/users" label="Users" />
              <LinkLayout path="/properties" label="Properties" />
              <LinkLayout path="/addProperties" label="AddProperties" />
            </ul>
          </div> 
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <div className="outer">
        <Switch>
          <RouteLayout path="/users" class={UserList} setUser={props.setUser} formik={props.formik} />
          <RouteLayout path="/properties" class={PropertyList} setUser={props.setUser} formik={props.formik}  />
          <RouteLayout path="/addProperties" class={AddProperty} setUser={props.setUser} formik={props.formik}  />
          <RouteLayout path="/dashboard" class={PropertyList} setUser={props.setUser} formik={props.formik} />
        </Switch>
      </div>
    </div></Router>
  );
}
  
  export default withRouter(TabHeaders);