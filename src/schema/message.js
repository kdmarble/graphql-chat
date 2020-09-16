import { graphql, gql } from "@apollo/client";

const CreateMessageMutation = graphql(
  gql`
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
  `,
  {
    options: {
      context: {
        headers: {
          "x-token": localStorage.getItem("token")
        }
      }
    }
  }
);

export { CreateMessageMutation };
