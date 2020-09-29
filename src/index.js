import React from "react";
import ReactDOM from "react-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  split
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "apollo-link-error";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { Router, navigate } from "@reach/router";
import "./index.css";
import App from "./App";
import SignIn from "./SignIn";
import Signup from "./Signup";

const wsLink = new WebSocketLink({
  uri: "ws://localhost:8000/graphql",
  options: {
    reconnect: true
  }
});

const logoutLink = onError(({ networkError }) => {
  if (networkError.statusCode === 400) {
    localStorage.removeItem("token");
    navigate("/");
  } else {
    navigate("/");
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

const httpLinkWithMiddlware = logoutLink.concat(authLink.concat(httpLink));

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLinkWithMiddlware
);

const client = new ApolloClient({
  link: splitLink,
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
