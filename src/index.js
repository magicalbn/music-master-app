import React from "react";
import ReactDom from "react-dom";

import App from "./components/App";

import '../src/components/Spinner/spinner.css'
import "./styles/dist/styles.css";




ReactDom.render(<App/>, document.querySelector("#root"));
