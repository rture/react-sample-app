import React from "react";
import { render } from "react-dom";
import { createStore } from "redux";
import transactionsApp from "./reducers";
import App from "./App";

const store = createStore(transactionsApp);

render(<App store={store} />, document.getElementById("root"));
