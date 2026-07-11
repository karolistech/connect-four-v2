import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

import App from "./components/App";

const rootElement = document.getElementById("root");

if (rootElement === null) {
  throw new Error("Root element not found");
}

const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
