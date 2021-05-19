import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Singup extends Component {
  state = { email: '', name: '', password: '' }

  // Set state value when change happened
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  // Handle Submit
  handleSubmit = async e => {
    e.preventDefault();
    let data = await this.handleSignup()
    if (data && data.user) {
      localStorage.setItem('userId', data.user.id)
      this.props.setUser(data.user)
      this.props.history.push('/home')
      this.setState({ email: '', name: '', password: '' })
    } else {
      alert("Invaid details"); 
    }
  }

  // Get Signup Data
  handleSignup = async() => {
    try {
      let requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(this.state)
      }
      let response = await fetch('http://localhost:3000/users/signup', requestOptions)
      let data = await response.json()
      return data
    } catch(err) {
      alert("Invaid details"); // TypeError: failed to fetch
    }
    
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Register</h3>

        <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" className="form-control" placeholder="Enter Name" value={this.state.name} onChange=
            {this.handleChange}/>
        </div>

        <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" className="form-control" placeholder="Enter email" value={this.state.email} onChange=
            {this.handleChange}/>
        </div>

        <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" className="form-control" placeholder="Enter password"  value={this.state.password} onChange=
            {this.handleChange}/>
        </div>
        <br />
        <button type="submit" className="btn btn-dark btn-lg btn-block">Register</button>
      </form>
    )
  }
}
export default withRouter(Singup);