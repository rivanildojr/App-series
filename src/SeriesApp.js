import React from "react";
import { View } from "react-native";

import { Provider } from "react-redux";
import store from "./store";

import Router from "./Router";

const SeriesApp = prop => (
  <Provider store={store}>
    <Router />
  </Provider>
);

export default SeriesApp;
