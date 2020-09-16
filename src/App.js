import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import {
  UserQuery,
  UsersQuery,
  SignInMutation,
  SignUpMutation
} from "./schema/user";
import { useNavigate, Link } from "@reach/router";
import Frontpage from "./Frontpage";
import Navbar from "./Navbar";
import "./App.css";

function App() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const { loading, error, data } = useQuery(UsersQuery);

  if (!token) {
    return (
      <>
        <Navbar />
        <Frontpage />
      </>
    );
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>`Error! ${error.message}`</div>;

  return (
    <div>
      <Navbar />
      {data.users.map(user => (
        <p key={user.id}>
          {user.username} {user.id}
        </p>
      ))}
    </div>
  );
}

export default App;
