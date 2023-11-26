import React from "react";
import ReactDOM from "react-dom/client";
import {
    BrowserRouter
} from 'react-router-dom';

import { ThemeProvider } from "@gravity-ui/uikit";
import App from "./App.tsx";
import "@gravity-ui/uikit/styles/fonts.scss";
import "@gravity-ui/uikit/styles/styles.scss";
import "./index.scss";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme="light">
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
