import React, { useState, useEffect } from "react";
import Logo from "../assets/logo.png";

const Topbar = () => {
  let active = "text-[#c5c567]";

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Check if token exists in local storage
    const token = localStorage.getItem("token");
    setIsLoggedIn(token !== null);
  }, []);

  // Example: Get the current path from window.location.pathname
  const currentPath = window.location.pathname;

  const handleLinkClick = () => {
    // Close the navbar
    setIsMenuOpen(false);
  };

  return (
    <div className="bg-white">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center px-2 md:px-8 py-3">
        <div className="flex justify-between items-center">
          <img src={Logo} alt="Logo" className="w-36" />
          {/* Hamburger menu icon for mobile */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
        <ul
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:flex flex-col md:flex-row md:items-center gap-6 text-lg font-semibold mt-4 md:mt-0`}
        >
          <li>
            <a
              href="/"
              className={currentPath === "/" ? active : ""}
              onClick={handleLinkClick}
            >
              Home{" "}
            </a>
          </li>
          <li>
            <a
              href="/dashboard"
              className={currentPath === "/dashboard" ? active : ""}
              onClick={handleLinkClick}
            >
              Dashboard{" "}
            </a>
          </li>
          <li>
            <a
              href="/customer-data"
              className={currentPath === "/customer-data" ? active : ""}
              onClick={handleLinkClick}
            >
              Customer Data{" "}
            </a>
          </li>
          <li>
            <a
              href="/contact-us"
              className={currentPath === "/contact-us" ? active : ""}
              onClick={handleLinkClick}
            >
              Contact Us{" "}
            </a>
          </li>
          {localStorage.getItem("token") ? (
            <li>
              <a
                href="/profile"
                className={currentPath === "/profile" ? active : ""}
                onClick={handleLinkClick}
              >
                Profile
              </a>
            </li>
          ) : (
            <li>
              <a
                href="/login"
                className={currentPath === "/login" ? active : ""}
                onClick={handleLinkClick}
              >
                Login{" "}
              </a>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Topbar;
