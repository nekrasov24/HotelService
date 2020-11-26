import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { SetToken } from 'Services/LocalStorage';
import 'Styles/RegisterStyle.css';

function Register() {
    const history = useHistory();
    const [user, setUser] = useState({
        firstname: '',
        lastname: '',
        email: '',
        dateofbirth: '',
        password: '',
        passwordconfirm: '',
    });

    const [formErrors, setformErrors] = useState({
        firstname: '',
        lastname: '',
        email: '',
        dateofbirth: '',
        password: '',
        passwordconfirm: '',
    });
  
    const validate = useCallback( () => {
        if(user.firstname==null) {
            setformErrors((formErrors) => ({ ...formErrors, firstname: 'First Name is required' }));
            return false;
        }

        if(user.lastname==null) {
            setformErrors((formErrors) => ({ ...formErrors, lastname: 'Last Name is required' }));
            return false;
        }
        
        if(user.email==null) {
            setformErrors((formErrors) => ({ ...formErrors, email: 'Email is required' }));
            return false;
        }

        if(user.dateofbirth==null) {
            setformErrors((formErrors) => ({ ...formErrors, dateofbirth: 'Date of Birth is required' }));
            return false;
        }

        if(user.password==null) {
            setformErrors((formErrors) => ({ ...formErrors, password: 'Password is required' }));
            return false;
        }

        if(user.passwordconfirm==null) {
            setformErrors((formErrors) => ({ ...formErrors, passwordconfirm: 'Password is required' }));
            return false;
        }

        if(!user.email.includes('@')) {
            setformErrors((formErrors) => ({ ...formErrors, email: 'Email is incorrect' }));
            return false;
        }

        if(user.password.length >= 4) {            
            setformErrors((formErrors) => ({ ...formErrors, password: 'Password is short' }));
            return false;
        }

        if(user.password !== user.passwordconfirm) {            
            setformErrors((formErrors) => ({ ...formErrors, passwordconfirm: 'Passwords don t match' }));
            return false;
        }
        return true;
    },
    [user],
    );

    const handleChange = useCallback(
        (e) => {
            const { name, value } = e.target;
            setUser((user) => ({ ...user, [name]: value }));
            console.log(user);
        },
        [user],
    );

    const handleSumbit = useCallback(
        (e) => {
            validate();
            e.preventDefault();
            const userData = {
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                dateofbirth: user.dateofbirth,
                password: user.password,
                passwordconfirm: user.passwordconfirm,
            };
            axios
                .post('https://localhost:44344/api/register', userData)
                .then((res) => {
                  SetToken(res);  
                  console.log(res);
                    history.push('/Welcome');
                    
                })
                .catch((err) => console.log(err));
        },
        [user, history, validate],
    );

    return (
        <div className="registername">
            <form className="formregister" onSubmit={handleSumbit}>
                <h3 className="formheaderreg">Register</h3>                
                <input className="inputfirstnamereg"
                    name="firstname"
                    placeholder="Firstname"
                    value={user.firstname}
                    onChange={handleChange}
                />
                {formErrors.firstname && <span>{formErrors.firstname}</span>}
                <br />               
                <input className="inputfirstnamereg"
                    name="lastname"
                    placeholder="Lastname"
                    value={user.lastname}
                    onChange={handleChange}
                />
                {formErrors.lastname && <span>{formErrors.lastname}</span>}
                <br />                
                <input className="inputfirstnamereg"
                name="email" placeholder="Email"
                value={user.email}
                onChange={handleChange}
                />
                {formErrors.email && <span>{formErrors.email}</span>}
                <br />              
                <input className="inputfirstnamereg"
                    type="date"
                    name="dateofbirth"
                    placeholder="Date Of Birth"
                    value={user.dateofbirth}
                    onChange={handleChange}
                />
                {formErrors.dateofbirth && <span>{formErrors.dateofbirth}</span>}
                <br />                
                <input className="inputfirstnamereg"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={user.password}
                    onChange={handleChange}
                />
                {formErrors.password && <span>{formErrors.password}</span>}
                <br />
                <input className="inputfirstnamereg"
                    type="password"
                    name="passwordconfirm"
                    placeholder="Password Confirm"
                    value={user.passwordconfirm}
                    onChange={handleChange}
                />
                {formErrors.passwordconfirm && <span>{formErrors.passwordconfirm}</span>}
                <br />
                <input className="inputfirstnamereg" type="submit" />
            </form>
        </div>
    );
}

export default Register;
