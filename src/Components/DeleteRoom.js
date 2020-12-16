import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useHistory, useParams } from 'react-router-dom';
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

function DeleteRoom() {
    const classes = useStyles();
    const history = useHistory();
    let { roomId } = useParams();
    const [room, setRoom] = useState();

    const [deleteRequestModel, setDeleteRequestModel] = useState({
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

        if (!deleteRequestModel.id) {
            setFormErrors((formErrors) => ({ ...formErrors, id: 'Id is required' }));
            isValid = false;
        } else {
            setFormErrors((formErrors) => ({ ...formErrors, id: '' }));
        }

        return isValid;
    };

    useEffect(() => {
        axios.get(`https://localhost:44344/api/rooms/${roomId}`).then((res) => {
            setRoom(res.data);
            setDeleteRequestModel({
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

    const deleteRoom = (e) => {
        e.preventDefault();
        const result = validate();
        if (result) {
            setFormErrors((formErrors) => ({ ...formErrors, err: null }));
            axios
                .delete(`https://localhost:44344/api/${roomId}`)
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

            <Button
                error={formErrors.name}
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={deleteRoom}
                helperText={formErrors.name}
            >
                Delete Room
            </Button>
        </>
    );
}

export default DeleteRoom;
