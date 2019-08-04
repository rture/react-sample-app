import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TransactionsView from "./containers/transactionsView/Transactions";
import Transaction from "./components/transaction/Transaction";
import Notfound from "./components/notFound/NotFound";
import "./styles/app.scss";

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={TransactionsView} />
        <Route path="/transaction/:id" component={Transaction} />
        <Route component={Notfound} />
      </Switch>
    </Router>
  </Provider>
);

export default Root;
