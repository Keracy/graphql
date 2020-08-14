import React from "react";
import s from "./Details.module.css";
import Status from "../../Navigation/TicketsList/Ticket/Status/Status";
import CustomSelect from "../CustomSelect/CustomSelect";

const Details = (props) => {
  return (
    <div className={s.detailsWrapper}>
      <div className={s.detailsBlock}>
        <div className={s.detailsTitleBlock}>
          <p className={s.detailsTitle}>Details</p>
        </div>
        <div className={s.detailsContent}>
          <div className={s.field}>
            <p className={s.fieldTitle}>Reported</p>
            {props.report}
          </div>
          <div className={s.field}>
            <p className={s.fieldTitle}>Status</p>
            <CustomSelect status={props.status} id={props.id}/>

          </div>
          <div className={s.field}>
            <p className={s.fieldTitle}>Description</p>
            {props.description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
