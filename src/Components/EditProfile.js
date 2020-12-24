import React, { useState, useCallback, useContext, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import 'Styles/RegisterStyle.css';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import { useSnackbar } from 'notistack';
import AuthContext from '../Contexts/AuthContext/AuthContext';

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
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
}));

function EditProfile() {
    const _AuthContext = useContext(AuthContext);

    const { enqueueSnackbar } = useSnackbar();
    const classes = useStyles();
    const history = useHistory();
    const [getUser, setGetUser] = useState();
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        dateOfBirth: '',
    });

    const regex = new RegExp(
        /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );

    const [formErrors, setformErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        dateOfBirth: '',
        err: '',
    });

    const validate = () => {
        let isValid = true;

        if (!user.firstName) {
            setformErrors((formErrors) => ({ ...formErrors, firstName: 'First Name is required' }));
            isValid = false;
        } else {
            setformErrors((formErrors) => ({ ...formErrors, firstName: '' }));
        }

        if (!user.lastName) {
            setformErrors((formErrors) => ({ ...formErrors, lastName: 'Last Name is required' }));
            isValid = false;
        } else {
            setformErrors((formErrors) => ({ ...formErrors, lastName: '' }));
        }

        if (!user.email) {
            setformErrors((formErrors) => ({ ...formErrors, email: 'Email is required' }));
            isValid = false;
        } else {
            setformErrors((formErrors) => ({ ...formErrors, email: '' }));
        }

        if (!user.dateOfBirth) {
            setformErrors((formErrors) => ({
                ...formErrors,
                dateOfBirth: 'Date of Birth is required',
            }));
            isValid = false;
        } else {
            setformErrors((formErrors) => ({ ...formErrors, dateOfBirth: '' }));
        }

        if (!regex.test(user.email)) {
            setformErrors((formErrors) => ({ ...formErrors, email: 'Email is not valid' }));
            isValid = false;
        } else {
            setformErrors((formErrors) => ({ ...formErrors, email: '' }));
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

    useEffect(() => {
        if (_AuthContext.id) {
            axios.get(`https://localhost:44344/api/user/${_AuthContext.id}`).then((res) => {
                setGetUser(res.data);

                setUser({
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    email: res.data.email,
                    dateOfBirth: res.data.dateOfBirth,
                });
            });
        }
    }, [_AuthContext.id]);

    const handleSumbit = (e) => {
        e.preventDefault();
        const result = validate();
        if (result) {
            setformErrors((formErrors) => ({ ...formErrors, err: null }));

            const userData = {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                dateOfBirth: user.dateOfBirth,
            };
            axios
                .put('https://localhost:44344/api/edituser', userData)
                .then((res) => {
                    const responce = res.data;
                    history.push('/HomePage');
                    enqueueSnackbar(responce, {
                        variant: 'success',
                    });
                })
                .catch((res) => {
                    console.log(res);
                    setformErrors((formErrors) => ({ ...formErrors, err: res.response.data }));
                });
        }
    };

    return (
        <>
            <React.Fragment>
                <CssBaseline />
            </React.Fragment>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Edit User
                    </Typography>
                    <form className={classes.form} noValidate>
                        {formErrors.err && <Alert severity="error">{formErrors.err}</Alert>}
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    error={formErrors.firstName}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    name="firstName"
                                    autoFocus
                                    onChange={handleChange}
                                    value={user.firstName}
                                    helperText={formErrors.firstName}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    error={formErrors.lastName}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoFocus
                                    onChange={handleChange}
                                    value={user.lastName}
                                    helperText={formErrors.lastName}
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
                                    value={user.email}
                                    onChange={handleChange}
                                    helperText={formErrors.email}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    error={formErrors.dateOfBirth}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="dateOfBirth"
                                    name="dateofbirth"
                                    type="date"
                                    autoComplete="dateOfBirth"
                                    value={user.dateOfBirth}
                                    onChange={handleChange}
                                    helperText={formErrors.dateOfBirth}
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
                            Edit User
                        </Button>
                    </form>
                </div>
            </Container>
        </>
    );
}

export default EditProfile;
