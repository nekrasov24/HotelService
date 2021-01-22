import React, { useState, useEffect } from 'react';
import 'Styles/WelcomeStyle.css';
import axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import StickyHeadTable from 'Components/Table';

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
        id: 'reservStartDate',
        label: 'Reserv Start Date',
        minWidth: 100,
        format: (value) => new Date(value).toLocaleDateString(),
    },
    {
        id: 'reservFinishedDate',
        label: 'Reserv Finished Date',
        minWidth: 100,
        format: (value) => new Date(value).toLocaleDateString(),
    },
    {
        id: 'dateOfPayment',
        label: 'Date Of Payment',
        minWidth: 100,
        format: (value) => new Date(value).toLocaleDateString(),
    },
    {
        id: 'amountPaid',
        label: 'Amount Paid',
        minWidth: 80,
        //format: (value) => Number(value),
    },
    {
        id: 'cancel',
        label: 'Cancel',
        minWidth: 80,
    },
    {
        id: 'details',
        label: 'Details',
        minWidth: 80,
    },
    {
        id: 'pay',
        label: 'Pay',
        minWidth: 80,
    },
];

function HistoryOrders() {
    const classes = useStyles();

    const columnsDate = columns;

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get('https://localhost:44344/api/order/getallorders').then((response) => {
            setOrders(response.data);
            console.log(response.data);
        });
    }, []);

    return (
        <>
            <React.Fragment>
                <CssBaseline />
                <main>
                    <Container className={classes.cardGrid} maxWidth="md">
                        {/* End hero unit */}
                        <StickyHeadTable
                            rows={orders.map((order) => {
                                return {
                                    reservStartDate: order.reservStartDate,
                                    reservFinishedDate: order.reservFinishedDate,
                                    dateOfPayment: order.dateOfPayment,
                                    amountPaid: order.amountPaid,
                                };
                            })}
                            columns={columnsDate}
                        />
                    </Container>
                </main>
            </React.Fragment>
        </>
    );
}

export default HistoryOrders;
