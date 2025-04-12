import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider.tsx";
import { Provider } from "react-redux";
import store from "./store/store.tsx";
import Modal from "./components/modal/Modal.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      {/* <StrictMode> */}
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <App />
      </ThemeProvider>
      {/* </StrictMode> */}
      <Modal />
    </BrowserRouter>
  </Provider>
);
