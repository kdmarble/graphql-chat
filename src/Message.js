import React, { useState, useEffect, useRef } from "react";
import TextField from "@material-ui/core/TextField";
import moment from "moment";
import {
  MessageQuery,
  CreateMessageMutation,
  UserTypingMutation,
  MessageSubscription,
  UserTypingSubscription
} from "./schema/message";
import { useQuery, useMutation, useSubscription } from "@apollo/client";
import { render } from "@testing-library/react";

const Message = props => {
  const chatBox = useRef(null);

  const [message, setMessage] = useState("");

  const [userTyping, setUser] = useState("");

  const [timer, setTimer] = useState(null);

  const [newMessage, setNewMessage] = useState(null);

  const { subscribeToMore, loading, error, data: messageData } = useQuery(
    MessageQuery
  );

  const [
    createMessage,
    { loading: messageLoading, error: messageError }
  ] = useMutation(CreateMessageMutation);

  const messageSub = useSubscription(MessageSubscription, {
    variables: {
      receiverMail: props.receiverMail
    },
    onSubscriptionData: data => {
      setNewMessage(data.subscriptionData.data.messageCreated);
    }
  });

  const handleShow = () => {
    props.setStyle();
  };

  useEffect(() => {
    if (chatBox.current) {
      scrollToBottom();
    }
  });

  const scrollToBottom = () => {
    chatBox.current.scrollIntoView();
  };

  const handleChange = async e => {
    setMessage(e.target.value);
    // const { email, receiverMail } = props;
    // await props.userTyping({
    //   variables: {
    //     email,
    //     receiverMail
    //   }
    // });
    // const changeMail = async () => {
    //   await props.userTyping({
    //     variables: {
    //       email: "email",
    //       receiverMail
    //     }
    //   });
    // };
    // clearTimeout(timer);
    // setTimer(setTimeout(changeMail, 2000));
  };

  const handleSubmit = async (e, message, email) => {
    setMessage("");
    e.preventDefault();
    const { receiverMail } = props;
    if (!message.length) return null;
    await createMessage({
      variables: {
        text: message,
        senderMail: email,
        receiverMail: receiverMail
      }
    });
    // await props.userTyping({
    //   variables: {
    //     email: "email",
    //     receiverMail
    //   }
    // });
  };

  const { email, receiverMail, receiverName, userLeft } = props;

  if (error || loading) return null;

  return (
    <div className="personal-chat" style={props.style}>
      <div className="chats-header">
        <div className="back-button" onClick={handleShow}>
          <div className="bar1" />
          <div className="bar2" />
          <div className="bar3" />
        </div>
        <div className="user-typing">
          {userTyping && userTyping === receiverMail
            ? `${receiverName} is typing`
            : receiverName}
        </div>
      </div>
      <div className="all-messages">
        {messageData.messages.edges.map(item =>
          (item.senderMail === email && item.receiverMail === receiverMail) ||
          (item.senderMail === receiverMail && item.receiverMail === email) ? (
            <div
              key={item.id}
              className={item.email === receiverMail ? "receiver" : "sender"}
            >
              <div className="sender-name">{item.username}</div>
              {item.text}{" "}
              <span className="time"> {moment(item.createdAt).fromNow()}</span>
            </div>
          ) : (
            ""
          )
        )}
        {newMessage && (
          <div
            key={newMessage.id}
            className={
              newMessage.email === receiverMail ? "receiver" : "sender"
            }
          >
            <div className="sender-name">{newMessage.username}</div>
            {newMessage.text}{" "}
            <span className="time">
              {" "}
              {moment(newMessage.createdAt).fromNow()}
            </span>
          </div>
        )}
        {userLeft && userLeft === receiverMail ? (
          <div>{receiverName} has left the chat. </div>
        ) : null}
      </div>
      {receiverMail && receiverName && !userLeft ? (
        <form
          onSubmit={e => handleSubmit(e, message, email)}
          ref={chatBox}
          className="chat-box"
        >
          <TextField
            style={{ margin: 10 }}
            placeholder={"Say something to " + receiverName}
            fullWidth
            name="message"
            value={message}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />
        </form>
      ) : (
        <div className="select-message">
          Select a logged in user from the left panel
        </div>
      )}
    </div>
  );
};

export default Message;
