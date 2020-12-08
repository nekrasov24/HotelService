import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { SetToken } from 'Services/LocalStorage';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';

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
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function EditRoom() {
    const classes = useStyles();
    const history = useHistory();
    const [editRequestModel, setEditRequestModel] = useState({
        id: '',
        name: '',
        number: '',
        numberOfPeople: '',
        priceForNight: '',
        description: '',
        roomType: '',
    });

    const [formErrors, setFormErrors] = useState({
        id: '',
        name: '',
        number: '',
        numberOfPeople: '',
        priceForNight: '',
        description: '',
        roomType: '',
    });

    const validate = () => {
        let isValid = true;

        if (!editRequestModel.id) {
            setFormErrors((formErrors) => ({ ...formErrors, id: 'Id is required' }));
            isValid = false;
        } else {
            setFormErrors((formErrors) => ({ ...formErrors, id: '' }));
        }

        if (!editRequestModel.name) {
            setFormErrors((formErrors) => ({ ...formErrors, name: 'Name is required' }));
            isValid = false;
        } else {
            setFormErrors((formErrors) => ({ ...formErrors, name: '' }));
        }

        if (!editRequestModel.number) {
            setFormErrors((formErrors) => ({ ...formErrors, number: 'Number is required' }));
            isValid = false;
        } else {
            setFormErrors((formErrors) => ({ ...formErrors, number: '' }));
        }

        if (!editRequestModel.numberOfPeople) {
            setFormErrors((formErrors) => ({
                ...formErrors,
                numberOfPeople: 'Number Of People is required',
            }));
            isValid = false;
        } else {
            setFormErrors((formErrors) => ({ ...formErrors, numberOfPeople: '' }));
        }

        if (!editRequestModel.priceForNight) {
            setFormErrors((formErrors) => ({
                ...formErrors,
                priceForNight: 'Price For Night is required',
            }));
            isValid = false;
        } else {
            setFormErrors((formErrors) => ({ ...formErrors, priceForNight: '' }));
        }

        if (!editRequestModel.roomType) {
            setFormErrors((formErrors) => ({ ...formErrors, roomType: 'Room Type is required' }));
            isValid = false;
        } else {
            setFormErrors((formErrors) => ({ ...formErrors, roomType: '' }));
        }

        return isValid;
    };

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setEditRequestModel((currentEditRequestModel) => ({
            ...currentEditRequestModel,
            [name]: value,
        }));
    }, []);

    const editRoom = (e) => {
        e.preventDefault();
        const result = validate();
        if (result) {
            setFormErrors((formErrors) => ({ ...formErrors, err: null }));

            const editRoomData = {
                id: editRequestModel.id,
                name: editRequestModel.name,
                number: editRequestModel.number,
                numberOfPeople: editRequestModel.numberOfPeople,
                priceForNight: editRequestModel.priceForNight,
                description: editRequestModel.description,
                roomType: editRequestModel.roomType,
            };
            axios
                .post('https://localhost:44344/api/editroom', editRoomData)
                .then((res) => {
                    const token = res.data;
                    SetToken(token);
                    //var decodeToken = jwt_decode(token);
                    //_AuthContext.setUserData(decodeToken, token);
                    history.push('/HomePage');
                    //enqueueSnackbar('You have successfully logged in!', { variant: 'success' });
                })
                .catch((res) => {
                    console.log(res);
                    setFormErrors((formErrors) => ({ ...formErrors, err: res.response.data }));
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
                    Edit Room
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
                        value={editRequestModel.id}
                        helperText={formErrors.firstname}
                    />
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
                        value={editRequestModel.name}
                        helperText={formErrors.firstname}
                    />
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
                        value={editRequestModel.number}
                        helperText={formErrors.lastname}
                    />
                    <TextField
                        error={formErrors.email}
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={editRequestModel.numberOfPeople}
                        onChange={handleChange}
                        helperText={formErrors.email}
                    />
                    <TextField
                        error={formErrors.dateofbirth}
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        name="dateofbirth"
                        type="date"
                        autoComplete="dateofbirth"
                        value={editRequestModel.priceForNight}
                        onChange={handleChange}
                        helperText={formErrors.dateofbirth}
                    />
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
                        value={editRequestModel.description}
                        helperText={formErrors.password}
                    />
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
                        value={editRequestModel.roomType}
                        helperText={formErrors.passwordconfirm}
                    />
                    <FormControlLabel
                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                        label="I want to receive inspiration, marketing promotions and updates via email."
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={editRoom}
                    >
                        Edit Room
                    </Button>
                </form>
            </div>
            <Box mt={5}></Box>
        </Container>
    );
}

export default EditRoom;
