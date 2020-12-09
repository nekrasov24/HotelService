import React, { useCallback, useContext, useMemo } from 'react';
import 'Styles/WelcomeStyle.css';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Box, Container, Toolbar, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import AuthContext from '../Contexts/AuthContext/AuthContext';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import DeleteRoom from './DeleteRoom';
import AddRoom from './AddRoom';
import EditRoom from './EditRoom';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: theme.spacing(1),
    },
    title: {
        flexGrow: 1,
    },
}));

function LoggedInNavbar({ email, logoutHandler, profileHandler }) {
    const classes = useStyles();

    return (
        <>
            <Typography className={classes.title}>Hello</Typography>
            <Box mr={3}>
                <span>{email}</span>
                <Button
                    variant="outlined"
                    onClick={logoutHandler}
                    color="inherit"
                    className={classes.menuButton}
                    href="/"
                >
                    Log Out
                </Button>
                <Button
                    variant="outlined"
                    onClick={profileHandler}
                    color="inherit"
                    className={classes.menuButton}
                    href="/profile"
                >
                    Profile
                </Button>
            </Box>
        </>
    );
}

function AdminLoggedInNavbar({ email, logoutHandler, profileHandler }) {
    const classes = useStyles();

    return (
        <>
            <Typography className={classes.title}>Hello</Typography>
            <Box mr={3}>
                <span>{email}</span>
                <PopupState variant="popover" popupId="demo-popup-menu">
                    {(popupState) => (
                        <React.Fragment>
                            <Button
                                variant="outlined"
                                color="inherit"
                                className={classes.menuButton}
                                {...bindTrigger(popupState)}
                            >
                                Administration
                            </Button>
                            <Menu {...bindMenu(popupState)}>
                                <MenuItem onClick={AddRoom}>Add Room</MenuItem>
                                <MenuItem onClick={EditRoom}>Edit Room</MenuItem>
                                <MenuItem onClick={DeleteRoom}>Delite Room</MenuItem>
                            </Menu>
                        </React.Fragment>
                    )}
                </PopupState>
                <Button
                    variant="outlined"
                    onClick={logoutHandler}
                    color="inherit"
                    className={classes.menuButton}
                    href="/"
                >
                    Log Out
                </Button>
                <Button
                    variant="outlined"
                    onClick={profileHandler}
                    color="inherit"
                    className={classes.menuButton}
                    href="/profile"
                >
                    Profile
                </Button>
            </Box>
        </>
    );
}

function AnonymousNavbar({ logInHandler, signUpHandler }) {
    const classes = useStyles();

    return (
        <>
            <Typography className={classes.title}>Welcome</Typography>
            <Box mr={3}>
                <Button
                    variant="outlined"
                    color="inherit"
                    className={classes.menuButton}
                    onClick={logInHandler}
                >
                    Log In
                </Button>
            </Box>
            <Button
                variant="outlined"
                color="inherit"
                className={classes.menuButton}
                onClick={signUpHandler}
            >
                Sign Up
            </Button>
        </>
    );
}

function NavigationBar() {
    const _AuthContext = useContext(AuthContext);
    const history = useHistory();

    const isAdminLoggedIn = useMemo(() => {
        if (_AuthContext.scope === 'Admin') {
            return true;
        } else {
            return false;
        }
    }, [_AuthContext.scope]);

    const handleGetProfile = useCallback(() => {
        history.push('/Profile/frtrr');
    }, [history]);

    const logout = useCallback(() => {
        _AuthContext.clear();
    }, [_AuthContext]);

    const logInHandler = useCallback(() => {
        history.push('/authenticate');
    }, [history]);

    const signUpHandler = useCallback(() => {
        history.push('/register');
    }, [history]);

    const content = useMemo(() => {
        if (isAdminLoggedIn) {
            return AdminLoggedInNavbar({
                email: _AuthContext.email,
                logoutHandler: logout,
                profileHandler: handleGetProfile,
            });
        } else {
            return _AuthContext.isLoggedIn
                ? LoggedInNavbar({
                      email: _AuthContext.email,
                      logoutHandler: logout,
                      profileHandler: handleGetProfile,
                  })
                : AnonymousNavbar({ logInHandler, signUpHandler });
        }
    }, [_AuthContext, logout, handleGetProfile, logInHandler, signUpHandler, isAdminLoggedIn]);

    return (
        <AppBar position="sticky">
            <Container>
                <Toolbar>{content}</Toolbar>
            </Container>
        </AppBar>
    );
}

export default NavigationBar;
