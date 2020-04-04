import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Link, Grid, makeStyles } from '@material-ui/core';

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary">
      {'Copyright © '}
      <Link color="inherit" href="">
        OBJECTBIT Inc
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Email = () => {
  return (<Typography color="textSecondary">Email: objectbit1@gmail.com</Typography>)
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[800] : theme.palette.grey[800],
  },
}));

export default function StickyFooter() {
  const classes = useStyles();

  return (
    <div>
      <footer className={classes.footer}>
      <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Typography variant="body1" color="textSecondary">
            Icon by <a target="_blank" href="https://loading.io/">loading.io</a>
          </Typography>
          <Copyright />
          <Email/>
          </Grid>
      </footer>
    </div>
  );
}