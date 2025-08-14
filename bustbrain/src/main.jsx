import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import Ques2 from "./ques2/ques2"
import Ques3 from "./ques3/ques3";
import Ques1 from "./ques1/ques1";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import "./index.css"
import app from "./App"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Ques2 />,
  },
  {
    path: "/ques3",
    element: <Ques3 />,
  },
  {
    path: "/ques1",
    element: <Ques1 />
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);