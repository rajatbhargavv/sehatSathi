import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./app/routes/AppRoutes";
import { AppProvider } from "./app/providers/AppProvider";
import "./styles/colors.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  </React.StrictMode>
);
