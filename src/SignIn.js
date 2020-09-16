import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { SignInMutation } from "./schema/user";
import { useNavigate } from "@reach/router";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Navbar from "./Navbar";

function SignIn() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const [
    signIn,
    { loading: mutationLoading, error: mutationError }
  ] = useMutation(SignInMutation);

  const { email, password } = user;
  return (
    <>
      <Navbar />
      <Paper elevation={3} className="paper">
        Sign In
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
        <Button
          variant="contained"
          onClick={e => {
            e.preventDefault();
            signIn({
              variables: {
                login: user.email,
                password: user.password
              }
            }).then(res => {
              localStorage.setItem("token", res.data.signIn.token);
              navigate("/");
            });
          }}
          style={{ margin: 15 }}
        >
          Enter Chat
        </Button>
        {mutationLoading && <p>Loading...</p>}
        {mutationError && <p>Error</p>}
      </Paper>
    </>
  );
}

export default SignIn;
