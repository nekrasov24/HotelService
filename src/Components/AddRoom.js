import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import Select from '@material-ui/core/Select';
import { useSnackbar } from 'notistack';
import MenuItem from '@material-ui/core/MenuItem';
import { addRoomEndpoint } from 'utils/apiPathes';
import { Grid } from '@material-ui/core';
import ImageUploader from 'react-images-upload';

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
        marginLeft: 'auto',
        width: '130px',
    },
    imageButton: {
        position: 'relative',
        width: '500px',
        height: '500px',
    },
    imageSrc: {
        position: 'relative',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
    },
    grid: {
        alignItems: 'center',
        display: 'flex',
    },
    rootImage: {
        width: '100%',
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
    },
    tipography: {
        marginTop: '5%',
        alignItems: 'center',
        display: 'flex',
    },
    item: {},
    mainGrid: {
        alignItems: 'flex-start',
    },
    divider: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
    },
    button: {
        alignItems: 'center',
        display: 'flex',
    },
}));

function validateName(name) {
    if (!name) {
        return 'Name is required';
    }
    if (name.length > 10) {
        return 'Name can not longer than 10';
    }
    return '';
}

function validateNumber(number) {
    if (!number) {
        return 'Number is required';
    }
    if (Number(number) < 0) {
        return 'Number can not negative';
    }
    if (Number(number) > 100) {
        return 'Number can not longer than 100';
    }
    return '';
}

function validateNumberOfPeople(numberOfPeople) {
    if (!numberOfPeople) {
        return 'Number Of People is required';
    }
    if (Number(numberOfPeople) < 0) {
        return 'Number Of People can not negative';
    }
    if (Number(numberOfPeople) > 10) {
        return 'Number Of People can not longer than 10';
    }
    return '';
}

function validatePriceForNight(priceForNight) {
    if (!priceForNight) {
        return 'Price For Night is required';
    }
    if (Number(priceForNight) < 0) {
        return 'Price For Night can not negative';
    }
    if (Number(priceForNight) > 1000) {
        return 'Price For Night can not longer than 1000';
    }
    return '';
}

function validateDescription(description) {
    if (!description) {
        return 'Description is required';
    }
    if (description.length > 200) {
        return 'Description can not longer than 200';
    }
    return '';
}

function validateRoomType(roomType) {
    if (!roomType) {
        return 'Image is required';
    }
    return '';
}

function validateImages(pictures) {
    if (!pictures) {
        return 'Image is required';
    }
    return '';
}

const initialState = {
    name: '',
    number: '',
    numberOfPeople: '',
    priceForNight: '',
    description: '',
    roomType: '',
};

function AddRoom() {
    const classes = useStyles();
    const history = useHistory();
    const [addRequestModel, setAddRequestModel] = useState(initialState);
    const { enqueueSnackbar } = useSnackbar();
    const [addImage, setAddImage] = useState({ pictures: [] });

    const [formErrors, setFormErrors] = useState({
        name: '',
        number: '',
        numberOfPeople: '',
        priceForNight: '',
        description: '',
        roomType: '',
        image: '',
        err: '',
    });

    const validate = () => {
        var propErrors = {
            name: '',
            number: '',
            numberOfPeople: '',
            priceForNight: '',
            description: '',
            roomType: '',
            image: '',
        };

        var isValid = true;

        propErrors.name = validateName(addRequestModel.name);
        if (propErrors.name) {
            isValid = false;
        }
        propErrors.number = validateNumber(addRequestModel.number);
        if (propErrors.number) {
            isValid = false;
        }
        propErrors.numberOfPeople = validateNumberOfPeople(addRequestModel.numberOfPeople);
        if (propErrors.numberOfPeople) {
            isValid = false;
        }
        propErrors.priceForNight = validatePriceForNight(addRequestModel.priceForNight);
        if (propErrors.priceForNight) {
            isValid = false;
        }
        propErrors.description = validateDescription(addRequestModel.description);
        if (propErrors.description) {
            isValid = false;
        }
        propErrors.roomType = validateRoomType(addRequestModel.roomType);
        if (propErrors.roomType) {
            isValid = false;
        }

        propErrors.image = validateImages(addImage.pictures.length);
        if (!addImage.pictures.length) {
            isValid = false;
        }

        return { propErrors, isValid };
    };

    const addImageHandler = (file) => {
        setAddImage((pictures) => ({
            ...pictures,
            pictures: file,
        }));
    };

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setAddRequestModel((currentAddRequestModel) => ({
            ...currentAddRequestModel,
            [name]: value,
        }));
    }, []);

    const addRoom = (e) => {
        e.preventDefault();
        const { propErrors, isValid } = validate();

        setFormErrors((formErrors) => ({ ...formErrors, ...propErrors }));

        if (isValid) {
            let formData = new FormData();
            formData.append('name', addRequestModel.name);
            formData.append('number', Number(addRequestModel.number));
            formData.append('numberOfPeople', Number(addRequestModel.numberOfPeople));
            formData.append('priceForNight', Number(addRequestModel.priceForNight));
            formData.append('description', addRequestModel.description);
            formData.append('roomType', Number(addRequestModel.roomType));

            if (addImage.pictures) {
                for (let index = 0; index < addImage.pictures.length; index++) {
                    formData.append(`images`, addImage.pictures[index]);
                }
            }

            axios
                .post(addRoomEndpoint, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                })
                .then((res) => {
                    const responce = res.data;
                    history.push('/roomManagement');
                    enqueueSnackbar(responce, {
                        variant: 'success',
                    });
                })
                .catch((res) => {
                    console.log(res);
                    setFormErrors((formErrors) => ({ ...formErrors, err: [res.response.data] }));
                });
        }
    };

    return (
        <>
            <Container maxWidth="xl">
                <Grid container spacing={3} className={classes.mainGrid} justify="center">
                    <Grid item xs={12} className={classes.tipography} justify="center">
                        <Typography component="h1" variant="h5">
                            Add Room
                        </Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.button} alignContent="flex-start">
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={addRoom}
                        >
                            Save
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} className={classes.item}>
                        <CssBaseline />
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
                                value={addRequestModel.name}
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
                                onChange={handleChange}
                                value={addRequestModel.number}
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
                                value={addRequestModel.numberOfPeople}
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
                                value={addRequestModel.priceForNight}
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
                                multiline
                                rowsMin={4}
                                rowsMax={8}
                                value={addRequestModel.description}
                                helperText={formErrors.description}
                            />
                            <Select
                                error={formErrors.roomType}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="roomType"
                                label="Room Type"
                                id="roomType"
                                onChange={handleChange}
                                value={addRequestModel.roomType}
                                helperText={formErrors.roomType}
                            >
                                <MenuItem value={1}>Standart</MenuItem>
                                <MenuItem value={2}>DeLuxe</MenuItem>
                                <MenuItem value={3}>FamilyRoom</MenuItem>
                                <MenuItem value={4}>Apartament</MenuItem>
                            </Select>
                        </form>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        {formErrors.image && <Alert severity="error">{formErrors.image}</Alert>}
                        <ImageUploader
                            withIcon={true}
                            imgExtension={['.jpg', '.jpeg', '.png']}
                            maxFileSize={5242880}
                            onChange={addImageHandler}
                            withPreview
                        />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default AddRoom;
