import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { SignUpMutation } from "./schema/user";
import { useNavigate } from "@reach/router";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Navbar from "./Navbar";

function Signup() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    passwordTwo: ""
  });
  const [passwordsMatch, setPasswordsMatch] = useState({
    passwordsMatch: true
  });

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const [
    signUp,
    { loading: mutationLoading, error: mutationError }
  ] = useMutation(SignUpMutation);

  const { username, email, password, passwordTwo } = user;
  return (
    <>
      <Navbar />
      <Paper elevation={3} className="paper">
        Sign Up
        <TextField
          required
          id="outlined-name"
          label="Username"
          name="username"
          value={username}
          onChange={handleChange}
          variant="outlined"
          style={{ margin: 10 }}
        />
        <TextField
          required
          id="outlined-email-input"
          type="email"
          label="Email"
          name="email"
          value={email}
          onChange={handleChange}
          variant="outlined"
          className="text-area"
          style={{ margin: 10 }}
        />
        <TextField
          required
          id="outlined-password-input"
          type="password"
          label="Password"
          name="password"
          value={password}
          onChange={handleChange}
          variant="outlined"
          className="text-area"
          style={{ margin: 10 }}
        />
        <TextField
          required
          id="outlined-passwordTwo-input"
          type="password"
          label="Confirm Password"
          name="passwordTwo"
          value={passwordTwo}
          onChange={handleChange}
          variant="outlined"
          className="text-area"
          style={{ margin: 10 }}
        />
        <Button
          variant="contained"
          onClick={e => {
            e.preventDefault();
            if (password === passwordTwo) {
              signUp({
                variables: {
                  username: user.username,
                  email: user.email,
                  password: user.password
                }
              }).then(
                res => {
                  localStorage.setItem("token", res.data.signUp.token);
                  navigate("/");
                },
                err => {
                  console.log(err);
                }
              );
            } else {
              setPasswordsMatch(false);
            }
          }}
          style={{ margin: 15 }}
        >
          Enter Chat
        </Button>
        {!passwordsMatch && <p>Passwords Don't Match</p>}
        {mutationLoading && <p>Loading...</p>}
        {mutationError && <p>Error</p>}
      </Paper>
    </>
  );
}

export default Signup;
