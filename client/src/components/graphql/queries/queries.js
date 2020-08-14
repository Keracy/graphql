import { gql } from "@apollo/client";

export const CHECK_AUTH_QUERY = gql`
  query($token: String) {
    checkAuth(token: $token) {
      logged
    }
  }
`;
export const GET_TICKET_QUERY = gql`
  query($id: Int) {
    ticket(id: $id) {
      _id
      ticketId
      number
      lastUpdatedTime
      owner {
        userId
        firstName
        lastName
        avatar
        specialities
      }
      reportedTime
      status
      description
      asset {
        assetId
        name
        geoCode
        kmFrom
        kmTo
      }
    }
  }
`;
export const LOGIN_USER_QUERY = gql`
  query($username: String, $password: String) {
    login(username: $username, password: $password) {
      jwt
    }
  }
`;
export const GET_TICKETS_QUERY = gql`
  {
    tickets {
      ticketId
      number
      lastUpdatedTime
      owner {
        userId
        firstName
        lastName
        avatar
        specialities
      }
      reportedTime
      status
      description
      asset {
        assetId
        name
        geoCode
        kmFrom
        kmTo
      }
    }
  }
`;
