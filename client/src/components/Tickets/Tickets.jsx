import React from "react";
import Header from "./Header/Header";
import Navigation from "./Navigation/Navigation";
import CurrentTicket from "./CurrentTicket/CurrentTicket";
import s from "./Tickets.module.css";
import { Route } from "react-router-dom";

const Tickets = () => {
  return (
    <div className={s.ticketsWrapper}>
      <div className={s.tickets}>
        <Header />
        <div className={s.main}>
          <Navigation className={s.nav} />
          <Route
            exact
            path={"/:ticketId"}
            className={s.ticket}
            component={CurrentTicket}
          />
        </div>
      </div>
    </div>
  );
};

export default Tickets;
