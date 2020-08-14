import React from "react";
import { useQuery } from "@apollo/client";
import Tickets from "./components/Tickets/Tickets";
import { connect } from "react-redux";
import { BrowserRouter, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { Route } from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage";
import { setUserLogged } from "./components/redux/actions/actions";
import { CHECK_AUTH_QUERY } from "./components/graphql/queries/queries";
import RegisterPage from "./components/RegisterPage/RegisterPage";

function App(props) {
  const { data, loading } = useQuery(CHECK_AUTH_QUERY, {
    variables: {
      token: localStorage.getItem("auth-token"),
    },
  });
  if (data?.checkAuth.logged) {
    props.setUserLogged();
  }
  return (
    <BrowserRouter>
      <div className="App">
          {loading ? (
            <></>
          ) : (
            <>
            <Switch>
              <PrivateRoute
                exact
                path={"/"}
                auth={props.userLogged}
                component={Tickets}
              />
              <Route exact path={"/register"} component={RegisterPage} />
              <Route exact path={"/auth"} component={LoginPage} />
              <PrivateRoute
                exact
                path={"/:ticketId"}
                auth={props.userLogged}
                component={Tickets}
              />
            </Switch>
            </>
          )}
      </div>
    </BrowserRouter>
  );
}
const mapStateToProps = (state) => {
  return {
    userLogged: state.userLogged,
  };
};
const mapDispatchToProps = {
  setUserLogged,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
