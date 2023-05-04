import * as React from "react";
import {createBrowserRouter} from "react-router-dom";
import Charities from "../pages/Charities";
import Charity from "../pages/Charity";
import MinutesList from "../pages/MinutesList";
import MinutesEdit from "../pages/MinutesEdit";
import Members from "../pages/Members";


/**
 * All routes for the application
 * @returns <Routes />
 */
const router = createBrowserRouter([
    {
        path: "/",
        element: <Charities />,
    },
    {
        path: "/:charity_id",
        element: <MinutesList />,
    },
    {
        path: "/:charity_id/:meeting_id/edit",
        element: <MinutesEdit />,
    },
    {
        path: "/:charity_id/members",
        element: <Members />,
    },
    {
        path: "/:charity_id/about",
        element: <Charity />,
    },
]);
export default router;
