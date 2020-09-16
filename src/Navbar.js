import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "@reach/router";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

function Navbar(props) {
  const navigate = useNavigate();
  const classes = useStyles();
  const token = localStorage.getItem("token");

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Typography className={classes.title} variant="h6">
          Chatty
        </Typography>
        {token && (
          <Button
            color="inherit"
            onClick={e => {
              e.preventDefault();
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            Log Out
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
