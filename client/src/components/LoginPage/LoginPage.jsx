import React from "react";
import s from "./LoginPage.module.css";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

const loginUserQuery = gql`
  query($username: String, $password: String) {
    login(username: $username, password: $password) {
      jwt
    }
  }
`;

const LoginPage = (props) => {
  const submitHandler = (event) => {
    event.preventDefault();
  };
  return (
    <div className={s.loginWrapper}>
      <div className={s.loginBlock}>
        <form className={s.loginForm} onSubmit={submitHandler}>
          <input className={s.loginInput} placeholder="Login" type="text" />
          <input
            className={s.loginInput}
            placeholder="Password"
            type="password"
          />
          <button className={s.loginButton}>Log in</button>
        </form>
      </div>
    </div>
  );
};

export default graphql(loginUserQuery)(LoginPage);
