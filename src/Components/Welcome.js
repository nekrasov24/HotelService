import React from 'react';
import {Link} from 'react-router-dom';
import {maindivwelcome} from 'Styles/WelcomeStyle';

function Welcome() {

    return (
        <div className={maindivwelcome}>
            <div>
                <h3>Welcome</h3>
                <br/>
            </div>
            <div className="login-div">
                <Link to="/register">Reg</Link>
            </div>
            <br/>
            <div className="login-div">
                <Link to="/authenticate">Login</Link>
            </div>
        </div>
    )
}
export default Welcome;