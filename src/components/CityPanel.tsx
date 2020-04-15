import React from 'react';
import { createStyles, makeStyles, withStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';

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

export default ({viewport, currentPosition, zoom} : any) => {
  const classes = useStyles();
  const [city, setCity] = React.useState('');
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    console.log(event.target.value);
    setCity(event.target.value as string);
    const city = [
      [51.0443141,-114.0632342],  // Calgary
      [43.667472,-79.3960417],   // Toronto
      [49.260938, -123.1169297]  // Vancouver
    ];
    console.log(currentPosition);
    const selectedIndex = event.target.value as number;
    if(Math.abs(currentPosition[0] - city[selectedIndex][0]) > 1 && Math.abs(currentPosition[1] - city[selectedIndex][1]) > 1)  {
      viewport({
        center: [city[selectedIndex][0], city[selectedIndex][1]],
        zoom: 12,
      });
    } else {
      viewport({
        center: [currentPosition[0], currentPosition[1]],
        zoom: zoom,
      });
    }
    

  };
  return (
      <FormControl className={classes.margin}>
        <NativeSelect
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
