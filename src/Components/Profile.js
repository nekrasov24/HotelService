import { makeStyles } from '@material-ui/core/styles';
import {
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
} from '@material-ui/core';
import 'Styles/RegisterStyle.css';
import axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import React, { useState, useEffect, useContext } from 'react';
import Button from '@material-ui/core/Button';
import AuthContext from '../Contexts/AuthContext/AuthContext';
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
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
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
}));

function validateTopUp(balance) {
    if (balance <= 0) {
        return 'Amount can not be a negative';
    }
    return '';
}

function Profile() {
    const classes = useStyles();
    const history = useHistory();
    const [user, setUser] = useState();
    const _AuthContext = useContext(AuthContext);
    const { enqueueSnackbar } = useSnackbar();
    const [open, setOpen] = React.useState(false);

    const [balance, setBalance] = useState(0);
    const [formErrors, setFormErrors] = useState({
        err: '',
    });

    const validate = () => {
        var propErrors = {
            err: '',
        };

        var isValid = true;

        propErrors.err = validateTopUp(balance);
        if (propErrors.err) {
            isValid = false;
        }

        return { propErrors, isValid };
    };

    const handleClickOpen = (balance) => {
        setOpen(true);
        setBalance(balance);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setBalance(value);
        console.log(value);
    }, []);

    useEffect(() => {
        if (_AuthContext.id) {
            axios.get(`https://localhost:44344/api/user/${_AuthContext.id}`).then((res) => {
                setUser(res.data);
                console.log(res);
            });
        }
    }, [_AuthContext.id]);

    const editHandler = () => {
        history.push('/edit-profile/:userId');
    };

    const historyOrders = () => {
        history.push('/historyorders');
    };

    const topUpBalance = () => {
        const { propErrors, isValid } = validate();

        setFormErrors((formErrors) => ({ ...formErrors, ...propErrors }));

        if (isValid) {
            const balanceData = {
                balance: Number(balance),
            };

            console.log(balanceData);

            axios
                .post('https://localhost:44344/api/topup', balanceData)
                .then((res) => {
                    history.push('/HomePage');
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
                        <Grid container spacing={4} justify="center" alignItems="center">
                            {user && (
                                <Grid item xs={12} sm={6} md={4}>
                                    <Card className={classes.card}>
                                        <CardContent className={classes.cardContent}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                FirstName: {user.firstName}
                                            </Typography>
                                            <Typography>Last Name: {user.lastName}</Typography>
                                            <Typography>
                                                DateOfBirth:{' '}
                                                {new Date(user.dateOfBirth)
                                                    .toISOString()
                                                    .slice(0, 10)}
                                            </Typography>
                                            <Typography> Email: {user.email}</Typography>
                                            <Typography> Balance: {user.accountBalance}</Typography>
                                            <Button
                                                size="small"
                                                color="primary"
                                                onClick={editHandler}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                size="small"
                                                color="primary"
                                                onClick={() =>
                                                    handleClickOpen(Number(user.accountBalance))
                                                }
                                            >
                                                Top Up Balance
                                            </Button>
                                            <Button
                                                size="small"
                                                color="primary"
                                                onClick={historyOrders}
                                            >
                                                History Orders
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )}
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
                                    <TextField
                                        error={formErrors.name}
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="userBalance"
                                        label="Balance"
                                        name="userBalance"
                                        type="number"
                                        autoFocus
                                        value={balance.userBalance}
                                        onChange={handleChange}
                                        helperText={formErrors.name}
                                    />
                                </Grid>
                            </DialogContent>
                            <DialogActions>
                                <Button size="small" color="primary" onClick={topUpBalance}>
                                    Top Up
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Container>
                </main>
            </React.Fragment>
        </>
    );
}

export default Profile;
