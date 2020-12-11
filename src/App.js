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
import AddRoom from './Components/AddRoom';
import EditRoom from './Components/EditRoom';
import DeleteRoom from './Components/DeleteRoom';
import Draw from './Components/Drawer';

function Show({ children }) {
    const location = useLocation();

    if (location.pathname === '/register' || location.pathname === '/authenticate') {
        return null;
    }
    return children;
}

function App() {
    return (
        <SnackbarProvider maxSnack={3}>
            <Router>
                <Show>
                    <NavigationBar />
                </Show>
                <Switch>
                    <Route path="/homepage" component={HomePage} />
                    <Route path="/profile/:id" component={Profile} />
                    <Route path="/register" component={Register} />
                    <Route path="/authenticate" component={Authenticate} />
                    <Route path="/addroom" component={AddRoom} />
                    <Route path="/editroom" component={EditRoom} />
                    <Route path="/deleteroom" component={DeleteRoom} />
                    <Route path="/" component={Welcome} />
                </Switch>
            </Router>
        </SnackbarProvider>
    );
}

export default App;
