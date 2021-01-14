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
import RoomManagement from './Components/RoomManagement';
import EditProfile from './Components/EditProfile';
import UsersBooks from 'Components/UsersBooks';

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
                    <Route path="/roomManagement" component={RoomManagement} />
                    <Route path="/profile" component={Profile} />
                    <Route path="/edit-profile/:userId" component={EditProfile} />
                    <Route path="/register" component={Register} />
                    <Route path="/authenticate" component={Authenticate} />
                    <Route path="/addroom" component={AddRoom} />
                    <Route path="/edit-room/:roomId" component={EditRoom} />
                    <Route path="/delete-room/:roomId" component={DeleteRoom} />
                    <Route path="/usersbooks" component={UsersBooks} />
                    <Route path="/" component={Welcome} />
                </Switch>
            </Router>
        </SnackbarProvider>
    );
}

export default App;
