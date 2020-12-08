import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { SetToken } from 'Services/LocalStorage';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';

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

    const [deleteRequestModel, setdeleteRequestModel] = useState({
        id: '',
    });

    const [formErrors, setFormErrors] = useState({
        id: '',
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

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setdeleteRequestModel((currentDeleteRequestModel) => ({
            ...currentDeleteRequestModel,
            [name]: value,
        }));
    }, []);

    const deleteRoom = (e) => {
        e.preventDefault();
        const result = validate();
        if (result) {
            setFormErrors((formErrors) => ({ ...formErrors, err: null }));

            const userData = {
                id: deleteRequestModel.id,
            };
            axios
                .post('https://localhost:44344/api/register', userData)
                .then((res) => {
                    const token = res.data;
                    SetToken(token);
                    //var decodeToken = jwt_decode(token);
                    //_AuthContext.setUserData(decodeToken, token);
                    history.push('/HomePage');
                    //enqueueSnackbar('You have successfully logged in!', { variant: 'success' });
                })
                .catch((res) => {
                    console.log(res);
                    setFormErrors((formErrors) => ({ ...formErrors, err: res.response.data }));
                });
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Edit Room
                </Typography>
                <form className={classes.form} noValidate>
                    {formErrors.err && <Alert severity="error">{formErrors.err}</Alert>}
                    <TextField
                        error={formErrors.id}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="id"
                        label="Id"
                        name="id"
                        onChange={handleChange}
                        value={deleteRequestModel.id}
                        helperText={formErrors.id}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={deleteRoom}
                    >
                        Delete Room
                    </Button>
                </form>
            </div>
            <Box mt={5}></Box>
        </Container>
    );
}

export default DeleteRoom;
