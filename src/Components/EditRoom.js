import React, { useState, useCallback, useEffect, useRef } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

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

const initialState = {
    name: '',
    number: '',
    numberOfPeople: '',
    priceForNight: '',
    description: '',
    roomType: '',
};

function EditRoom() {
    const classes = useStyles();
    const history = useHistory();
    const [room, setRoom] = useState();
    const [editRequestModel, setEditRequestModel] = useState(initialState);
    const { enqueueSnackbar } = useSnackbar();
    const fileRef = useRef();

    const [formErrors, setFormErrors] = useState({
        id: '',
        name: '',
        number: '',
        numberOfPeople: '',
        priceForNight: '',
        description: '',
        roomType: '',
        err: '',
    });

    let { roomId } = useParams();
    const validate = () => {
        var propErrors = {
            name: '',
            number: '',
            numberOfPeople: '',
            priceForNight: '',
            description: '',
            roomType: '',
        };

        var isValid = true;

        propErrors.name = validateName(editRequestModel.name);
        if (propErrors.name) {
            isValid = false;
        }
        propErrors.number = validateNumber(editRequestModel.number);
        if (propErrors.number) {
            isValid = false;
        }
        propErrors.numberOfPeople = validateNumberOfPeople(editRequestModel.numberOfPeople);
        if (propErrors.numberOfPeople) {
            isValid = false;
        }
        propErrors.priceForNight = validatePriceForNight(editRequestModel.priceForNight);
        if (propErrors.priceForNight) {
            isValid = false;
        }
        propErrors.description = validateDescription(editRequestModel.description);
        if (propErrors.description) {
            isValid = false;
        }
        propErrors.roomType = validateRoomType(editRequestModel.roomType);
        if (propErrors.roomType) {
            isValid = false;
        }

        return { propErrors, isValid };
    };

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setEditRequestModel((currentEditRequestModel) => ({
            ...currentEditRequestModel,
            [name]: value,
        }));
    }, []);

    useEffect(() => {
        axios.get(`https://localhost:44344/api/rooms/${roomId}`).then((res) => {
            setRoom(res.data);
            setEditRequestModel({
                id: res.data.id,
                name: res.data.name,
                number: res.data.number,
                numberOfPeople: res.data.numberOfPeople,
                priceForNight: res.data.priceForNight,
                description: res.data.description,
                roomType: res.data.roomType,
            });
            console.log(res);
        });
    }, [roomId]);

    const editRoom = (e) => {
        e.preventDefault();
        const { propErrors, isValid } = validate();

        setFormErrors((formErrors) => ({ ...formErrors, ...propErrors }));

        if (isValid) {
            let formData = new FormData();
            formData.append('name', editRequestModel.name);
            formData.append('number', Number(editRequestModel.number));
            formData.append('numberOfPeople', Number(editRequestModel.numberOfPeople));
            formData.append('priceForNight', Number(editRequestModel.priceForNight));
            formData.append('description', editRequestModel.description);
            formData.append('roomType', Number(editRequestModel.roomType));
            const file = fileRef.current.files[0];
            if (file) {
                formData.append('images', file, editRequestModel.image);
            }
            axios
                .put('https://localhost:44344/api/editroom', formData, {
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
                    setFormErrors((formErrors) => ({ ...formErrors, err: res.response.data }));
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
                        Edit Room
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
                            value={editRequestModel.name}
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
                            value={editRequestModel.number}
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
                            value={editRequestModel.numberOfPeople}
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
                            autoFocus
                            type="number"
                            label="price For Night"
                            value={editRequestModel.priceForNight}
                            onChange={handleChange}
                            helperText={formErrors.priceForNight}
                        />
                        <TextField
                            error={formErrors.description}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="description"
                            label="Description"
                            id="description"
                            onChange={handleChange}
                            multiline
                            rowsMin={4}
                            rowsMax={8}
                            value={editRequestModel.description}
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
                            onChange={handleChange}
                            value={editRequestModel.roomType}
                            helperText={formErrors.roomType}
                        >
                            <MenuItem value={1}>Standart</MenuItem>
                            <MenuItem value={2}>DeLuxe</MenuItem>
                            <MenuItem value={3}>FamilyRoom</MenuItem>
                        </Select>
                        <TextField
                            //error={formErrors.description}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="image"
                            //label="Description"
                            id="image"
                            type="file"
                            onChange={handleChange}
                            value={editRequestModel.image}
                            inputRef={fileRef}
                            //helperText={formErrors.description}
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
        </>
    );
}

export default EditRoom;
