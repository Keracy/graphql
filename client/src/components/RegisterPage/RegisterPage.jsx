import React, { useState } from "react";
import s from "./RegisterPage.module.css";
import { useMutation } from "@apollo/client";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { registerUserMutation } from "../graphql/mutations/mutations";
import { Link } from "react-router-dom";

const RegisterPage = (props) => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
    phone: "",
  });
  const [register] = useMutation(registerUserMutation);
  const submitHandler = async (event) => {
    event.preventDefault();
    await register({
      variables: {
        username: user.username,
        password: user.password,
        email: user.email,
        phone: user.phone,
      },
    });
  };
  const changeHandler = (event) => {
    event.persist();
    setUser((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  return props.userLogged ? (
    <Redirect to="/1" />
  ) : (
    <div className={s.loginWrapper}>
      <div className={s.loginBlock}>
        <form className={s.loginForm} onSubmit={submitHandler}>
          <input
            name="username"
            onChange={changeHandler}
            className={s.loginInput}
            placeholder="Username"
            type="text"
          />
          <input
            name="password"
            onChange={changeHandler}
            className={s.loginInput}
            placeholder="Password"
            type="password"
          />
          <input
            name="email"
            onChange={changeHandler}
            className={s.loginInput}
            placeholder="E-Mail"
            type="text"
          />
          <input
            name="phone"
            onChange={changeHandler}
            className={s.loginInput}
            placeholder="Phone"
            type="text"
          />
          <p className={s.loginLink}>
            Already have an account?
            <Link to="/auth" style={{ color: "#63c" }}>
              Log in!
            </Link>
          </p>
          <button className={s.loginButton}>Register</button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { userLogged: state.userLogged };
};

export default connect(mapStateToProps)(RegisterPage);
