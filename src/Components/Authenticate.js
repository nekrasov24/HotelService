import React from 'react'

class Authenticate extends Component {
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
          <label>Email</label>
          <input
            name='email'
            placeholder='Email'
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
          <input type='submit'/>
        </form>
      )
    }
  }
  
  
  export default Authenticate;