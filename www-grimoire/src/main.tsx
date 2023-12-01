import React from "react";
import ReactDOM from "react-dom/client";
import {
    BrowserRouter
} from 'react-router-dom';
import {ToasterComponent, ToasterProvider} from '@gravity-ui/uikit';

import { ThemeProvider } from "@gravity-ui/uikit";
import App from "./App.tsx";
import "@gravity-ui/uikit/styles/fonts.scss";
import "@gravity-ui/uikit/styles/styles.scss";
import "./index.scss";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme="light">
        <BrowserRouter>
          <ToasterProvider>
            <App />
            <ToasterComponent />
          </ToasterProvider>
        </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
