import { gql } from "@apollo/client";

export  const EDIT_STATUS_MUTATION = gql`
    mutation($id: String!, $status: String!){
      editStatus(id: $id, status: $status){
        status
      }
    }
`;
export const registerUserMutation = gql`
  mutation(
    $username: String!
    $password: String!
    $email: String!
    $phone: String!
  ) {
    registerUser(
      username: $username
      password: $password
      email: $email
      phone: $phone
    ) {
      username
      email
      phone
    }
  }
`;
export const deleteTicketQuery = gql`
  mutation($id: String!) {
    deleteTicket(id: $id) {
      status
    }
  }
`;
