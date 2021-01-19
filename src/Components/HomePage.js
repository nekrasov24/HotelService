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
import Carousel from 'react-material-ui-carousel';
import { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { useHistory } from 'react-router-dom';

import {
    Button,
    CardActions,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';

import { useSnackbar } from 'notistack';
import Alert from '@material-ui/lab/Alert';

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

function validateStartDates(reservStartDate, reservFinishedDate) {
    //if (!reservStartDate) {
    //return 'Please, choose Date';
    //}
    if (reservStartDate >= reservFinishedDate) {
        return 'Start Date can not be less than Finish Date';
    }
    return '';
}

/*function validateFinishDates(reservFinishedDate) {
    if (!reservFinishedDate) {
        return 'Please, choose Date';
    }

    return '';
}*/

function HomePage() {
    const classes = useStyles();
    const [room, setRooms] = useState([]);
    const { enqueueSnackbar } = useSnackbar();
    const [open, setOpen] = React.useState(false);
    const [selectedStartDate, setSelectedStartDate] = React.useState(new Date());
    const [selectedFinishedDate, setSelectedFinishedDate] = React.useState(new Date());
    const history = useHistory();
    const [identificator, setIdentificator] = useState();
    const [startDateOpen, setStartDateOpen] = React.useState(false);
    const [finishDateOpen, setFinishDateOpen] = React.useState(false);

    const [formErrors, setFormErrors] = useState({
        //startDate: '',
        //finishedDate: '',
        err: '',
    });

    const validate = () => {
        var propErrors = {
            /*startDate: '',
            finishedDate: '',*/
            err: '',
        };

        var isValid = true;

        propErrors.err = validateStartDates(selectedStartDate, selectedFinishedDate);
        if (propErrors.err) {
            isValid = false;
        }
        /*propErrors.finishedDate = validateFinishDates(selectedFinishedDate);
        if (propErrors.finishedDate) {
            isValid = false;
        }*/
        return { propErrors, isValid };
    };

    const handleStartDateChange = (date) => {
        setSelectedStartDate(date);
        setStartDateOpen(false);
    };

    const handleFinishedDateChange = (date) => {
        setSelectedFinishedDate(date);
        setFinishDateOpen(false);
    };

    const handleClickOpen = (id) => {
        setOpen(true);
        setIdentificator(id);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseStartDate = () => {
        setStartDateOpen(false);
    };

    const handleCloseFinishDate = () => {
        setFinishDateOpen(false);
    };
    const handleOpenStartDate = () => {
        setStartDateOpen(true);
    };

    const handleOpenFinishDate = () => {
        setFinishDateOpen(true);
    };

    const filterOptions = createFilterOptions({
        matchFrom: 'start',
        stringify: (option) => option.title,
    });

    useEffect(() => {
        axios.get('https://localhost:44344/api/getallrooms').then((response) => {
            setRooms(response.data);
        });
    }, []);

    const handleSubmit = (roomId) => {
        const { propErrors, isValid } = validate();

        setFormErrors((formErrors) => ({ ...formErrors, ...propErrors }));
        console.log(roomId);
        console.log(roomId);
        console.log(roomId);
        if (isValid) {
            const bookData = {
                roomId: identificator,
                reservStartDate: selectedStartDate.toISOString(),
                reservFinishedDate: selectedFinishedDate.toISOString(),
            };

            axios
                .post('https://localhost:44344/api/book', bookData)
                .then((res) => {
                    history.push('/usersbooks');
                    const response = res.data;
                    enqueueSnackbar(response, {
                        variant: 'success',
                    });
                })
                .catch((res) => {
                    const response = res.response.data;
                    console.log(res.data);
                    enqueueSnackbar(response, {
                        variant: 'error',
                    });
                });
        }
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
                                        </CardContent>
                                        <CardActions>
                                            <Button
                                                size="small"
                                                color="primary"
                                                onClick={() => handleClickOpen(r.id)}
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
                                {formErrors.err && <Alert severity="error">{formErrors.err}</Alert>}
                                <Grid container justify="space-around">
                                    <KeyboardDatePicker
                                        error={formErrors.startDate}
                                        helperText={formErrors.startDate}
                                        disableToolbar
                                        variant="inline"
                                        format="MM/dd/yyyy"
                                        margin="normal"
                                        id="date-picker-inline"
                                        label="Date picker inline"
                                        value={selectedStartDate}
                                        onChange={handleStartDateChange}
                                        onClose={handleCloseStartDate}
                                        open={startDateOpen}
                                        onOpen={handleOpenStartDate}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                    <KeyboardDatePicker
                                        error={formErrors.finishedDate}
                                        helperText={formErrors.finishedDate}
                                        disableToolbar
                                        variant="inline"
                                        format="MM/dd/yyyy"
                                        margin="normal"
                                        id="date-picker-inline"
                                        label="Date picker inline"
                                        value={selectedFinishedDate}
                                        onChange={handleFinishedDateChange}
                                        onClose={handleCloseFinishDate}
                                        onOpen={handleOpenFinishDate}
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
                                <Button
                                    size="small"
                                    color="primary"
                                    onClick={() => handleSubmit(identificator)}
                                >
                                    Books
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
