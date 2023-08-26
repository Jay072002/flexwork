import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import FlexWorkContextProvider from "./context/ContextStore";
import { Toaster } from "react-hot-toast";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    <div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
    <FlexWorkContextProvider>
      <Router>
        <App />
      </Router>
    </FlexWorkContextProvider>
  </>
);
