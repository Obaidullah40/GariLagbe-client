import React, { use } from 'react';
import { Link, NavLink } from 'react-router';
import { FiLogOut } from 'react-icons/fi';
import Swal from 'sweetalert2';
import { FaCarAlt } from 'react-icons/fa';
import { AuthContext } from '../../contexts/AuthContext';

const NavBar = () => {
    const { user, logOut } = use(AuthContext);

    const handleLogout = () => {
        logOut()
            .then(() => Swal.fire("Logged out!", "", "success"))
            .catch((err) => console.log(err));
    };

    const linkStyle = ({ isActive }) =>
        isActive
            ? "font-semibold text-white bg-primary px-3 py-2 rounded"
            : "font-semibold text-gray-700 hover:text-primary px-3 py-2 rounded";

    const navLinks = (
        <>
            <li>
                <NavLink to="/" className={linkStyle}>
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink to="/available-cars" className={linkStyle}>
                    Available Cars
                </NavLink>
            </li>
            
            {user && (
                <>
                    <li>
                        <NavLink to="/add-car" className={linkStyle}>
                            Add Car
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/my-cars" className={linkStyle}>
                            My Cars
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/my-bookings" className={linkStyle}>
                            My Bookings
                        </NavLink>
                    </li>
                </>
            )}
            <li>
                <NavLink to="/about" className={linkStyle}>
                    About
                </NavLink>
            </li>
        </>
    );

    return (
        <div className="w-full bg-base-200 shadow-sm sticky top-0 z-50">
            <div className="navbar w-11/12 mx-auto">
                {/* Left: Logo */}
                <div className="navbar-start">
                    <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary">
                        <FaCarAlt className="text-2xl" />
                        GariLagbe
                    </Link>
                </div>

                {/* Center: Menu Links */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 space-x-2 justify-center items-center">
                        {navLinks}
                    </ul>
                </div>

                {/* Right: User/Login/Logout */}
                <div className="navbar-end flex items-center gap-4">
                    {user ? (
                        <>
                            <div className="tooltip tooltip-bottom" data-tip={user.displayName || "User"}>
                                <img
                                    src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                                    className="w-10 h-10 rounded-full border border-gray-300"
                                    alt="user"
                                />
                            </div>
                            <button onClick={handleLogout} className="btn btn-sm btn-error flex items-center gap-1">
                                <FiLogOut className="text-lg" />
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link to="/login" className="btn btn-sm btn-primary">Login</Link>
                    )}

                    {/* Mobile Menu */}
                    <div className="dropdown dropdown-end lg:hidden">
                        <label tabIndex={0} className="btn btn-ghost">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </label>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                        >
                            {navLinks}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
