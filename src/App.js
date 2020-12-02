import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Register from './Components/Register';
import Authenticate from './Components/Authenticate';
import Welcome from './Components/Welcome';
import HomePage from './Components/HomePage';
import Profile from './Components/Profile';
import { SnackbarProvider } from 'notistack';

function App() {
    return (
        <SnackbarProvider maxSnack={3}>
        <Router>
            <div>
                <Switch>
                    <Route path="/homepage" component={HomePage} />
                    <Route path="/profile/:id" component={Profile} />
                    <Route path="/register" component={Register} />
                    <Route path="/authenticate" component={Authenticate} />
                    <Route path="/" component={Welcome} />
                </Switch>
            </div>
        </Router>
        </SnackbarProvider>
    );
}

export default App;
