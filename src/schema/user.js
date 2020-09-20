import { gql } from "@apollo/client";

const UserQuery = gql`
  query($id: ID!) {
    user(id: $id) {
      id
      username
      email
      role
      messages {
        id
        text
        senderMail
        receiverMail
        createdAt
      }
    }
  }
`;

const QueryMe = gql`
  query {
    me {
      id
      username
      email
      role
      messages {
        id
        text
        senderMail
        receiverMail
        createdAt
      }
    }
  }
`;

const UsersQuery = gql`
  query {
    users {
      id
      username
      email
      role
      messages {
        id
        text
        senderMail
        receiverMail
        createdAt
      }
    }
  }
`;

const SignUpMutation = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    signUp(username: $username, email: $email, password: $password) {
      token
    }
  }
`;

const SignInMutation = gql`
  mutation($login: String!, $password: String!) {
    signIn(login: $login, password: $password) {
      token
    }
  }
`;

export { UserQuery, QueryMe, UsersQuery, SignUpMutation, SignInMutation };
