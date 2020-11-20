
import React, {Component} from 'react';


class Register extends Component {
  state = {
    username: "",
    password: "",
    avatar: "",
    bio: ""
  }




  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Sign Up For An Account</h1>

        <label>First Name</label>
        <input
          name='firstname'
          placeholder='Firstname'
          value={this.state.username}
          onChange={this.handleChange}
          /><br/>
        <label>Last Name</label>
        <input
          name='lastname'
          placeholder='Lastname'
          value={this.state.username}
          onChange={this.handleChange}
          /><br/>
        <label>Email</label>
        <input
          name='email'
          placeholder='Email'
          value={this.state.username}
          onChange={this.handleChange}
          /><br/>
        <label>Date Of Birth</label>
        <input
          type='date'
          name='dateOfBirth'
          placeholder='Date Of Birth'
          value={this.state.username}
          onChange={this.handleChange}
          /><br/>
        <label>Password</label>
        <input
          type='password'
          name='password'
          placeholder='Password'
          value={this.state.password}
          onChange={this.handleChange}
          /><br/>
        <label>Password Confirm</label>
        <input
          type='password'
          name='Passwordconfirm'
          placeholder='Password Confirm'
          value={this.state.password}
          onChange={this.handleChange}
          /><br/>
        <input type='submit'/>
      </form>
    )
  }
}


export default Register;