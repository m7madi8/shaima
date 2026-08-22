import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Projects from "../pages/Projects/Projects";
import ProjectDetail from "../pages/ProjectDetail/ProjectDetail";
import Request from "../pages/Request/Request";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />, // Layout wrapper
        children: [
            { path: "", element: <Home /> }, // default page
            { path: "projects", element: <Projects /> }, // projects page
            { path: "projects/:id", element: <ProjectDetail /> }, // project detail page
            { path: "request", element: <Request /> },
        ],
    },
    {
        path: "/shaima",
        element: <MainLayout />,
        children: [
            { path: "", element: <Home /> },
            { path: "projects", element: <Projects /> },
            { path: "projects/:id", element: <ProjectDetail /> },
            { path: "request", element: <Request /> },
        ],
    },
]);

export default router;
