import { FaFacebookF, FaLinkedinIn, FaGithub, FaCarAlt } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Logo & Brand */}
        <div className="flex flex-col items-start gap-3">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
            <FaCarAlt />
            GariLagbe
          </Link>
          <p className="text-sm text-gray-500">
            Drive Your Dreams Today. Affordable, Reliable, Everywhere.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-lg">Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/available-cars">Available Cars</Link>
          <Link to="/add-car">Add Car</Link>
          <Link to="/my-cars">My Cars</Link>
          <Link to="/my-bookings">My Bookings</Link>
        </div>

        {/* Social Media */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-lg">Follow Us</h3>
          <div className="flex gap-4 mt-1 text-xl">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF className="hover:text-blue-600 transition" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn className="hover:text-blue-500 transition" />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <FaGithub className="hover:text-gray-700 transition" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="text-center text-sm bg-base-300 py-4">
        © {new Date().getFullYear()} GariLagbe — All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
