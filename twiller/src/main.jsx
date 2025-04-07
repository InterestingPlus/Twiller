import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

import { UserAuthContextProvider } from "./context/userAuthContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserAuthContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserAuthContextProvider>
  </StrictMode>
);
