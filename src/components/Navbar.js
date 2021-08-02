import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Avatar, Drawer } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from 'react-router-dom';
import { useStateValue } from "../StateProvider";
import { auth } from '../firebase';
import { actionTypes } from '../reducer';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  sidemenu: {
    paddingTop: "2vh"
  },

  sidemenu__text: {
    fontSize: "1rem",
    padding:"1rem",
  },

  dispName : {
    textAlign: "right",
    marginRight: "1rem"
  },

  button: {
    marginLeft: "1rem"
  }
}));

export default function Navbar() {

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [{ user }, dispatch] = useStateValue();
  const signout = () => {
    auth.signOut().then((user) =>
      dispatch({
        type: actionTypes.SET_USER,
        user: null,
      })
    );
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {user && (
          <IconButton edge="start" onClick={()=>setOpen(true)} className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> )}
          <Typography variant="h6" className={classes.title}>
            Vocabulary Flashcards
          </Typography>
          {user && (
          <Typography variant="h6" className={classes.dispName}>
            Hello, {user?.displayName}!
          </Typography> )}
          <Avatar src={user?.photoURL}></Avatar>
          {user && <Button onClick={signout} className={classes.button} variant="contained">Sign Out</Button>}
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={open} onClose={()=>setOpen(false)}>
        <div className={classes.sidemenu}>
       <IconButton onClick={()=>setOpen(!open)}>
         <CloseIcon />
       </IconButton>
       <Link to="/newcard" onClick={()=>setOpen(!open)}>
       <Typography className={classes.sidemenu__text} variant="h3">
        Create New Card
       </Typography>
       </Link>
       <Link to="/" onClick={()=>setOpen(!open)}>
       <Typography className={classes.sidemenu__text} variant="h3">
        Card List
       </Typography>
       </Link>
       </div>
      </Drawer>
    </div>
  );
}