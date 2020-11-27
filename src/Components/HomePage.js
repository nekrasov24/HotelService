import React, { useCallback } from 'react';

import 'Styles/WelcomeStyle.css';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Box, Container, Toolbar, Typography } from '@material-ui/core';
import  Button  from '@material-ui/core/Button';



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
    
    const classes = useStyles();
    //const history = useHistory();
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
                                <Typography className={classes.title}>Home</Typography>
                            <Box mr={3}>
                                <Button variant="outlined" onClick={Logout} color="inherit" className={classes.menuButton} href="/">
                                    Log Out
                                </Button>
                                </Box>
                            </Toolbar>
                        </Container>
                    </AppBar>
                    </div>
                </div>






/*<div className="maindivwelcome">
<h3 className="welcomeheader">Home</h3>
<div className="welocomeAuthBox">
    <div className="welcomereg">
        <Link onClick={Logout} className="welcomelink" to="/">
            Logout
        </Link>
    </div>


</div>
</div>*/

    );

}

export default HomePage;