import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import Home from './components/onboard/Home.tsx'
import AccountPage from "./components/account/AccountPage.tsx";

const router = createBrowserRouter([
    // {
    //     path: "/",
    //     element: <Home />,
    // },
    // {
    //     path: "/account",
    //     element: <AccountPage />,
    // },
    {
        path: "/",
        element: <AccountPage />,
    },
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
)