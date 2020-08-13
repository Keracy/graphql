import React from "react";
import Ticket from "./Ticket/Ticket";
import s from "./TicketsList.module.css";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { getTicketsQuery } from "../../../graphql/queries/queries";

const TicketsList = (props) => {
  const { data: tickets, loading } = useQuery(getTicketsQuery);
  return !loading ? (
    <div className={s.ticketsList}>
      {tickets.tickets.map((ticket) => {
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

export default TicketsList;
