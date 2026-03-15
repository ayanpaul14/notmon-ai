import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { Provider } from 'react-redux'
import store from "./redux/store";

createRoot(document.getElementById("root")).render(
  
<StrictMode>
  <BrowserRouter>
    <Provider store = {store}>
        <App />
            </Provider>
      </BrowserRouter>
  </StrictMode>,

)