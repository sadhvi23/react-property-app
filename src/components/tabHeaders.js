import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { withRouter } from "react-router-dom";
import "./tabHeaders.css"

import PropertyList from './propertyList'
import UserList from './userList'
import AddProperty from './AddProperty'
import AddUser from './AddUser'
import { RouteLayout } from '.././launchComponents/formLayouts/routeLayout'
import LinkLayout from '.././launchComponents/formLayouts/linkLayout'
import MyProfile from './myProfile'
import MyProperties from './myProperties'

function TabHeaders(props) {

  const intialValue = {
    open: false,
  };

  const [state, setState] = useState(intialValue)

  const handleLogout = e => {
    e.preventDefault();
    props.setUser({ ...props.formik.values, email: '', password: '' })
    props.history.push("/login");
  }

  const handleButtonClick = () => {
    setState((state) => {
      return {
        open: !state.open,
      };
    });
  };

  return (<Router>
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
            { localStorage.currentUserRole === 'super_admin' ? (
              <div className="collapse navbar-collapse">
              <LinkLayout path="/users" label="Users" />
              <LinkLayout path="/properties" label="Properties" />
              <LinkLayout path="/addProperty" label="AddProperty" />
              <LinkLayout path="/addUser" label="AddUser" />
              </div>
            ) : (
              <div className="collapse navbar-collapse">
                <LinkLayout path="/properties" label="Properties" />
              </div>
            )}
            </ul>
          </div>
          <div>
            <button type="button" className="button" onClick={handleButtonClick}>☰</button>
            { state.open ? (
              <div className="collapse navbar-collapse">
              <ul>
                <LinkLayout path="/myProfile" label="MyProfile" />
                <LinkLayout path="/myProperties" label="MyProperties" />
              </ul>
            </div>
            ) : (
              null
            )}
          </div>

          <button onClick={handleLogout}><b>Logout</b></button>
        </div>
      </nav>

      <div className="outer">
        <Switch>
          <RouteLayout path="/users" class={UserList} formik={props.formik} />
          <RouteLayout path="/properties" class={PropertyList} formik={props.formik}  />
          <RouteLayout path="/addProperty" class={AddProperty} formik={props.formik}  />
          <RouteLayout path="/addUser" class={AddUser} formik={props.formik}  />
          <RouteLayout path="/myProfile" class={MyProfile} formik={props.formik}  />
          <RouteLayout path="/myProperties" class={MyProperties} formik={props.formik}  />
          <RouteLayout path="/dashboard" class={UserList} formik={props.formik} />
        </Switch>
      </div>
    </div></Router>
  );
}
  
  export default withRouter(TabHeaders);