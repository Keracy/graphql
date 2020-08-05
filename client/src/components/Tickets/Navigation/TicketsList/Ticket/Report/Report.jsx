import React from "react";

const Report = (props) => {
  const date = `${props.date.slice(8, 10)}/${props.date.slice(
    5,
    7
  )}/${props.date.slice(2, 4)} ${props.date.slice(11, 16)}`;
  return <div>{date}</div>;
};

export default Report;
