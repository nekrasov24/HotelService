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

function AddRoom() {
    const classes = useStyles();
    const history = useHistory();
    const [addRequestModel, setAddRequestModel] = useState({
        name: '',
        number: '',
        numberOfPeople: '',
        priceForNight: '',
        description: '',
        roomType: '',
    });

    const [formErrors, setFormErrors] = useState({
        name: '',
        number: '',
        numberOfPeople: '',
        priceForNight: '',
        description: '',
        roomType: '',
    });

    const validate = () => {
        let isValid = true;

        if (!addRequestModel.name) {
            setFormErrors((formErrors) => ({ ...formErrors, name: 'Name is required' }));
            isValid = false;
        } else {
            setFormErrors((formErrors) => ({ ...formErrors, name: '' }));
        }

        if (!addRequestModel.number) {
            setFormErrors((formErrors) => ({ ...formErrors, number: 'Number is required' }));
            isValid = false;
        } else {
            setFormErrors((formErrors) => ({ ...formErrors, number: '' }));
        }

        if (!addRequestModel.numberOfPeople) {
            setFormErrors((formErrors) => ({
                ...formErrors,
                numberOfPeople: 'Number Of People is required',
            }));
            isValid = false;
        } else {
            setFormErrors((formErrors) => ({ ...formErrors, numberOfPeople: '' }));
        }

        if (!addRequestModel.priceForNight) {
            setFormErrors((formErrors) => ({
                ...formErrors,
                priceForNight: 'Price For Night is required',
            }));
            isValid = false;
        } else {
            setFormErrors((formErrors) => ({ ...formErrors, priceForNight: '' }));
        }

        if (!addRequestModel.roomType) {
            setFormErrors((formErrors) => ({ ...formErrors, roomType: 'Room Type is required' }));
            isValid = false;
        } else {
            setFormErrors((formErrors) => ({ ...formErrors, roomType: '' }));
        }

        return isValid;
    };

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setAddRequestModel((currentAddRequestModel) => ({
            ...currentAddRequestModel,
            [name]: value,
        }));
    }, []);

    const addRoom = (e) => {
        e.preventDefault();
        const result = validate();
        if (result) {
            setFormErrors((formErrors) => ({ ...formErrors, err: null }));

            const addRoomData = {
                name: addRequestModel.name,
                number: addRequestModel.number,
                numberOfPeople: addRequestModel.numberOfPeople,
                priceForNight: addRequestModel.priceForNight,
                description: addRequestModel.description,
                roomType: addRequestModel.roomType,
            };
            axios
                .post('https://localhost:44344/api/addroom', addRoomData)
                .then((res) => {
                    const token = res.data;
                    SetToken(token);
                    // var decodeToken = jwt_decode(token);
                    // _AuthContext.setUserData(decodeToken, token);
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
                    Add new Room
                </Typography>
                <form className={classes.form} noValidate>
                    {formErrors.err && <Alert severity="error">{formErrors.err}</Alert>}
                    <TextField
                        error={formErrors.name}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        autoFocus
                        onChange={handleChange}
                        value={addRequestModel.name}
                        helperText={formErrors.name}
                    />
                    <TextField
                        error={formErrors.number}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="number"
                        label="Number"
                        name="number"
                        autoFocus
                        onChange={handleChange}
                        value={addRequestModel.number}
                        helperText={formErrors.number}
                    />
                    <TextField
                        error={formErrors.numberOfPeople}
                        variant="outlined"
                        required
                        fullWidth
                        id="numberofpeople"
                        label="Number Of People"
                        name="numberofpeople"
                        value={addRequestModel.numberOfPeople}
                        onChange={handleChange}
                        helperText={formErrors.numberOfPeople}
                    />
                    <TextField
                        error={formErrors.priceForNight}
                        variant="outlined"
                        required
                        fullWidth
                        id="pricefornight"
                        name="pricefornight"
                        label="Price For Night"
                        value={addRequestModel.priceForNight}
                        onChange={handleChange}
                        helperText={formErrors.priceForNight}
                    />
                    <TextField
                        error={formErrors.description}
                        variant="outlined"
                        required
                        fullWidth
                        name="description"
                        label="Description"
                        id="description"
                        onChange={handleChange}
                        value={addRequestModel.description}
                        helperText={formErrors.description}
                    />
                    <TextField
                        error={formErrors.roomType}
                        variant="outlined"
                        required
                        fullWidth
                        name="roomtype"
                        label="Room Type"
                        id="roomtype"
                        onChange={handleChange}
                        value={addRequestModel.roomType}
                        helperText={formErrors.roomType}
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
                        onClick={addRoom}
                    >
                        Add Room
                    </Button>
                </form>
            </div>
        </Container>
    );
}

export default AddRoom;
