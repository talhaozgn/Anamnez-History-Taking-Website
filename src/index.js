import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { ToastContainer } from "react-toastify";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.min.css";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
    <ToastContainer position="bottom-right" />
  </React.StrictMode>,
  document.getElementById("root")
);
