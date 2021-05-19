import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from './login'
import Signup from './signup'
import Home from './home'

class Launch extends React.Component {
  state = {user: null}
  setUser = user => {
    this.setState({user: user})
  }

  render() {
    return (<Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={"/sign-in"}>AjackusProperty</Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-in"}>Sign in</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
  
        <div className="outer">
          <div className="inner">
            <Switch>
              {/* <Route path="/sign-up" component={Signup} /> */}
              <Route path="/sign-up" render={() => {
                return(
                  <div>
                    <Signup user={this.state.user} setUser={this.setUser}/>
                  </div>
                )
              }} />
              {this.state.user == null ? (
                <Route path="/sign-in" render={() => {
                  return(
                    <div>
                      <Login user={this.state.user} setUser={this.setUser}/>
                    </div>
                  )
                }} />
              ) : (
                <Route path="/home" render={() => {
                  return(
                    <div>
                      <Home user={this.state.user} setUser={this.setUser}/>
                    </div>
                  )
                }} />
              )}
              <Route path="/" render={() => {
                return(
                  <div>
                    <Login user={this.state.user} setUser={this.setUser}/>
                  </div>
                )
              }} />
            </Switch>
          </div>
        </div>
      </div></Router>
    );
  }
}

export default Launch;