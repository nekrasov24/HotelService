import React, { useCallback } from 'react';
import 'Styles/WelcomeStyle.css';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Box, Container, Toolbar, Typography } from '@material-ui/core';
import  Button  from '@material-ui/core/Button';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginLeft: theme.spacing(1)
    },
    title: {
        flexGrow: 1
    }
}))

function HomePage() {
    
    const history = useHistory();
    const classes = useStyles();

    const handleGetProfile = () => {

        axios
            .get('https://localhost:44344/api/getprofile')
            .then((res) => {

                console.log(res);
                history.push('/Profile');
            });
        };        
    


    const Logout = useCallback(
        () => {
            localStorage.removeItem('token');
                       
        },
        []
    )
    return (

                <div className="">
                    <div className="">
                    <AppBar>
                        <Container>
                            <Toolbar>
                            <Typography className={classes.title}>Hello</Typography>
                            <Box mr={3}>
                                <Button variant="outlined" onClick={Logout} color="inherit" className={classes.menuButton} href="/">
                                    Log Out
                                </Button>
                                <Button variant="outlined" onClick={handleGetProfile} color="inherit" className={classes.menuButton} href="/profile">
                                    Profile
                                </Button>
                                </Box>
                            </Toolbar>
                        </Container>
                        <Container>
                        <Alert severity="success">
                            you have successfully logged in
                        </Alert>
                        </Container>
                    </AppBar>
                    </div>
                </div>

    );

}

export default HomePage;