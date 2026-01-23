import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { GlobalProvider } from "./GlobalState/globalstate.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <GlobalProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </GlobalProvider>
  </BrowserRouter>,
);
