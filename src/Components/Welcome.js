import { Link } from 'react-router-dom';
import 'Styles/WelcomeStyle.css';

function Welcome() {


    return (
        <div className="maindivwelcome">
                <h3 className="welcomeheader">Welcome</h3>
                <div className="welocomeAuthBox">
                    <div className="welcomereg">
                        <Link className="welcomelink" to="/register">
                            Register
                        </Link>
                    </div>
                    <div className="welcomelogin">
                        <Link className="welcomelink" to="/authenticate">
                            Login
                        </Link>
                    </div>
                </div>
        </div>
    );
}
export default Welcome;
