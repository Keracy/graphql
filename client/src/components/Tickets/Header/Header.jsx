import React from "react";
import s from "./Header.module.css";
import { CHECK_AUTH_QUERY } from "../../graphql/queries/queries";
import { useQuery } from "@apollo/client";
import { connect } from "react-redux";
import { setUserUnlogged } from "../../redux/actions/actions";

const Header = (props) => {
  const checkAuth = useQuery(CHECK_AUTH_QUERY, {
    variables: { token: localStorage.getItem("auth-token") },
  });
  return (
    <div>
      <div
        style={{
          marginBottom: "-10px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h3>Tickets</h3>
        <h3
          style={{ cursor: "pointer" }}
          onClick={async () => {
            localStorage.clear();
            await checkAuth.refetch();
            props.setUserUnlogged();
          }}
        >
          Log out
        </h3>
      </div>
      <hr className={s.line} />
    </div>
  );
};

const mapDispatchToProps = {
  setUserUnlogged,
};

export default connect(null, mapDispatchToProps)(Header);
