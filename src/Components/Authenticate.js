import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { SetToken } from 'Services/LocalStorage';
import { useHistory } from 'react-router-dom';
import 'Styles/AuthenticateStyle.css';

function Authenticate() {
    const history = useHistory();
    const [loginUser, setloginUser] = useState({
        firstname: '',
        email: '',
        password: '',
    });

    const [formErrors, setformErrors] = useState({
        firstname: '',
        email: '',
        password: '',
        err:'',
    });

    const validate = useCallback(() => {
        if (!loginUser.firstname) {
            setformErrors((formErrors) => ({ ...formErrors, firstname: 'First Name is required' }));
            return false;
        }

        if (!loginUser.email) {
            setformErrors((formErrors) => ({ ...formErrors, email: 'Email is required' }));
            return false;
        }

        if (!loginUser.password) {
            setformErrors((formErrors) => ({ ...formErrors, password: 'Password is required' }));
            return false;
        }

        if (!loginUser.email.includes('@')) {
            setformErrors((formErrors) => ({ ...formErrors, email: 'Email is incorrect' }));
            return false;
        }

        if (loginUser.password.length < 4) {
            setformErrors((formErrors) => ({ ...formErrors, password: 'Password is short' }));
            return false;
        }


        

        return true;
    }, [loginUser]);

    const handleChange = useCallback(
        (e) => {
            const { name, value } = e.target;
            setloginUser((currentloginUser) => ({ ...currentloginUser, [name]: value }));
            console.log(loginUser);
        },
        [loginUser],
    );

    const handleSumbit = useCallback(
        (e) => {
            validate();
            e.preventDefault();
            const userData = {
                firstname: loginUser.firstname,
                email: loginUser.email,
                password: loginUser.password,
            };
            axios
                .post('https://localhost:44344/api/authenticate', userData)
                .then((res) => {
                    SetToken(res.data);
                    console.log(res.data);
                    history.push('/HomePage');
                })
                .catch((err) => setformErrors((formErrors) => ({ ...formErrors,  err: 'ghghgggg' })));
                
        },
        [loginUser, history, validate],
    );

    return (
        <div className="authenticatename">
            <form className="formauthenticate" onSubmit={handleSumbit}>
                <h3 className="formheaderauth">Login</h3>
                <input
                    className="inputfirstnameauth"
                    name="firstname"
                    placeholder="Firstname"
                    value={loginUser.firstname}
                    onChange={handleChange}
                />
                {formErrors.firstname && <span>{formErrors.firstname}</span>}
                <br />
                <input
                    className="inputfirstnameauth"
                    name="email"
                    placeholder="Email"
                    value={loginUser.email}
                    onChange={handleChange}
                />
                {formErrors.email && <span>{formErrors.email}</span>}
                <br />
                <input
                    className="inputfirstnameauth"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={loginUser.password}
                    onChange={handleChange}
                />
                {formErrors.password && <span>{formErrors.password}</span>}
                <br />
                <input className="inputfirstnameauth" type="submit" />
                {formErrors.err && <span>{formErrors.err}</span>}
            </form>
        </div>
    );
}

export default Authenticate;
