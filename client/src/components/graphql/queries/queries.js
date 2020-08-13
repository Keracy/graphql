import { gql } from "@apollo/client";

export const checkAuthQuery = gql`
  query($token: String) {
    checkAuth(token: $token) {
      logged
    }
  }
`;
export const getTicketQuery = gql`
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
export const loginUserQuery = gql`
  query($username: String, $password: String) {
    login(username: $username, password: $password) {
      jwt
    }
  }
`;
export const getTicketsQuery = gql`
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
