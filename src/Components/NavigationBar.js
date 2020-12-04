import React, { useCallback, useContext, useMemo } from 'react';
import 'Styles/WelcomeStyle.css';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Box, Container, Toolbar, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import AuthContext from '../Contexts/AuthContext/AuthContext';

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
        return _AuthContext.isLoggedIn
            ? LoggedInNavbar({
                  email: _AuthContext.email,
                  logoutHandler: logout,
                  profileHandler: handleGetProfile,
              })
            : AnonymousNavbar({ logInHandler, signUpHandler });
    }, [_AuthContext, logout, handleGetProfile, logInHandler, signUpHandler]);

    return (
        <AppBar>
            <Container>
                <Toolbar>{content}</Toolbar>
            </Container>
        </AppBar>
    );
}

export default NavigationBar;
