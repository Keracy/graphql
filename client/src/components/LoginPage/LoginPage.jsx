import React, { useState } from "react";
import s from "./LoginPage.module.css";
import { useLazyQuery } from "@apollo/client";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { LOGIN_USER_QUERY, CHECK_AUTH_QUERY } from "../graphql/queries/queries";
import { setUserLogged } from "../redux/actions/actions";

const LoginPage = (props) => {
  const [auth, setAuth] = useState({ username: "", password: "" });
  const [login, { data, loading }] = useLazyQuery(LOGIN_USER_QUERY, {
    variables: {
      username: auth.username,
      password: auth.password,
    },
  });

  const [checkAuth, { data: authData }] = useLazyQuery(CHECK_AUTH_QUERY, {
    variables: { token: localStorage.getItem("auth-token") },
  });

  if (!loading && data) {
    localStorage.setItem("auth-token", data.login.jwt);
    if (authData?.checkAuth.logged) {
      props.setUserLogged();
    }
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    login();
    checkAuth();
  };

  const changeHandler = (event) => {
    event.persist();
    setAuth((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  return props.userLogged ? (
    <Redirect to="/1" />
  ) : (
    <div className={s.loginWrapper}>
      <div className={s.loginBlock}>
        <form
          autoComplete="off"
          className={s.loginForm}
          onSubmit={submitHandler}
        >
          <input
            name="username"
            onChange={changeHandler}
            className={s.loginInput}
            placeholder="Login"
            type="text"
          />
          <input
            name="password"
            onChange={changeHandler}
            className={s.loginInput}
            placeholder="Password"
            type="password"
          />
          <p className={s.registerLink}>
            Don't have an account yet?
            <Link to="/register" style={{ color: "#63c" }}>
              Register!
            </Link>
          </p>
          <button className={s.loginButton}>Log in</button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { userLogged: state.userLogged };
};

const mapDispatchToProps = {
  setUserLogged,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
