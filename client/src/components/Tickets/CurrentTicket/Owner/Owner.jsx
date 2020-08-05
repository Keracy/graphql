import React from "react";
import Avatar from "../../Navigation/TicketsList/Ticket/Avatar/Avatar";
import s from "./Owner.module.css";

const Owner = (props) => {
  return (
    <div className={s.owner}>
      <div className={s.ownerTitleBlock}>
        <p className={s.ownerTitle}>Owner</p>
      </div>
      <div className={s.ownerDetails}>
        <Avatar source={props.source} />
        <div>
          <p
            className={s.ownerName}
          >{`${props.firstName} ${props.lastName}`}</p>
          <p className={`${s.ownerName} ${s.ownerSpec}`}>
            {props.specialities}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Owner;
