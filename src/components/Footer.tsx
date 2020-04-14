import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Grid, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary">
      {'Copyright © '}
        OBJECTBIT Inc{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Email = () => {
  return (<Typography color="textSecondary">Email: takeout-map@objectbit.ca</Typography>);
}

const TermOfUse = () => {
  return <Link to="/TermOfUse">Term Of Use</Link>
}

const Author = () => {
  return (
  <div>
    <Typography color="textSecondary">Created by: Wales Chang, David Chang</Typography>
    <Icon/>
    <Email/>
  </div>);
}

const Icon = () => {
  return (<Typography variant="body1" color="textSecondary">
  Icon by <a target="_blank" href="https://loading.io/" rel="noopener noreferrer">loading.io</a>
  </Typography>);
}

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <>
      <footer className={classes.footer}>
      <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
         
          <TermOfUse/>
          <Copyright />
          <Author/>
      </Grid>
      </footer>
    </>
  );
}