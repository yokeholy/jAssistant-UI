/* global document */
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import JAssistant from "./JAssistant";
import * as serviceWorker from "./serviceWorker";
import { createStore } from "redux";
import { Provider } from "react-redux";
import JDataReducer from "./reducers/JDataReducer";

const jData = createStore(JDataReducer);

ReactDOM.render(<Provider store={ jData }><JAssistant /></Provider>, document.getElementById("jAssistantRoot"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
