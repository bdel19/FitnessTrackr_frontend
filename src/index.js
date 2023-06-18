import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// import { ReactDOM } from "react-dom";
import App from "./components/App";
const root = createRoot(document.getElementById("app"));
root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// const rootElement = document.getElementById("root");

// ReactDOM.createRoot(rootElement).render(<App />);
