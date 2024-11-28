import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import Home from './components/onboard/Home.tsx'
import LoginPage from "./components/login/LoginPage.tsx";
import RegisterPage from "./components/register/RegisterPage.tsx";
import AccountPage from "./components/account/AccountPage.tsx";
import Management from "./components/management/Management.tsx";
import DataStatistics from "./components/statistics/DataStatistics.tsx";
import HistoryPage from "./components/history/HistoryPage.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/register",
        element: <RegisterPage />,
    },
    {
        path: "/account",
        element: <AccountPage />,
    },
    {
        path: "/management",
        element: <Management />,
    },
    {
        path: "/statistics",
        element: <DataStatistics />,
    },
    {
        path: "/history",
        element: <HistoryPage />,
    }
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
)