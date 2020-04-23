import React, { useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Moment from 'react-moment';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export interface NotificationProps {
  openDialog: boolean,
  message: string,
  duration: number
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default ({openDialog, message, duration}: NotificationProps) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [displayMessage] = React.useState(message);

  useEffect(() => {
    setOpen(openDialog);
  },[openDialog]);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={duration} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
            Restaurants added <Moment fromNow>{displayMessage}</Moment>
        </Alert>
      </Snackbar>
    </div>
  );
}
