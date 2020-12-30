import React, { useState, useCallback, useRef } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import Select from '@material-ui/core/Select';
import { useSnackbar } from 'notistack';
import MenuItem from '@material-ui/core/MenuItem';
import { addRoomEndpoint } from 'utils/apiPathes';

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

function validateName(name) {
    if (!name) {
        return 'Name is required';
    }
    if (name.length > 10) {
        return 'Name can not longer than 10';
    }
    return '';
}

function validateNumber(number) {
    if (!number) {
        return 'Number is required';
    }
    if (Number(number) < 0) {
        return 'Number can not negative';
    }
    if (Number(number) > 100) {
        return 'Number can not longer than 100';
    }
    return '';
}

function validateNumberOfPeople(numberOfPeople) {
    if (!numberOfPeople) {
        return 'Number Of People is required';
    }
    if (Number(numberOfPeople) < 0) {
        return 'Number Of People can not negative';
    }
    if (Number(numberOfPeople) > 10) {
        return 'Number Of People can not longer than 10';
    }
    return '';
}

function validatePriceForNight(priceForNight) {
    console.log(priceForNight);
    if (!priceForNight) {
        return 'Price For Night is required';
    }
    if (Number(priceForNight) < 0) {
        return 'Price For Night can not negative';
    }
    if (Number(priceForNight) > 1000) {
        return 'Price For Night can not longer than 1000';
    }
    return '';
}

function validateDescription(description) {
    if (!description) {
        return 'Description is required';
    }
    if (description.length > 200) {
        return 'Description can not longer than 200';
    }
    return '';
}

function validateRoomType(roomType) {
    if (!roomType) {
        return 'Room Type is required';
    }
    return '';
}

function validateImage(image) {
    if (!image) {
        return 'Images was not added';
    }
    return '';
}

const initialState = {
    name: '',
    number: '',
    numberOfPeople: '',
    priceForNight: '',
    description: '',
    roomType: '',
    image: '',
};

function AddRoom() {
    const classes = useStyles();
    const history = useHistory();
    const [addRequestModel, setAddRequestModel] = useState(initialState);
    const { enqueueSnackbar } = useSnackbar();
    const fileRef = useRef();

    const [formErrors, setFormErrors] = useState({
        name: '',
        number: '',
        numberOfPeople: '',
        priceForNight: '',
        description: '',
        roomType: '',
        image: '',
        err: '',
    });

    const validate = () => {
        var propErrors = {
            name: '',
            number: '',
            numberOfPeople: '',
            priceForNight: '',
            description: '',
            roomType: '',
            image: '',
        };

        var isValid = true;

        propErrors.name = validateName(addRequestModel.name);
        if (propErrors.name) {
            isValid = false;
        }
        propErrors.number = validateNumber(addRequestModel.number);
        if (propErrors.number) {
            isValid = false;
        }
        propErrors.numberOfPeople = validateNumberOfPeople(addRequestModel.numberOfPeople);
        if (propErrors.numberOfPeople) {
            isValid = false;
        }
        propErrors.priceForNight = validatePriceForNight(addRequestModel.priceForNight);
        if (propErrors.priceForNight) {
            isValid = false;
        }
        propErrors.description = validateDescription(addRequestModel.description);
        if (propErrors.description) {
            isValid = false;
        }
        propErrors.roomType = validateRoomType(addRequestModel.roomType);
        if (propErrors.roomType) {
            isValid = false;
        }
        propErrors.image = validateImage(addRequestModel.image);
        if (propErrors.image) {
            isValid = false;
        }

        return { propErrors, isValid };
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
        const { propErrors, isValid } = validate();

        setFormErrors((formErrors) => ({ ...formErrors, ...propErrors }));

        if (isValid) {
            let formData = new FormData();
            formData.append('name', addRequestModel.name);
            formData.append('number', Number(addRequestModel.number));
            formData.append('numberOfPeople', Number(addRequestModel.numberOfPeople));
            formData.append('priceForNight', Number(addRequestModel.priceForNight));
            formData.append('description', addRequestModel.description);
            formData.append('roomType', Number(addRequestModel.roomType));
            const files = fileRef.current.files;
            if (files) {
                for (let index = 0; index < files.length; index++) {
                    formData.append(`images`, files[index]);
                }
            }

            axios
                .post(addRoomEndpoint, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                })
                .then((res) => {
                    const responce = res.data;
                    history.push('/roomManagement');
                    enqueueSnackbar(responce, {
                        variant: 'success',
                    });
                })
                .catch((res) => {
                    console.log(res);
                    setFormErrors((formErrors) => ({ ...formErrors, err: [res.response.data] }));
                });
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
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
                        type="number"
                        onChange={handleChange}
                        value={addRequestModel.number}
                        helperText={formErrors.number}
                    />
                    <TextField
                        error={formErrors.numberOfPeople}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="numberOfPeople"
                        label="Number Of People"
                        name="numberOfPeople"
                        autoFocus
                        type="number"
                        value={addRequestModel.numberOfPeople}
                        onChange={handleChange}
                        helperText={formErrors.numberOfPeople}
                    />
                    <TextField
                        error={formErrors.priceForNight}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="priceForNight"
                        name="priceForNight"
                        label="Price For Night"
                        autoFocus
                        type="number"
                        value={addRequestModel.priceForNight}
                        onChange={handleChange}
                        helperText={formErrors.priceForNight}
                    />
                    <TextField
                        error={formErrors.description}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        autoFocus
                        name="description"
                        label="Description"
                        id="description"
                        onChange={handleChange}
                        multiline
                        rowsMin={4}
                        rowsMax={8}
                        value={addRequestModel.description}
                        helperText={formErrors.description}
                    />
                    <Select
                        error={formErrors.roomType}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="roomType"
                        label="Room Type"
                        id="roomType"
                        //autoFocus
                        onChange={handleChange}
                        value={addRequestModel.roomType}
                        helperText={formErrors.roomType}
                    >
                        <MenuItem value={1}>Standart</MenuItem>
                        <MenuItem value={2}>DeLuxe</MenuItem>
                        <MenuItem value={3}>FamilyRoom</MenuItem>
                        <MenuItem value={4}>Apartament</MenuItem>
                    </Select>
                    <TextField
                        error={formErrors.image}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="image"
                        id="image"
                        type="file"
                        autoFocus
                        onChange={handleChange}
                        value={addRequestModel.image}
                        inputRef={fileRef}
                        inputProps={{ multiple: 'multiple' }}
                        helperText={formErrors.image}
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
