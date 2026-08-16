import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ClerkProvider } from "@clerk/react";
 import { shadcn } from "@clerk/ui/themes";

 


createRoot(document.getElementById("root")).render(
  <ClerkProvider
    appearance={{
      theme: shadcn,
    }}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ClerkProvider>,
);
