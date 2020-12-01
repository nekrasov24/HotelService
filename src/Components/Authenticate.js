import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { SetToken } from 'Services/LocalStorage';
import { useHistory } from 'react-router-dom';
import 'Styles/AuthenticateStyle.css';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';

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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function Authenticate() {
    const classes = useStyles();
    const history = useHistory();
    const [loginUser, setloginUser] = useState({
        firstname: '',
        email: '',
        password: '',
    });

    const regex1 = new RegExp(/^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    const [formErrors, setformErrors] = useState({
        firstname: '',
        email: '',
        password: '',
        err: '',
    });

    const validate = () => {
      let isValid = true;

        if (!loginUser.firstname) {
            setformErrors((formErrors) => ({ ...formErrors, firstname: 'First Name is required' }));
            isValid =  false;
        } else {
          setformErrors((formErrors) => ({ ...formErrors, firstname: null }));
        }

        if (!loginUser.email) {
            setformErrors((formErrors) => ({ ...formErrors, email: 'Email is required' }));
            isValid =  false;
        } else{
          setformErrors((formErrors) => ({ ...formErrors, email: '' }));
        }

        if (!loginUser.password) {
            setformErrors((formErrors) => ({ ...formErrors, password: 'Password is required' }));
            isValid =  false;
        } else{
          setformErrors((formErrors) => ({ ...formErrors, password: '' }));
        }

        
        if (!regex1.test(loginUser.email)) {
            setformErrors((formErrors) => ({ ...formErrors, email: 'Email is not valid' }));
            isValid =  false;
        } else{
          setformErrors((formErrors) => ({ ...formErrors, email: '' }));
        }

        
        return isValid;
    };

    const handleChange = useCallback(
        (e) => {
            const { name, value } = e.target;
            setloginUser((currentloginUser) => ({ ...currentloginUser, [name]: value }));
            console.log(loginUser);
        },
        [loginUser],
    );

    const handleSumbit = (e) => {
        e.preventDefault();

        const result = validate();
        if(result){

            setformErrors((formErrors) => ({ ...formErrors, err: null }));
          const userData = {
            firstname: loginUser.firstname,
            email: loginUser.email,
            password: loginUser.password,
        };
        axios
            .post('https://localhost:44344/api/authenticate', userData)
            .then((res) => {
                SetToken(res.data);
                console.log(res);
                history.push('/HomePage');
            })
            .catch((res) => {
              
              console.log(res)
              setformErrors((formErrors) => ({ ...formErrors, err: res.response.data }))});
        }        
    };



    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Log in
                </Typography>
                <form className={classes.form} noValidate>
                {formErrors.err && <Alert severity="error">{formErrors.err}</Alert>}
                    <TextField
                        error={formErrors.firstname}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="firstname"
                        label="First Name"
                        name="firstname"
                        autoFocus
                        onChange={handleChange}
                        value={loginUser.firstname}
                        helperText={formErrors.firstname}
                    />
                    <TextField
                        error={formErrors.email}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoFocus
                        onChange={handleChange}
                        value={loginUser.email}
                        helperText={formErrors.email}
                    />
                    <TextField
                        error={formErrors.password}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        onChange={handleChange}
                        value={loginUser.password}
                        helperText={formErrors.password}
                        
                    />

                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSumbit}
                    >
                        Sign In
                    </Button>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}

export default Authenticate;
