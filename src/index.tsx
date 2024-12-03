import React from "react";
import ReactDOM from "react-dom/client";
import "./theme/index.scss";
import App from "./App";
import { NavigationContextProvider } from "./features/navigation/NavigationContext";
import { GlobalContextProvider } from "./features/global/GlobalContext";
import PrivateRoute from "./features/auth/PrivateRoute";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <PrivateRoute>
    <GlobalContextProvider>
      <NavigationContextProvider>
        <App />
      </NavigationContextProvider>
    </GlobalContextProvider>
  </PrivateRoute>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
