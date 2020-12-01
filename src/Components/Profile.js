import 'Styles/WelcomeStyle.css';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Box, Container, Toolbar, Typography } from '@material-ui/core';
import 'Styles/RegisterStyle.css';

import CssBaseline from '@material-ui/core/CssBaseline';

import Grid from '@material-ui/core/Grid';


import 'Styles/RegisterStyle.css';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginLeft: theme.spacing(1)
    },
    title: {
        flexGrow: 1
    },

    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
      },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },

  }));

function Profile() {
    
    const classes = useStyles();

    return (

        <div className="">
            <div className="">
                <AppBar>
                    <Container>
                        <Toolbar>
                            <Typography className={classes.title}>Hello</Typography>
                        <Box mr={3}>
                                
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
                    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        
        <Typography component="h1" variant="h5">
          Profile
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              
            </Grid>
            <Grid item xs={12} sm={6}>
              
            </Grid>
            <Grid item xs={12}>
              
            </Grid>
            <Grid item xs={12}>
              
            </Grid>
            <Grid item xs={12}>
              
            </Grid>
            <Grid item xs={12}>
              
            </Grid>
            <Grid item xs={12}>
              
            </Grid>
          </Grid>
          
          
        </form>
      </div>
      <Box mt={5}>
      </Box>
    </Container>
                    </div>
                </div>

    );

}

export default Profile;