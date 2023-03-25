import * as React from "react";
import {createBrowserRouter} from "react-router-dom";
import Login from "../pages/auth/Login";

/**
 * All routes for the application
 * @returns <Routes />
 */
const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    }
]);
export default router;
