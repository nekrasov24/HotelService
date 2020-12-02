import React, { useCallback } from 'react';
import 'Styles/WelcomeStyle.css';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Box, Container, Toolbar, Typography } from '@material-ui/core';
import  Button  from '@material-ui/core/Button';
import jwt_decode from "jwt-decode";
import { useHistory } from 'react-router-dom';
import { GetToken } from 'Services/LocalStorage';
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

    //const [open, setOpen] = React.useState(true);

    const handleGetProfile = () => {
     
        var token = GetToken();
        var decodeToken = jwt_decode(token);
        console.log(decodeToken);

        history.push('/Profile/frtrr');        
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
                       
                    </AppBar>
                    </div>
                </div>

    );

}

export default HomePage;