import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter, useLocation,
} from 'react-router-dom';
import {ToasterComponent, ToasterProvider} from '@gravity-ui/uikit';

import { ThemeProvider } from "@gravity-ui/uikit";
import * as Sentry from "@sentry/react";
import App from "./App.tsx";
import "@gravity-ui/uikit/styles/fonts.scss";
import "@gravity-ui/uikit/styles/styles.scss";
import "./index.scss";
import { createRoutesFromChildren, useNavigationType } from 'react-router';
import { matchRoutes } from '@remix-run/router';

Sentry.init({
  dsn: "https://a32e2d8024c3773e62833a528e8f47c8@o4506367105171456.ingest.sentry.io/4506367107006464",
  environment: import.meta.env.VITE_NODE_ENV,
  integrations: [
    new Sentry.BrowserTracing({
      routingInstrumentation: Sentry.reactRouterV6Instrumentation(
        React.useEffect,
        useLocation,
        useNavigationType,
        createRoutesFromChildren,
        matchRoutes
      ),
    }),
    new Sentry.Replay(),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});


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
