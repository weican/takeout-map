import React, { useState, useReducer, ChangeEvent, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Modal, Backdrop, Fade, Button, Grid, TextField, InputLabel, Select, MenuItem } from '@material-ui/core';
import { updatedRestaurant } from '../services/Restaurant';
import { Place, PlaceData } from './Place';
import { getCategories, createCatgoryWithRestaurant } from '../services/Categories';

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

const reducer = (state: Place, { field, value, action = 'add' }: any) => {

  switch (action) {
    case 'add':
      return {
        ...state,
        [field]: value,
      };
    case 'clear':
      return Object.create(PlaceData);

    default:
      return state;
  }

}

export default ({ openModal, editData, closeModal }: any) => {
  const classes = useStyles();
  const [open] = useState(openModal);
  const [currentPlace] = useState(editData);
  const [place, setPlace] = useReducer(reducer, PlaceData);
  const [categoriesList, setCategoriesList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(editData.category !== null ? editData.category.name: "");

  const handleClose = () => {
    closeModal();
  };

  const handleConfirm = () => {

    const updateRestaurantsAsync = async () => {
      console.log(place);
      place.category = null;
      const res = await updatedRestaurant(place, editData._links.self.href);
      alert(JSON.stringify(res));
      setPlace({ action: 'clear' });
      closeModal();
    }

    updateRestaurantsAsync();
  }
  const handleCategoriesListChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    console.log(event.target.value as string);
    setSelectedCategory(event.target.value as string);
  };

  useEffect(() => {
    const getCategoriesAsync = async () => {
      const categories = await getCategories();
      setCategoriesList(categories._embedded.categories);
    }
    getCategoriesAsync();

    Object.keys(editData).forEach((key:any) => {
      setPlace({field: key, value: editData[key]});
    });

  }, []);

  const handleUpdateCategory = () => {
    const updateCategoryAsync = async () => {
      let link = '';
      categoriesList.forEach((item: any) => {
        if (item.name === selectedCategory) {
          link = item._links.self.href;
          return;
        }
      });
      if (link) {
        const res2 = await createCatgoryWithRestaurant(`${currentPlace._links.self.href}/category`, link);
        console.log(res2);
      }
    }
    updateCategoryAsync();
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPlace({ field: e.target.name, value: e.target.value });
  }

  const renderCategory = () => {
    return categoriesList.map((item: any, index) => {
      return (
        <MenuItem
          value={item.name}
          key={index}>{item.name}
        </MenuItem>

      );
    });
  }

  return (
    <div>
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
            <h2 id="transition-modal-title">Edit Restaurant</h2>
            <form className={classes.root} noValidate autoComplete="off">
              <TextField name='name' label="Name" style={{ margin: 8 }} value={place.name} onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)} />
              <TextField name='address' label="Address" value={place.address} onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)} />
              <TextField name="phone" label="Phone" value={place.phone} onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)} />
              <TextField name='notes' label="Notes" value={place.notes} onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)} />
              <TextField name='website' label="Website" value={place.website} onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)} />
              <TextField name='open_time' label="Open Time" value={place.open_time} onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)} />
              <TextField name='latitude' label="latitude" value={place.latitude} onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)} />
              <TextField name='longitude' label="longitude" value={place.longitude} onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)} />
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                value={selectedCategory}
                onChange={handleCategoriesListChange}
              >
                {renderCategory()}
              </Select>
              <Button variant="outlined" color="primary" onClick={handleUpdateCategory}>Update Category</Button>
            </form>
            <Grid container
              direction="row"
              justify="space-between"
              alignItems="center">

              <Button variant="contained" color="primary" onClick={handleConfirm}>Confirm</Button>
              <Button variant="contained" onClick={handleClose}>Cancel</Button>
              {/* <Button variant="contained" onClick={handleDelete}>Delete</Button> */}
              {/* <Button variant="contained" onClick={handleTransform}>Transform</Button> */}
            </Grid>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}