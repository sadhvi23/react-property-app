import React from 'react';
import { withRouter } from "react-router-dom";

class Home extends React.Component {
  handleLogout = e => {
    e.preventDefault();
    this.props.setUser(null);
    this.props.history.push("/login");
  }

  render() {
    return (
      <div>
        <h1>Welcome {this.props.user.name}</h1>
        <button onClick={this.handleLogout}>Logout</button>
      </div>
    )
  }
}

export default withRouter(Home);