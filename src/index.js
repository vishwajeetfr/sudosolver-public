import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import React from "react";
import ReactDOM from "react-dom/client";

import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Protected from "./components/Protected";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Home />}>
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />
      <Route path="/" element={<Protected />}>
        <Route path="/" index element={<App />} />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);

reportWebVitals();
