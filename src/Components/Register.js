import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { SetToken } from 'Services/LocalStorage';
import 'Styles/RegisterStyle.css';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
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

function Register() {
       
    function Copyright() {
        return (
          <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
              Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        );
      }
    
    const classes = useStyles();
    const history = useHistory();
    const [user, setUser] = useState({
        firstname: '',
        lastname: '',
        email: '',
        dateofbirth: '',
        password: '',
        passwordconfirm: '',
    });

    const [formErrors, setformErrors] = useState({
        firstname: '',
        lastname: '',
        email: '',
        dateofbirth: '',
        password: '',
        passwordconfirm: '',
    });
  
    const validate = useCallback( () => {
        if(!user.firstname) {
            setformErrors((formErrors) => ({ ...formErrors, firstname: 'First Name is required' }));
            return false;
        }

        if(!user.lastname) {
            setformErrors((formErrors) => ({ ...formErrors, lastname: 'Last Name is required' }));
            return false;
        }
        
        if(!user.email) {
            setformErrors((formErrors) => ({ ...formErrors, email: 'Email is required' }));
            return false;
        }

        if(!user.dateofbirth) {
            setformErrors((formErrors) => ({ ...formErrors, dateofbirth: 'Date of Birth is required' }));
            return false;
        }

        if(!user.password) {
            setformErrors((formErrors) => ({ ...formErrors, password: 'Password is required' }));
            return false;
        }

        if(!user.passwordconfirm) {
            setformErrors((formErrors) => ({ ...formErrors, passwordconfirm: 'Password is required' }));
            return false;
        }

        if(!user.email.includes('@')) {
            setformErrors((formErrors) => ({ ...formErrors, email: 'Email is incorrect' }));
            return false;
        }

        if(user.password.length < 4) {            
            setformErrors((formErrors) => ({ ...formErrors, password: 'Password is short' }));
            return false;
        }

        if(user.password !== user.passwordconfirm) {            
            setformErrors((formErrors) => ({ ...formErrors, passwordconfirm: 'Passwords don t match' }));
            return false;
        }      
        return true;
    },
    [user],
    );

    const handleChange = useCallback(
        (e) => {
            const { name, value } = e.target;
            setUser((user) => ({ ...user, [name]: value }));
            console.log(user);
        },
        [user],
    );

    const handleSumbit = useCallback(
        (e) => {
            validate();
            e.preventDefault();
            const userData = {
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                dateofbirth: user.dateofbirth,
                password: user.password,
                passwordconfirm: user.passwordconfirm,
            };
            axios
                .post('https://localhost:44344/api/register', userData)
                .then((res) => {
                  SetToken(res.data);  
                  console.log(res);
                    history.push('/HomePage');
                    
                })
                .catch((err) => setformErrors((formErrors) => ({ ...formErrors,  err: 'User already exists' })));
        },
        [user, history, validate],
    );

    return (
        
        <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="firstname"
              label="First Name"
              name="firstname"         
              autoFocus
              onChange={handleChange}
              value={user.firstname}
              helperText={formErrors.firstname}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="lastname"
                label="Last Name"
                name="lastname"         
                autoFocus
                onChange={handleChange}
                value={user.lastname}
                helperText={formErrors.lastname}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={user.email}
                onChange={handleChange}
                helperText={formErrors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Date Of Birth"
                name="dateofbirth"
                type="date"
                autoComplete="dateofbirth"
                value={user.dateofbirth}
                onChange={handleChange}
                helperText={formErrors.dateofbirth}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
                value={user.password}
                helperText={formErrors.err}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="passwordconfirm"
                label="Password Confirm"
                type="password"
                id="passwordconfirm"
                autoComplete="current-password"
                onChange={handleChange}
                value={user.passwordconfirm}
                helperText={formErrors.passwordconfirm}

              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSumbit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>

    );
}

export default Register;
