// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AppInitializer from "./components/AppInitializer";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/*
      AppInitializer wraps App entirely — it fires before any route
      renders, fetches the user profile, saves to localStorage,
      then shows the app. This guarantees BaseLayout always finds
      user data in localStorage on first render.
    */}
    <AppInitializer>
      <App />
    </AppInitializer>
  </React.StrictMode>
);