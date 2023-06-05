import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Localisation from "./components/Localisation";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  // <React.StrictMode>
    <Localisation>
      <App />
    </Localisation>
  // </React.StrictMode>
);
