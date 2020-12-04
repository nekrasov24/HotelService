import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Register from './Components/Register';
import Authenticate from './Components/Authenticate';
import Welcome from './Components/Welcome';
import HomePage from './Components/HomePage';
import Profile from './Components/Profile';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import NavigationBar from './Components/NavigationBar';
import { useLocation } from 'react-router-dom';

function Show({ children }) {
    return { children };
}

function App() {
    const location = useLocation();

    return (
        <SnackbarProvider maxSnack={3}>
            <Router>
                {(location.pathname === '/register' || location.pathname === '/authenticate') && (
                    <NavigationBar />
                )}
                <Switch>
                    <Route path="/homepage" component={HomePage} />
                    <Route path="/profile/:id" component={Profile} />
                    <Route path="/register" component={Register} />
                    <Route path="/authenticate" component={Authenticate} />
                    <Route path="/" component={Welcome} />
                </Switch>
            </Router>
        </SnackbarProvider>
    );
}

export default App;
