import React, { useState, useCallback, useContext } from 'react';
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
import Alert from '@material-ui/lab/Alert';
import { useSnackbar } from 'notistack';
import AuthContext from '../Contexts/AuthContext/AuthContext';
import jwt_decode from 'jwt-decode';

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
    const _AuthContext = useContext(AuthContext);

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

    const { enqueueSnackbar } = useSnackbar();
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

    const regex = new RegExp(
        /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );

    const [formErrors, setformErrors] = useState({
        firstname: '',
        lastname: '',
        email: '',
        dateofbirth: '',
        password: '',
        passwordconfirm: '',
        err: '',
    });

    const validate = () => {
        let isValid = true;

        if (!user.firstname) {
            setformErrors((formErrors) => ({ ...formErrors, firstname: 'First Name is required' }));
            isValid = false;
        } else {
            setformErrors((formErrors) => ({ ...formErrors, firstname: '' }));
        }

        if (!user.lastname) {
            setformErrors((formErrors) => ({ ...formErrors, lastname: 'Last Name is required' }));
            isValid = false;
        } else {
            setformErrors((formErrors) => ({ ...formErrors, lastname: '' }));
        }

        if (!user.email) {
            setformErrors((formErrors) => ({ ...formErrors, email: 'Email is required' }));
            isValid = false;
        } else {
            setformErrors((formErrors) => ({ ...formErrors, email: '' }));
        }

        if (!user.dateofbirth) {
            setformErrors((formErrors) => ({
                ...formErrors,
                dateofbirth: 'Date of Birth is required',
            }));
            isValid = false;
        } else {
            setformErrors((formErrors) => ({ ...formErrors, dateofbirth: '' }));
        }

        if (!user.password) {
            setformErrors((formErrors) => ({ ...formErrors, password: 'Password is required' }));
            isValid = false;
        } else {
            setformErrors((formErrors) => ({ ...formErrors, password: '' }));
        }

        if (!user.passwordconfirm) {
            setformErrors((formErrors) => ({
                ...formErrors,
                passwordconfirm: 'Password Confirm is required',
            }));
            isValid = false;
        } else {
            setformErrors((formErrors) => ({ ...formErrors, passwordconfirm: '' }));
        }

        if (!regex.test(user.email)) {
            setformErrors((formErrors) => ({ ...formErrors, email: 'Email is not valid' }));
            isValid = false;
        } else {
            setformErrors((formErrors) => ({ ...formErrors, email: '' }));
        }

        if (user.password.length < 4) {
            setformErrors((formErrors) => ({ ...formErrors, password: 'Password is short' }));
            isValid = false;
        } else {
            setformErrors((formErrors) => ({ ...formErrors, password: null }));
        }

        if (user.password !== user.passwordconfirm) {
            setformErrors((formErrors) => ({
                ...formErrors,
                passwordconfirm: 'Passwords don t match',
            }));
            isValid = false;
        } else {
            setformErrors((formErrors) => ({ ...formErrors, passwordconfirm: '' }));
        }
        return isValid;
    };

    const handleChange = useCallback(
        (e) => {
            const { name, value } = e.target;
            setUser((user) => ({ ...user, [name]: value }));
            console.log(user);
        },
        [user],
    );

    const handleSumbit = (e) => {
        e.preventDefault();
        const result = validate();
        if (result) {
            setformErrors((formErrors) => ({ ...formErrors, err: null }));

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
                    const token = res.data;
                    SetToken(token);
                    var decodeToken = jwt_decode(token);
                    _AuthContext.setUserData(decodeToken, token);
                    history.push('/HomePage');
                    enqueueSnackbar('You have successfully logged in!', { variant: 'success' });
                })
                .catch((res) => {
                    console.log(res);
                    setformErrors((formErrors) => ({ ...formErrors, err: res.response.data }));
                });
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
                    Sign up
                </Typography>
                <form className={classes.form} noValidate>
                    {formErrors.err && <Alert severity="error">{formErrors.err}</Alert>}
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
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
                                value={user.firstname}
                                helperText={formErrors.firstname}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error={formErrors.lastname}
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
                                error={formErrors.email}
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
                                error={formErrors.dateofbirth}
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
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
                                error={formErrors.password}
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
                                helperText={formErrors.password}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={formErrors.passwordconfirm}
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
