import React, {useState, useCallback} from 'react';
import axios from "axios";

function Register() {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    dateofbirth: "",
    password: "",
    passwordconfirm: ""
  });

  const handleChange = useCallback( e => {
    const {name, value} = e.target;
    setUser(user => ({...user, [name]: value}));
    console.log(user);
  },[user])

  const handleSumbit = useCallback( e => {
    e.preventDefault();
    const userData = {
      firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    dateofbirth: user.dateofbirth,
    password: user.password,
    passwordconfirm: user.passwordconfirm
    };
    axios.post("https://localhost:44344/api/register", userData)
    .then(res => console.log(res))
    .catch(err => console.log(err));
  },[user])
  
    return (
      <form onSubmit={handleSumbit}>
        <h1>Sign Up For An Account</h1>
        <label>First Name</label>
        <input name='firstname' placeholder='Firstname' value={user.firstname} onChange={handleChange} /><br/>
        <label>Last Name</label>
        <input name='lastname' placeholder='Lastname' value={user.lastname} onChange={handleChange} /><br/>
        <label>Email</label>
        <input name='email' placeholder='Email' value={user.email} onChange={handleChange} /><br/>
        <label>Date Of Birth</label>
        <input type='date' name='dateofbirth' placeholder='Date Of Birth' value={user.dateofbirth} onChange={handleChange} /><br/>
        <label>Password</label>
        <input type='password' name='password' placeholder='Password' value={user.password} onChange={handleChange} /><br/>
        <label>Password Confirm</label>
        <input type='password' name='passwordconfirm' placeholder='Password Confirm' value={user.passwordconfirm} onChange={handleChange} /><br/>
        <input type='submit'/>
      </form>
    )
}

export default Register;