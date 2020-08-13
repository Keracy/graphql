import React from "react";
import { useQuery } from "@apollo/client";
import Tickets from "./components/Tickets/Tickets";
import { connect } from "react-redux";
import { BrowserRouter, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { Route } from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage";
import { setUserLogged } from "./components/redux/actions/actions";
import { checkAuthQuery } from "./components/graphql/queries/queries";
import RegisterPage from "./components/RegisterPage/RegisterPage";

function App(props) {
  const { data, loading } = useQuery(checkAuthQuery, {
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
        <Switch>
          {loading ? (
            <></>
          ) : (
            <>
              <PrivateRoute
                exact
                path={"/"}
                auth={props.userLogged}
                component={Tickets}
              />
              <Route exact path={"/auth"} component={LoginPage} />
              <Route exact path={"/register"} component={RegisterPage} />
              <PrivateRoute
                exact
                path={"/:ticketId"}
                auth={props.userLogged}
                component={Tickets}
              />
            </>
          )}
        </Switch>
      </div>
    </BrowserRouter>
  );
}
const mapStateToProps = (state) => {
  return {
    userLogged: state.userLogged,
  };
};
const mapDispathToProps = {
  setUserLogged,
};

export default connect(mapStateToProps, mapDispathToProps)(App);
