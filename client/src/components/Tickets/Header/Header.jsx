import React from "react";
import s from "./Header.module.css";
const Header = () => {
  return (
    <div>
      <h3>Tickets</h3>
      <hr className={s.line} />
    </div>
  );
};

export default Header;
