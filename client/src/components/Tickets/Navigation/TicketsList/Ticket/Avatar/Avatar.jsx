import React from "react";
import s from "./Avatar.module.css";

const Avatar = (props) => {
  return (
    <div>
      <img className={s.avatar} src={props.source} alt="Avatar" />
    </div>
  );
};

export default Avatar;
