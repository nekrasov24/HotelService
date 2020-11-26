import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import 'Styles/WelcomeStyle.css';

function HomePage() {
    
    //const history = useHistory();
    const Logout = useCallback(
        () => {
            localStorage.removeItem('token');
            
            
        },
        []
    )
    return (
        <div className="maindivwelcome">
                <h3 className="welcomeheader">Home</h3>
                <div className="welocomeAuthBox">
                    <div className="welcomereg">
                        <Link onClick={Logout} className="welcomelink" to="/">
                            Logout
                        </Link>
                    </div>


                </div>
        </div>
    );

}

export default HomePage;