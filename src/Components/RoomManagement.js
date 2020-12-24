import React, { useState, useEffect, useContext } from 'react';
import 'Styles/WelcomeStyle.css';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
//import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { converterRoomType } from 'Services/ConverterRoomType';
import { useHistory } from 'react-router-dom';
import { useCallback } from 'react';
import { generatePath } from 'react-router';
import AuthContext from '../Contexts/AuthContext/AuthContext';
import ButtonGroup from '@material-ui/core/CardMedia';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

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
    grid: {
        margin: theme.spacing(4),
    },
    /*rootImage: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },*/
    gridList: {
        width: 500,
        //height: 450,
    },
}));

function RoomManagement() {
    const classes = useStyles();
    const [room, setRooms] = useState([]);
    const history = useHistory();
    const _AuthContext = useContext(AuthContext);

    useEffect(() => {
        axios.get('https://localhost:44344/api/getallrooms').then((response) => {
            setRooms(response.data);
            console.log(response);
        });
    }, []);

    const editHandler = useCallback(
        (roomId) => {
            history.push(
                generatePath('/edit-room/:roomId', {
                    roomId,
                }),
            );
        },
        [history],
    );
    const deleteHandler = useCallback(
        (roomId) => {
            history.push(
                generatePath('/delete-room/:roomId', {
                    roomId,
                }),
            );
        },
        [history],
    );

    const img = {
        cols: 2,
    };

    const addRoomHandler = () => {
        history.push('/addroom');
    };

    return (
        <>
            <React.Fragment>
                <CssBaseline />
                <main>
                    <Container className={classes.cardGrid} maxWidth="md">
                        {/* End hero unit */}
                        <Grid container spacing={4} className={classes.grid}>
                            {_AuthContext.scope === 'Admin' && (
                                <Button color="primary" onClick={addRoomHandler}>
                                    Add Room
                                </Button>
                            )}
                        </Grid>

                        <Grid container spacing={4}>
                            {room.map((r) => (
                                <Grid item xs={12} sm={6} md={4}>
                                    <Card className={classes.card}>
                                        {r.roomImages.map((i) => (
                                            <div>
                                                <div className={classes.rootImage}>
                                                    <GridList
                                                        //cellHeight={500}
                                                        className={classes.gridList}
                                                        cols={3}
                                                    >
                                                        <GridListTile
                                                            key={i.roomId}
                                                            cols={img.cols || 1}
                                                        >
                                                            <img
                                                                src={`data:image/jpeg;base64,${i.imagePath}`}
                                                                alt={i.title}
                                                            />
                                                        </GridListTile>
                                                    </GridList>
                                                </div>
                                                {/* <CardMedia
                                                    component="img"
                                                    key={i.roomId}
                                                    className={classes.cardMedia}
                                                    //image={i.imagePath}
                                                    src={`data:image/jpeg;base64,${i.imagePath}`}
                                                    //title="Image title"
                                                /> */}
                                            </div>
                                        ))}
                                        <CardContent className={classes.cardContent}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {r.name}
                                            </Typography>
                                            <Typography>{r.description}</Typography>
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
                                            <ButtonGroup>
                                                {_AuthContext.scope === 'Admin' && (
                                                    <Button
                                                        size="small"
                                                        color="primary"
                                                        onClick={() => editHandler(r.id)}
                                                    >
                                                        Edit
                                                    </Button>
                                                )}
                                                {_AuthContext.scope === 'Admin' && (
                                                    <Button
                                                        size="small"
                                                        color="primary"
                                                        onClick={() => deleteHandler(r.id)}
                                                    >
                                                        Delete
                                                    </Button>
                                                )}
                                            </ButtonGroup>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </main>
            </React.Fragment>
        </>
    );
}

export default RoomManagement;
