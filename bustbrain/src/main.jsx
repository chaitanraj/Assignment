import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import Ques2 from "./ques2/ques2"
import Ques3 from "./ques3/ques3";
import Ques1 from "./ques1/ques1";
import Builder from "./builder/builder"
import RenderQ2 from "./renderQ2/renderQ2";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import "./index.css"
import app from "./App"
import RenderQ1 from "./renderQ1/renderQ1";
import RenderQ3 from "./renderQ3/renderQ3"
import Render from "./render/render";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Builder />,
  },
  {
    path: "/render",
    element: <Render />,
  },
  {
    path: "/ques3",
    element: <Ques3 />,
  },
  {
    path: "/ques1",
    element: <Ques1 />
  },
  {
    path: "/renderQ1",
    element: <RenderQ1 />
  },
  {
    path: "/renderQ2",
    element: <RenderQ2 />
  },
  {
    path: "/renderQ3",
    element: <RenderQ3 />
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);