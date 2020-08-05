import React from "react";
import Avatar from "./Avatar/Avatar";
import Report from "./Report/Report";
import Asset from "./Asset/Asset";
import Status from "./Status/Status";
import s from "./Ticket.module.css";

const Ticket = (props) => {
  const { source, date, asset, status } = props;
  return (
    <>
      <hr style={{ width: "95%", border: "1px solid #252525" }} />
      <div className={s.ticket}>
        <div className={s.avatarBlock}>
          <Avatar className={s.avatar} source={source} />
        </div>
        <div className={s.reportBlock}>
          <Report className={s.report} date={date} />
        </div>
        <div className={s.assetBlock}>
          <Asset className={s.asset} asset={asset} />
        </div>
        <div className={s.statusBlock}>
          <Status className={s.status} status={status} />
        </div>
      </div>
    </>
  );
};

export default Ticket;
