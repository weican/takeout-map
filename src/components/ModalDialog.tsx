import React, { useState, useReducer, ChangeEvent, useEffect  } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Modal, Backdrop, Fade, Typography, Button, Grid, TextField } from '@material-ui/core';
import { getPlaceData } from '../services/Geocoding';
import { createRestaurant, deleteRestaurant } from '../services/Restaurant';
import { Place } from './Place';
import { AES, enc } from 'crypto-js';
import { partPassword } from './PartPass';

const PlaceData: Place = {
  name: "",
  address: "",
  city: "",
  postcode: "",
  area: "",
  country: "",
  latitude: 0.0,
  longitude: 0.0,
  notes: "",
  phone: "",
  open_time: "",
  website: "",
  updated_at: null
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      height: '60%',
      width: '60%',
    },
    typography: {
        padding: theme.spacing(1),
    },
  }),
);

const reducer = (state: any, {field,value}: any) => {
  return {
    ...state,
    [field]: value
  }
}

export default () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [place, setPlace] = useReducer(reducer, PlaceData);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    const deleteRestaurantAsync = async() => {
      const res = await deleteRestaurant("");
      console.log(res);
    }
    deleteRestaurantAsync();
  };

  const handleConfirm = () => {
    const getPlaceDataAsync = async() => {
      const value = await getPlaceData(place.address);
      // const value = await getPlaceData("8650 112 Ave NW, Calgary, AB T3R 0R5");
      if(value) {
        // console.log(value.results[0].geometry.location);
        const { address_components } = value.results[0];
        address_components.forEach((list:any) => {
          switch(list.types[0]) {
            case 'administrative_area_level_1': 
              setPlace({field: "state", value: list.long_name});
              break;
            case 'postal_code': 
              setPlace({field: "postcode", value: list.long_name});
              break;
            case 'country': 
              setPlace({field: "country", value: list.long_name});
              break;
            case 'locality': 
              setPlace({field: "city", value: list.long_name});
              break;
          }
        });
        const encryptText = AES.encrypt(place.notes,`jNb/Za7huP2Mja=9${partPassword()}`).toString();
        const notesAes = enc.Base64.stringify(enc.Utf8.parse(encryptText));
        setPlace({field: 'notes', value: notesAes});

        const {lat, lng}  = value.results[0].geometry.location;
        setPlace({field: 'latitude', value: lat});
        setPlace({field: 'longitude', value: lng});
      }
      // setPlace({field: 'latitude', value: 51.1242456});
      // setPlace({field: 'longitude', value: -114.2051428});
    }
    getPlaceDataAsync();
    
  }

  useEffect(() => {
    if(place.latitude !== 0.0 && place.longitude !== 0.0) {
      const createRestaurantsAsync = async() => {
          const res = await createRestaurant(place);
          alert(JSON.stringify(res));
          console.log(res);
          setOpen(false);
      }
      console.log(place);
      createRestaurantsAsync();
    }
  }, [place]);

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    setPlace({field: e.target.name, value: e.target.value});
  }

  return (
    <div>
      <Button onClick={handleOpen}><Typography className={classes.typography}>Add Restaurant on Map</Typography></Button>  
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        // onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Add Restaurant</h2>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField name='name' label="Name"  style={{ margin: 8 }} onChange={(e:ChangeEvent<HTMLInputElement>) => handleChange(e)} />
                <TextField name='address' label="Address" onChange={(e:ChangeEvent<HTMLInputElement>) => handleChange(e)} />
                <TextField name="phone" label="Phone" onChange={(e:ChangeEvent<HTMLInputElement>) => handleChange(e)} />
                <TextField name='notes' label="Notes" onChange={(e:ChangeEvent<HTMLInputElement>) => handleChange(e)} />
                <TextField name='website' label="Website" onChange={(e:ChangeEvent<HTMLInputElement>) => handleChange(e)} />
                <TextField name='open_time' label="Open Time" onChange={(e:ChangeEvent<HTMLInputElement>) => handleChange(e)} />
            </form>
            <Grid container
              direction="row"
              justify="space-between"
              alignItems="center">
              
              <Button variant="contained" color="primary" onClick={handleConfirm}>Confirm</Button>
              <Button variant="contained" onClick={handleClose}>Cancel</Button>
              {/* <Button variant="contained" onClick={handleDelete}>Delete</Button> */}
            </Grid>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}