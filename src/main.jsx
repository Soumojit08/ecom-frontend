import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ClerkProvider } from "@clerk/react";
import { shadcn } from "@clerk/ui/themes";
import AxiosProvider from "./providers/AxiosProvider";
 
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Tooltip } from "./components/ui/tooltip";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <ClerkProvider
      appearance={{
        theme: shadcn,
      }}
    >
      <AxiosProvider>
        <BrowserRouter>
          <Tooltip>
            <App />
          </Tooltip>
        </BrowserRouter>
      </AxiosProvider>
    </ClerkProvider>
  </QueryClientProvider>,
);  
