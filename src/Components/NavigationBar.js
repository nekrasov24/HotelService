import React, { useCallback, useContext, useMemo } from 'react';
import 'Styles/WelcomeStyle.css';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Box, Container, Toolbar, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import AuthContext from '../Contexts/AuthContext/AuthContext';
import AdminDraw from './AdminDrawer';
import UserDraw from './Drawer';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';

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

    disp: {
        marginTop: 500,
    },
}));

function HomeIcon(props) {
    return (
        <SvgIcon {...props}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </SvgIcon>
    );
}

function LoggedInNavbar({ email, logoutHandler, profileHandler, homePageHanler, classes }) {
    return (
        <>
            <UserDraw />
            <IconButton>
                <HomeIcon
                    variant="outlined"
                    onClick={homePageHanler}
                    color="disabled"
                    href="/homepage"
                />
            </IconButton>
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

function AdminLoggedInNavbar({ email, logoutHandler, profileHandler, homePageHanler, classes }) {
    return (
        <>
            <AdminDraw />
            <IconButton>
                <HomeIcon
                    variant="outlined"
                    onClick={homePageHanler}
                    color="inherit"
                    href="/homepage"
                />
            </IconButton>
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

function AnonymousNavbar({ logInHandler, signUpHandler, classes }) {
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

    const handleHomePage = useCallback(() => {
        history.push('/homepage');
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

    const classes = useStyles();
    const content = useMemo(() => {
        if (isAdminLoggedIn) {
            return AdminLoggedInNavbar({
                email: _AuthContext.email,
                logoutHandler: logout,
                profileHandler: handleGetProfile,
                homePageHanler: handleHomePage,
                classes,
            });
        } else {
            return _AuthContext.isLoggedIn
                ? LoggedInNavbar({
                      email: _AuthContext.email,
                      logoutHandler: logout,
                      profileHandler: handleGetProfile,
                      homePageHanler: handleHomePage,
                      classes,
                  })
                : AnonymousNavbar({ logInHandler, signUpHandler, classes });
        }
    }, [
        _AuthContext,
        logout,
        handleGetProfile,
        logInHandler,
        signUpHandler,
        handleHomePage,
        isAdminLoggedIn,
        classes,
    ]);

    return (
        <AppBar position="sticky">
            <Container>
                <Toolbar>{content}</Toolbar>
            </Container>
        </AppBar>
    );
}

export default NavigationBar;
