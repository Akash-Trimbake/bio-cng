import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";

const Topbar = () => {
  let active = "text-[#c5c567]";
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname); // Store current path
  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    // Check if token exists in local storage
    const token = JSON.parse(localStorage.getItem("token"));
    // console.log(token.claims.hierarchyLevel);
    setIsLoggedIn(token !== null);
  }, []);

  // Update current path when it changes
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("popstate", handleLocationChange);
    return () => {
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, []);

  const handleLinkClick = () => {
    // Close the navbar
    setIsMenuOpen(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
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
          className={`text-center ${
            isMenuOpen ? "block" : "hidden"
          } md:flex flex-col md:flex-row md:items-center gap-6 text-lg font-semibold mt-4 md:mt-0`}
        >
          <li
            className={`py-1 ${
              currentPath === "/" ? "border-b border-[#c5c567]" : "border-b"
            }`}
          >
            <a
              href="/"
              className={currentPath === "/" ? active : ""}
              onClick={handleLinkClick}
            >
              Home{" "}
            </a>
          </li>

          {token && token.claims && token.claims.hierarchyLevel < 3 ? (
            <li
              className={`py-1 ${
                currentPath === "/dashboard"
                  ? "border-b border-[#c5c567]"
                  : "border-b"
              }`}
            >
              <a
                href="/dashboard"
                className={currentPath === "/dashboard" ? active : ""}
                onClick={handleLinkClick}
              >
                Dashboard{" "}
              </a>
            </li>
          ) : null}

          {token && token.claims && token.claims.hierarchyLevel < 3 ? (
            <li
              className={`py-1 ${
                currentPath === "/customer-data"
                  ? "border-b border-[#c5c567]"
                  : "border-b"
              }`}
            >
              <a
                href="/customer-data"
                className={currentPath === "/customer-data" ? active : ""}
                onClick={handleLinkClick}
              >
                Customer Data{" "}
              </a>
            </li>
          ) : (
            <li
              className={`py-1 ${
                currentPath === "/my-forms"
                  ? "border-b border-[#c5c567]"
                  : "border-b"
              }`}
            >
              <a
                href="/my-forms"
                className={currentPath === "/my-forms" ? active : ""}
                onClick={handleLinkClick}
              >
                My forms{" "}
              </a>
            </li>
          )}

          <li
            className={`py-1 ${
              currentPath === "/contact-us"
                ? "border-b border-[#c5c567]"
                : "border-b"
            }`}
          >
            <a
              href="/contact-us"
              className={currentPath === "/contact-us" ? active : ""}
              onClick={handleLinkClick}
            >
              Contact Us{" "}
            </a>
          </li>
          {isLoggedIn ? (
            <li className="py-1">
              <button
                onClick={logout}
                className="text-white bg-red-500 border border-red-500 hover:bg-gray-50 hover:text-red-500 rounded-lg py-1 px-4"
              >
                Logout
              </button>
            </li>
          ) : (
            <li
              className={`py-1 ${
                currentPath === "/login"
                  ? "border-b-4 border-[#c5c567]"
                  : "border-b"
              }`}
            >
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
