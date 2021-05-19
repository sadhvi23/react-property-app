import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Login extends Component {
  state = { email: '', password: '' }

  // Set state value when change happened
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  // Handle Submit
  handleSubmit = async e => {
    e.preventDefault();
    let data = await this.handleLogin()
    if (data && data.user) {
      localStorage.setItem('userId', data.user.id)
      this.props.setUser(data.user)
      this.props.history.push('/home')
      this.setState({ email: '', password: '' })
    } else {
      alert("Invaid Crdentials"); 
    }  
  }

  // Get login Data
  handleLogin = async() => {
    try {
      let requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(this.state),
        // mode: 'no-cors',
        json: true
      }
      let response = await fetch('http://localhost:3000/users/login', requestOptions)
      let data = await response.json()
      console.log("Response", data)
      return await data
    } catch(err) {
      alert("Invaid Crdentials"); // TypeError: failed to fetch
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Log in</h3>

        <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" className="form-control" placeholder="Enter email" value={this.state.email} onChange=
            {this.handleChange}/>
        </div>

        <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" className="form-control" placeholder="Enter password" value={this.state.password} onChange=
          {this.handleChange} />
        </div>
        <br />
        <button type="submit" className="btn btn-dark btn-lg btn-block">Sign in</button>
      </form>
    );
  }

}
export default withRouter(Login);