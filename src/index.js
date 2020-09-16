import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Router } from "@reach/router";
import "./index.css";
import App from "./App";
import SignIn from "./SignIn";
import Signup from "./Signup";

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <App path="/" />
      <SignIn path="/login" />
      <Signup path="/signup" />
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
);
