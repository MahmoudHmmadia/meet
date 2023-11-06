import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
const client = new QueryClient();
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <BrowserRouter>
    <AppProvider>
      <QueryClientProvider client={client}>
        <App />
      </QueryClientProvider>
    </AppProvider>
  </BrowserRouter>
  // </React.StrictMode>
);
