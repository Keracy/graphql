import React from "react";
import SearchBar from "./SearchBar/SearchBar";
import TicketsList from "./TicketsList/TicketsList";
import s from "./Navigation.module.css";

const Navigation = () => {
  return (
    <div className={s.nav}>
      <SearchBar />
      <TicketsList />
    </div>
  );
};

export default Navigation;
