import React, { useState, useEffect, useContext } from 'react';
import 'Styles/WelcomeStyle.css';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { converterRoomType } from 'Services/ConverterRoomType';
import Carousel from 'react-material-ui-carousel';
import { converterStatusType } from 'Services/ConverterStatusType';
import {
    Button,
    CardActions,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

import { useSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        height: '200px',
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
    rootImage: {
        width: '100%',
        objectFit: 'fill',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: 'fit-content',
    },
    formControl: {
        marginTop: theme.spacing(2),
        minWidth: 120,
    },
    formControlLabel: {
        marginTop: theme.spacing(1),
    },
}));

function HomePage() {
    const classes = useStyles();
    const [room, setRooms] = useState([]);
    const { enqueueSnackbar } = useSnackbar();
    const [open, setOpen] = React.useState(false);
    const [selectedStartDate, setSelectedStartDate] = React.useState(
        new Date('2021-01-18T21:11:54'),
    );
    const [selectedFinishedDate, setSelectedFinishedDate] = React.useState(
        new Date('2021-01-18T21:11:54'),
    );

    const handleStartDateChange = (date) => {
        setSelectedStartDate(date);
    };

    const handleFinishedDateChange = (date) => {
        setSelectedFinishedDate(date);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        axios.get('https://localhost:44344/api/getallrooms').then((response) => {
            setRooms(response.data);
            console.log(response.data);
        });
    }, []);

    const handleSubmit = (roomId) => {
        const bookData = {
            roomId: roomId,
            reservStartDate: selectedStartDate,
            reservFinishedDate: selectedFinishedDate,
        };
        axios
            .post('https://localhost:44344/api/book', bookData)
            .then((res) => {
                const response = res.data;
                enqueueSnackbar(response, {
                    variant: 'success',
                });
            })
            .catch((res) => {
                console.log(res);
            });
    };

    return (
        <>
            <React.Fragment>
                <CssBaseline />
                <main>
                    <Container className={classes.cardGrid} maxWidth="md">
                        {/* End hero unit */}
                        <Grid container spacing={4}>
                            {room.map((r) => (
                                <Grid item xs={12} sm={6} md={4}>
                                    <Card className={classes.card}>
                                        <Carousel autoPlay={false}>
                                            {r.roomImages.map((i) => (
                                                <div className={classes.rootImage}>
                                                    {
                                                        <img
                                                            src={`https://localhost:44344/rooms${i.imagePath}`}
                                                            alt={i.title}
                                                            className={classes.rootImage}
                                                        />
                                                    }
                                                </div>
                                            ))}
                                        </Carousel>
                                        <CardContent className={classes.cardContent}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                Name: {r.name}
                                            </Typography>
                                            <Typography>Number: {r.number}</Typography>
                                            <Typography>Description: {r.description}</Typography>
                                            <Typography>
                                                {' '}
                                                Number Of People: {r.numberOfPeople}
                                            </Typography>
                                            <Typography> Price: {r.priceForNight}</Typography>
                                            <Typography>
                                                {' '}
                                                Type: {converterRoomType(r.roomType)}
                                            </Typography>
                                            <Typography>
                                                {' '}
                                                Status: {converterStatusType(r.status)}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button
                                                size="small"
                                                color="primary"
                                                onClick={() => handleSubmit(r.id)}
                                            >
                                                Book
                                            </Button>
                                            <Button
                                                size="small"
                                                color="primary"
                                                onClick={handleClickOpen}
                                            >
                                                Choose dates
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                        <Dialog
                            maxWidth="lg"
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="max-width-dialog-title"
                        >
                            <DialogTitle id="max-width-dialog-title">Choose dates</DialogTitle>
                            <DialogContent>
                                <Grid container justify="space-around">
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="MM/dd/yyyy"
                                        margin="normal"
                                        id="date-picker-inline"
                                        label="Date picker inline"
                                        value={selectedStartDate}
                                        onChange={handleStartDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="MM/dd/yyyy"
                                        margin="normal"
                                        id="date-picker-inline"
                                        label="Date picker inline"
                                        value={selectedFinishedDate}
                                        onChange={handleFinishedDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </Grid>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                    Close
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Container>
                </main>
            </React.Fragment>
        </>
    );
}

export default HomePage;
