import React from "react";
import Ticket from "./Ticket/Ticket";
import s from "./TicketsList.module.css";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { chooseTicket } from '../../../redux/actions/actions';
import { GET_TICKETS_QUERY } from "../../../graphql/queries/queries";

const TicketsList = (props) => {
  const { data: tickets, loading } = useQuery(GET_TICKETS_QUERY);
  return !loading ? (
    <div className={s.ticketsList}>
      {tickets.tickets.map((ticket) => {
        return (
          <Link onClick={props.chooseTicket} key={ticket.ticketId} to={`/${ticket.ticketId}`}>
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
const mapDispatchToProps = {
  chooseTicket
}

export default connect(null, mapDispatchToProps)(TicketsList);
