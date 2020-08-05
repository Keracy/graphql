import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Tickets from "./components/Tickets/Tickets";
import { Provider } from "react-redux";
import { store } from "./components/redux/store/store";
import { BrowserRouter } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { Route } from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage";
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
});

function App() {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <div className="App">
            <PrivateRoute exact path={"/"} auth={false} component={Tickets} />
            <Route exact path={"/auth"} component={LoginPage} />
          </div>
        </BrowserRouter>
      </ApolloProvider>
    </Provider>
  );
}

export default App;
