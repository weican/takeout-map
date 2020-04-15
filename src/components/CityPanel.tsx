import React from 'react';
import { createStyles, makeStyles, withStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import { Viewport } from './MapContainer';

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

export default ({viewport} : any) => {
  const classes = useStyles();
  const [city, setCity] = React.useState('');
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    console.log(event.target.value);
    setCity(event.target.value as string);
    const city = [
      [51.0443141,-114.0632342],
      [43.667472,-79.3960417],
      [49.260938, -123.1169297]
    ];
    const index = event.target.value as number;
    viewport({
      center: [city[index][0], city[index][1]],
      zoom: 14,
    });
  };
  return (
      <FormControl className={classes.margin}>
        <NativeSelect
          id="demo-customized-select-native"
          value={city}
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          <option value={0}>Calgary</option>
          <option value={1}>Toronto</option>
          <option value={2}>Vancouver</option>
        </NativeSelect>
      </FormControl>
  );
}
