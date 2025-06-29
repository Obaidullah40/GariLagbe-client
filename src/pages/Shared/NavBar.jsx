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
            .then(() => {
                Swal.fire("Logged out!", "", "success");
            })
            .catch((err) => console.log(err));
    };

    const navLinks = (
        <>
            <li><NavLink to="/" className="font-semibold">Home</NavLink></li>
            <li><NavLink to="/available-cars" className="font-semibold">Available Cars</NavLink></li>
            {user && (
                <>
                    <li><NavLink to="/add-car" className="font-semibold">Add Car</NavLink></li>
                    <li><NavLink to="/my-cars" className="font-semibold">My Cars</NavLink></li>
                    <li><NavLink to="/my-bookings" className="font-semibold">My Bookings</NavLink></li>
                </>
            )}
        </>
    );

    return (
        <div className="navbar bg-base-100 shadow-sm">
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

            {/* Right: User/Login/Logout + Mobile Menu */}
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
                        <button onClick={handleLogout} className="btn btn-sm btn-error">
                            <FiLogOut className="text-lg" />
                            Logout
                        </button>
                    </>
                ) : (
                    <Link to="/login" className="btn btn-sm btn-primary">Login</Link>
                )}

                {/* Mobile Dropdown Menu */}
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
    );
};


export default NavBar;