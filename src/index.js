import React from "react";
import ReactDOM from "react-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "apollo-link-error";
import { Router, navigate } from "@reach/router";
import "./index.css";
import App from "./App";
import SignIn from "./SignIn";
import Signup from "./Signup";

const logoutLink = onError(({ networkError }) => {
  if (networkError.statusCode === 400) {
    localStorage.removeItem("token");
    navigate("/login");
  }
});

const httpLink = createHttpLink({
  uri: "http://localhost:8000/graphql"
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");

  if (token) {
    return {
      headers: {
        ...headers,
        "x-token": token
      }
    };
  }

  return {
    headers: {
      ...headers
    }
  };
});

const client = new ApolloClient({
  link: logoutLink.concat(authLink.concat(httpLink)),
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
