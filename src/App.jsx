import Home from "./pages/Home";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Error from "./pages/Error";
import Private from "./routes/Private";
import { createBrowserRouter } from "react-router-dom";
import Networks from "./pages/NetWorks";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: (
      <Private>
        <Admin />
      </Private>
    ),
  },
  {
    path: "/admin/social",
    element: (
      <Private>
        <Networks />
      </Private>
    ),
  },
  {
    path: "*",
    element: <Error />,
  },
]);
