
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





function Welcome() {


const classes = useStyles();

    return (
        <div>

                <div className="">
                    <div className="">
                    <AppBar>
                        <Container>
                            <Toolbar>
                                <Typography className={classes.title}>Welcome</Typography>
                            <Box mr={3}>
                                <Button variant="outlined" color="inherit" className={classes.menuButton} href="/authenticate">
                                    Log In
                                </Button>
                                </Box>
                                <Button variant="outlined" color="inherit" className={classes.menuButton} href="/register">
                                    Sign Up
                                </Button>
                            </Toolbar>
                        </Container>
                    </AppBar>
                    </div>
                </div>
        </div>



/*<div className="maindivwelcome">
<h3 className="welcomeheader">Welcome</h3>
<div className="welocomeAuthBox">
    <div className="welcomereg">
        <Link className="welcomelink" to="/register">
            Register
        </Link>
    </div>
    <div className="welcomelogin">
        <Link className="welcomelink" to="/authenticate">
            Login
        </Link>
    </div>
</div>
</div>
*/

    );
}
export default Welcome;
