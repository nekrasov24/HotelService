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

    //let { userId } = useParams();

    useEffect(() => {
        if (_AuthContext.id) {
            axios.get(`https://localhost:44344/api/user/${_AuthContext.id}`).then((res) => {
                setGetUser(res.data);

                setUser({
                    firstname: res.data.firstName,
                    lastname: res.data.lastName,
                    email: res.data.email,
                    dateofbirth: res.data.dateofbirth,
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
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                dateofbirth: user.dateofbirth,
            };
            axios
                .post('https://localhost:44344/api/edituser', userData)
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
                <main>
                    <Container className={classes.cardGrid} component="main" maxWidth="md">
                        {/* End hero unit */}
                        <Grid
                            container
                            spacing={4}
                            className={classes.form}
                            justify="center"
                            alignItems="center"
                        >
                            {getUser && (
                                <Grid item xs={12} sm={6} md={4}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        First Name: {getUser.firstname}
                                    </Typography>
                                    <Typography>Last Name: {getUser.lastname}</Typography>
                                    <Typography> Email: {getUser.email}</Typography>
                                    <Typography> Date Of Birth: {getUser.dateofbirth}</Typography>
                                </Grid>
                            )}
                        </Grid>
                    </Container>
                </main>
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
                                    error={!!formErrors.firstName}
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
                    </form>
                </div>
            </Container>
        </>
    );
}

export default EditProfile;
