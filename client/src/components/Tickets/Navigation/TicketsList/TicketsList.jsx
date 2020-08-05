import React from "react";
import Ticket from "./Ticket/Ticket";
import s from "./TicketsList.module.css";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";
import { Link } from "react-router-dom";

const getTicketsQuery = gql`
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

const TicketsList = (props) => {
  const tickets = props.data.tickets;
  return tickets ? (
    <div className={s.ticketsList}>
      {tickets.map((ticket) => {
        return (
          <Link key={ticket.ticketId} to={`/${ticket.ticketId}`}>
            <Ticket
              ticket={ticket}
              key={ticket.ticketId}
              source={ticket.owner.avatar}
              date={ticket.reportedTime}
              asset={ticket.asset.name}
              status={ticket.status}
            />
          </Link>
        );
      })}
    </div>
  ) : (
    <></>
  );
};

export default graphql(getTicketsQuery)(TicketsList);
