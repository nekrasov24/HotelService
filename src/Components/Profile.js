import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';
import 'Styles/RegisterStyle.css';
import axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import React, { useState, useEffect, useContext } from 'react';
import Button from '@material-ui/core/Button';
import AuthContext from '../Contexts/AuthContext/AuthContext';
import { useHistory } from 'react-router-dom';

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

function Profile() {
    const classes = useStyles();
    const history = useHistory();
    const [user, setUser] = useState();
    const _AuthContext = useContext(AuthContext);

    useEffect(() => {
        if (_AuthContext.id) {
            axios.get(`https://localhost:44344/api/user/${_AuthContext.id}`).then((res) => {
                setUser(res.data);
                console.log(res);
            });
        }
    }, [_AuthContext.id]);

    /*const editHandler = useCallback(() => {
        history.push(generatePath('/edit-profile/:userId', _AuthContext.id));
    }, [history, _AuthContext.id]);*/

    const editHandler = () => {
        history.push('/edit-profile/:userId');
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
                            {user && (
                                <Grid item xs={12} sm={6} md={4}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        FirstName: {user.firstName}
                                    </Typography>
                                    <Typography>Last Name: {user.lastName}</Typography>
                                    <Typography> DateOfBirth: {user.dateOfBirth}</Typography>
                                    <Typography> Email: {user.email}</Typography>
                                    <Typography> </Typography>

                                    <Button
                                        size="small"
                                        color="primary"
                                        onClick={editHandler}
                                        //onClick={() => editHandler(_AuthContext.id)}
                                    >
                                        Edit
                                    </Button>
                                </Grid>
                            )}
                        </Grid>
                    </Container>
                </main>
            </React.Fragment>
        </>
    );
}

export default Profile;
