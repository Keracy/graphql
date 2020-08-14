import React from "react";
import Header from "./Header/Header";
import Navigation from "./Navigation/Navigation";
import CurrentTicket from "./CurrentTicket/CurrentTicket";
import s from "./Tickets.module.css";

const Tickets = (props) => {
  return (
    <div className={s.ticketsWrapper}>
      <div className={s.tickets}>
        <Header />
        <div className={s.main}>
          <Navigation/>
          <CurrentTicket id={props.match.params.ticketId} />
        </div>
      </div>
    </div>
  );
};

export default Tickets;
