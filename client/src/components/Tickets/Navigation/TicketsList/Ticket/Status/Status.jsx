import React from "react";
import s from "./Status.module.css";

const Status = (props) => {
  const checkStatus = (status) => {
    if (status === "assigned") return <div style={{ color: "gold" }}>ASD</div>;

    if (status === "unassigned")
      return <div style={{ color: "grey" }}>UNA</div>;

    if (status === "completed") return <div style={{ color: "green" }}>COM</div>;
  };
  const status = checkStatus(props.status);
  return (
    <div className={s.statusWrapper}>
      <div className={s.status}>{status}</div>
    </div>
  );
};

export default Status;
