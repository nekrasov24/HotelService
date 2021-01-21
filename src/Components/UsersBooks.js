import React, { useState, useEffect } from 'react';
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
import StickyHeadTable from 'Components/Table';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
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

const columns = [
    {
        id: 'startDateOfBooking',
        label: 'Start Date OfBooking',
        minWidth: 170,
        format: (value) => new Date(value).toLocaleString(),
    },
    {
        id: 'finishDateOfBooking',
        label: 'Finish Date OfBooking',
        minWidth: 170,
        format: (value) => new Date(value).toLocaleString(),
    },
    {
        id: 'reservStartDate',
        label: 'Reserv Start Date',
        minWidth: 170,
        format: (value) => new Date(value).toLocaleDateString(),
    },
    {
        id: 'reservFinishedDate',
        label: 'Reserv Finished Date',
        minWidth: 100,
        format: (value) => new Date(value).toLocaleDateString(),
    },
    {
        id: 'numberOfNights',
        label: 'Number Of Nights',
        minWidth: 170,
        //format: (value) => Number(value),
    },
    {
        id: 'amountPaid',
        label: 'Amount Paid',
        minWidth: 100,
        //format: (value) => Number(value),
    },
    {
        id: 'cancel',
        label: 'Cancel',
        minWidth: 100,
    },
    {
        id: 'details',
        label: 'details',
        minWidth: 100,
    },
];

function UsersBooks() {
    const classes = useStyles();
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();
    const [open, setOpen] = React.useState(false);
    const [room, setRoom] = useState([]);
    const [roomId, setRoomId] = useState();
    const [id, setId] = useState();

    const columnsDate = columns;

    const [books, setBooks] = useState([]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        axios.get('https://localhost:44344/api/booking/get').then((response) => {
            setBooks(response.data);
            console.log(response.data);
        });
    }, []);

    const cancelReservation = (id) => {
        //setId(identi);

        axios.delete(`https://localhost:44344/api/booking/${id}`).then((res) => {
            const responce = res.data;

            history.push('/HomePage');
            enqueueSnackbar(responce, {
                variant: 'success',
            });
        });
    };

    const showRoom = (roomId) => {
        //setRoomId(Id);

        axios.get(`https://localhost:44344/api/rooms/${roomId}`).then((res) => {
            setRoom(res.data);
            setOpen(true);
        });
    };

    return (
        <>
            <React.Fragment>
                <CssBaseline />
                <main>
                    <Container className={classes.cardGrid} maxWidth="md">
                        {/* End hero unit */}
                        <StickyHeadTable
                            rows={books.map((book) => {
                                return {
                                    startDateOfBooking: book.startDateOfBooking,
                                    finishDateOfBooking: book.finishDateOfBooking,
                                    reservStartDate: book.reservStartDate,
                                    reservFinishedDate: book.reservFinishedDate,
                                    numberOfNights: book.numberOfNights,
                                    amountPaid: book.amountPaid,
                                    cancel: (
                                        <Button
                                            onClick={() => cancelReservation(book.id)}
                                            color="primary"
                                        >
                                            Remove Book
                                        </Button>
                                    ),
                                    details: (
                                        <Button
                                            onClick={() => showRoom(book.roomId)}
                                            onChange={() => handleClickOpen()}
                                            color="primary"
                                        >
                                            Details
                                        </Button>
                                    ),
                                };
                            })}
                            columns={columnsDate}
                        />

                        <Grid container spacing={4}>
                            {/*{room.map((r) => (*/}
                            <Grid item xs={12} sm={6} md={4}>
                                <Dialog
                                    maxWidth="lg"
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="max-width-dialog-title"
                                >
                                    <DialogTitle id="max-width-dialog-title">
                                        Choose dates
                                    </DialogTitle>
                                    <DialogContent>
                                        <Card className={classes.card}>
                                            <CardContent className={classes.cardContent}>
                                                <Typography
                                                    gutterBottom
                                                    variant="h5"
                                                    component="h2"
                                                >
                                                    Name: {room.name}
                                                </Typography>
                                                <Typography>Number: {room.number}</Typography>
                                                <Typography>
                                                    Description: {room.description}
                                                </Typography>
                                                <Typography>
                                                    {' '}
                                                    Number Of People: {room.numberOfPeople}
                                                </Typography>
                                                <Typography>
                                                    {' '}
                                                    Price: {room.priceForNight}
                                                </Typography>
                                                <Typography>
                                                    {' '}
                                                    Type: {converterRoomType(room.roomType)}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose} color="primary">
                                            Close
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </Grid>
                            {/*} ))} */}
                        </Grid>
                    </Container>
                </main>
            </React.Fragment>
        </>
    );
}

export default UsersBooks;
