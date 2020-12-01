import React, { useCallback } from 'react';
import 'Styles/WelcomeStyle.css';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Box, Collapse, Container, Toolbar, Typography } from '@material-ui/core';
import  Button  from '@material-ui/core/Button';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

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

    const [open, setOpen] = React.useState(true);

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
                            <Collapse in={open}>
                        <Alert severity="success" action={<IconButton aria-label="close" color="inherit" size="small" onClick= { () => { setOpen(false); } }> <CloseIcon fontSize="inherit" /> </IconButton>}>
                            you have successfully logged in
                        </Alert>
                        </Collapse>
                        </Container>
                    </AppBar>
                    </div>
                </div>












    );

}

export default HomePage;