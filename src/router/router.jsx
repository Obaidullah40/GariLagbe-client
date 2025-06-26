import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/Home/Home";
import RootLayout from "../layouts/RootLayout";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AddCar from "../pages/AddCar";
import PrivateRoute from "../routes/PrivateRoute";


const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/add-car",
                element: <PrivateRoute><AddCar /></PrivateRoute>
            }
        ],
        // errorElement:<NotFound/>
    },

]);


export default router;