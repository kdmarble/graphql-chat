import { gql } from "@apollo/client";

const CreateMessageMutation = gql`
  mutation($text: String!, $senderMail: String!, $receiverMail: String!) {
    createMessage(
      text: $text
      senderMail: $senderMail
      receiverMail: $receiverMail
    ) {
      id
      text
      senderMail
      receiverMail
      createdAt
    }
  }
`;

const MessageQuery = gql`
  query {
    messages {
      edges {
        id
        text
        senderMail
        receiverMail
        createdAt
      }
    }
  }
`;

const UserTypingMutation = gql`
  mutation($receiverMail: String!) {
    userTyping(receiverMail: $receiverMail)
  }
`;

const MessageSubscription = gql`
  subscription($receiverMail: String!) {
    messageCreated(receiverMail: $receiverMail) {
      id
      text
      senderMail
      receiverMail
      createdAt
    }
  }
`;

const UserTypingSubscription = gql`
  subscription($receiverMail: String!) {
    userTyping(receiverMail: $receiverMail)
  }
`;

export {
  MessageQuery,
  CreateMessageMutation,
  UserTypingMutation,
  MessageSubscription,
  UserTypingSubscription
};
