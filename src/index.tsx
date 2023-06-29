import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/appContext";
import reportWebVitals from "./reportWebVitals";
// import Invoice from "./components/UI/Invoice";
import TestHome from "./components/pages/test.home";
import ReactGA from "react-ga4";
ReactGA.initialize("G-3N5FD42DM3"); //G-3N5FD42DM3  G-5BQSCWVWBM
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
console.log("ReactGA");
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthContextProvider>
  </React.StrictMode>
);

const SendAnalytics = () => {
  ReactGA.send({
    hitType: "pageview",
    page: window.location.pathname,
  });
};

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

reportWebVitals(SendAnalytics);
