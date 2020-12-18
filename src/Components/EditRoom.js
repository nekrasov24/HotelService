import React, { useState, useCallback, useEffect } from 'react';
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
import Grid from '@material-ui/core/Grid';
import { converterRoomType } from 'Services/ConverterRoomType';

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
    if (name.length > 5) {
        return 'Name can not longer than 30';
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
            const editRoomData = {
                id: editRequestModel.id,
                name: editRequestModel.name,
                number: Number(editRequestModel.number),
                numberOfPeople: Number(editRequestModel.numberOfPeople),
                priceForNight: Number(editRequestModel.priceForNight),
                description: editRequestModel.description,
                roomType: Number(editRequestModel.roomType),
            };
            axios
                .put('https://localhost:44344/api/editroom', editRoomData)
                .then((res) => {
                    const responce = res.data;
                    history.push('/HomePage');
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
                            {room && (
                                <Grid item xs={12} sm={6} md={4}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Name: {room.name}
                                    </Typography>
                                    <Typography>Description: {room.description}</Typography>
                                    <Typography>
                                        {' '}
                                        Number Of People: {room.numberOfPeople}
                                    </Typography>
                                    <Typography> Price For Night: {room.priceForNight}</Typography>
                                    <Typography>
                                        {' '}
                                        Type: {converterRoomType(room.roomType)}
                                    </Typography>
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
                            value={editRequestModel.description}
                            helperText={formErrors.description}
                        />
                        <TextField
                            error={formErrors.roomType}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="roomType"
                            label="Room Type"
                            id="roomType"
                            type="number"
                            onChange={handleChange}
                            value={editRequestModel.roomType}
                            helperText={formErrors.roomType}
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
