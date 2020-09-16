import React from "react";
import { useNavigate } from "@reach/router";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Navbar from "./Navbar";

function Frontpage() {
  const navigate = useNavigate();

  return (
    <Paper elevation={3} className="paper">
      <Button
        variant="contained"
        onClick={e => {
          e.preventDefault();
          navigate("/login");
        }}
        style={{ margin: 15 }}
      >
        Login
      </Button>
      <Button
        variant="contained"
        onClick={e => {
          e.preventDefault();
          navigate("/signup");
        }}
        style={{ margin: 15 }}
      >
        Sign Up
      </Button>
    </Paper>
  );
}

export default Frontpage;
