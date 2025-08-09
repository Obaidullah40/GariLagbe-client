import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/Home/Home";
import RootLayout from "../layouts/RootLayout";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AddCar from "../pages/AddCar";
import PrivateRoute from "../routes/PrivateRoute";
import MyCars from "../pages/MyCars";
import AvailableCars from "../pages/AvailableCars";
import CarDetails from "../pages/Shared/CarDetails";
import MyBookings from "../pages/MyBookings";
import About from "../pages/About";


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
            },
            {
                path: "/my-cars",
                element: <PrivateRoute><MyCars /></PrivateRoute>
            },
            {
                path: "/available-cars",
                element: <AvailableCars />
            },
            {
                path: "/car/:id",
                element:  <PrivateRoute><CarDetails /></PrivateRoute>
            },
            {
                path: "/my-bookings",
                element: <PrivateRoute><MyBookings /></PrivateRoute>
            },
            {
                path: "/about",
                element: <About />
            },
        ],
        errorElement:<NotFound/>
    },

]);


export default router;