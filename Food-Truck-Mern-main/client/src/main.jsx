import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
// import 'primereact/resources/themes/saga-blue/theme.css'; // Choose your theme
// import 'primereact/resources/primereact.min.css';         // Core CSS
// import 'primeicons/primeicons.css';                      // Icons
// import 'primeflex/primeflex.css';                        // Utility classes


import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "./App.css";
import "./index.css";

import AppProviders from "./providers/AppProvider";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>
);
