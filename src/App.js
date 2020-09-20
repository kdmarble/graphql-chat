import React, { useState } from "react";
import { useQuery, readQuery } from "@apollo/client";
import { QueryMe, UsersQuery } from "./schema/user";
import { useNavigate, Link } from "@reach/router";
import Frontpage from "./Frontpage";
import Navbar from "./Navbar";
import User from "./User";
import Message from "./Message";
import "./App.css";

function App() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [receiverState, setReceiverState] = useState({
    receiverMail: "",
    receiverName: ""
  });

  const [userLeft, setUserLeft] = useState("");

  const [hidden, setHidden] = useState(false);

  const setSelectedMail = (mail, user) => {
    setReceiverState(receiverState => {
      return { ...receiverState, receiverMail: mail, receiverName: user };
    });
    setHidden(!hidden);
  };

  const setStyle = () => {
    setHidden(!hidden);
  };

  const { receiverMail, receiverName } = receiverState;
  const { loading, error, data } = useQuery(UsersQuery);
  const me = useQuery(QueryMe);

  if (!token || !me.data) {
    return (
      <>
        <Navbar />
        <Frontpage />
      </>
    );
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error! {error.message}</div>;

  return (
    <div className="chat-page">
      <Navbar />
      <User
        style={{ display: hidden ? "none" : "block" }}
        users={data.users}
        email={me.data.me.email}
        name={me.data.me.username}
        selectedMail={setSelectedMail}
      />
      <Message
        style={{ display: hidden ? "block" : "none" }}
        email={me.data.me.email}
        receiverMail={receiverMail}
        receiverName={receiverName}
        userLeft={userLeft}
        name={me.data.me.username}
        setStyle={setStyle}
      />
    </div>
  );
}

export default App;
