import React from "react";
import s from "./Asset.module.css";

const Asset = (props) => {
  return (
    <div className={s.assetWrapper}>
      <div className={s.assetBlock}>
        <div className={s.assetTitleBlock}>
          <p className={s.assetTitle}>Asset</p>
        </div>
        <div className={s.assetContent}>
          <div className={s.field}>
            <p className={s.fieldTitle}>Name</p>
            {props.name}
          </div>
          <div className={s.field}>
            <p className={s.fieldTitle}>GeoCode</p>
            {props.geocode}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Asset;
