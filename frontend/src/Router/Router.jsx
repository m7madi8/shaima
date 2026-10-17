import { createBrowserRouter, Navigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Request from "../pages/Request/Request";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { path: "", element: <Home /> },
            { path: "projects", element: <Navigate to="/" replace /> },
            { path: "projects/:id", element: <Navigate to="/" replace /> },
            { path: "request", element: <Request /> },
        ],
    },
    {
        path: "/shaima",
        element: <MainLayout />,
        children: [
            { path: "", element: <Home /> },
            { path: "projects", element: <Navigate to="/" replace /> },
            { path: "projects/:id", element: <Navigate to="/" replace /> },
            { path: "request", element: <Request /> },
        ],
    },
]);

export default router;
