import React from "react";
import s from "./SearchBar.module.css";

const SearchBar = () => {
  return (
    <div>
      <input className={s.searchInput} type="text" />
    </div>
  );
};

export default SearchBar;
