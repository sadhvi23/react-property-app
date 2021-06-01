import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { withRouter } from "react-router-dom";

import PropertyList from './propertyList'
import UserList from './userList'
import AddProperty from './AddProperty'
import AddUser from './AddUser'
import { RouteLayout } from '.././launchComponents/formLayouts/routeLayout'
import LinkLayout from '.././launchComponents/formLayouts/linkLayout'
import MyProfile from './myProfile'
import MyProperties from './myProperties'

function Dashboard(props) {

  const intialValue = {
    open: false,
  };

  const [state, setState] = useState(intialValue)

  const handleLogout = e => {
    e.preventDefault();
    props.setUser({ ...props.formik.values, email: '', password: '' })
    props.history.push("/");
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
            { localStorage.currentUserRole === 'super_admin' &&
              <div className="collapse navbar-collapse">
              <LinkLayout path="/panel/users" label="Users" />
              <LinkLayout path="/panel/properties" label="Properties" />
              {/* <LinkLayout path="/panel/addProperty" label="AddProperty" /> */}
              {/* <LinkLayout path="/panel/addUser" label="AddUser" /> */}
              </div>
            } 
            { localStorage.currentUserRole === 'admin' &&
              <div className="collapse navbar-collapse">
                <LinkLayout path="/panel/properties" label="Properties" />
              </div>
            }
            { localStorage.currentUserRole === 'user' &&
              <div className="collapse navbar-collapse">
                <LinkLayout path="/user/properties" label="Properties" />
              </div>
            }
            </ul>
          </div>
          <div>
            <button type="button" className="button" onClick={handleButtonClick}>☰</button>
            { state.open ? (
              <div className="collapse navbar-collapse">
              <ul>
                <LinkLayout path="/myProfile" label="MyProfile" />
                { 
                  localStorage.currentUserRole === 'user' && <LinkLayout path="/user/myProperties" label="MyProperties" />
                }
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
          <RouteLayout path="/panel/users" class={UserList} formik={props.formik} />
          <RouteLayout path="/panel/properties" class={PropertyList} formik={props.formik}  />
          <RouteLayout path="/panel/addProperty" class={AddProperty} formik={props.formik}  />
          <RouteLayout path="/panel/updateProperty" class={AddProperty} formik={props.formik}  />
          <RouteLayout path="/panel/addUser" class={AddUser} formik={props.formik}  />
          <RouteLayout path="/panel/updateUser" class={AddUser} formik={props.formik}  />
          <RouteLayout path="/myProfile" class={MyProfile} formik={props.formik}  />
          <RouteLayout path="/user/properties" class={PropertyList} formik={props.formik}  />
          <RouteLayout path="/user/myProperties" class={MyProperties} formik={props.formik}  />
          <RouteLayout path="/dashboard" class={PropertyList} formik={props.formik} />
        </Switch>
      </div>
    </div></Router>
  );
}
  
  export default withRouter(Dashboard);