import React, { useState, useEffect } from 'react';
import { createStyles, makeStyles, withStyles, Theme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import { getCategories } from '../services/Categories';

const BootstrapInput = withStyles((theme: Theme) =>
    createStyles({
        root: {
            'label + &': {
                marginTop: theme.spacing(3),
            },
        },
        input: {
            borderRadius: 4,
            position: 'relative',
            backgroundColor: theme.palette.background.paper,
            border: '1px solid #ced4da',
            fontSize: 16,
            padding: '10px 26px 10px 12px',
            transition: theme.transitions.create(['border-color', 'box-shadow']),
            // Use the system font instead of the default Roboto font.
            fontFamily: [
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
            '&:focus': {
                borderRadius: 4,
                borderColor: '#80bdff',
                boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
            },
        },
    }),
)(InputBase);

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        margin: {
            margin: theme.spacing(0),
        },
    }),
);


export default ({onSelectedCategory}: any) => {
    const classes = useStyles();
    const [categoriesList, setCategoriesList] = useState([]);
    const [selectedCategory, setSelectedCatgory] = useState('');
    useEffect(() => {
        const getCategoriesAsync = async () => {
          const categories = await getCategories();
          setCategoriesList(categories._embedded.categories);
        }
        getCategoriesAsync();
    
    }, []);

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedCatgory(event.target.value as string);
        onSelectedCategory(event.target.value as string);
    };

    const renderCategory = () => {
        return categoriesList.map((item: any, index) => {
          return (
            <option value={item.name} key={index}>
                {item.name}
            </option>
          );
        });
    }

    return (
        <FormControl className={classes.margin}>
            <NativeSelect
                value={selectedCategory}
                onChange={handleChange}
                input={<BootstrapInput />}
            >
                {renderCategory()}
            </NativeSelect>
        </FormControl>
    );
}
