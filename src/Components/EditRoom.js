import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';

import { useHistory, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

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

function EditRoom() {
    const classes = useStyles();
    const history = useHistory();
    const [room, setRoom] = useState();
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

    let { roomId } = useParams();

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
        const result = validate();
        if (result) {
            setFormErrors((formErrors) => ({ ...formErrors, err: null }));

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
                    history.push('/HomePage');
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
                            autoComplete="number"
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
                            autoComplete="numberOfPeople"
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
                            autoComplete="priceForNight"
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
