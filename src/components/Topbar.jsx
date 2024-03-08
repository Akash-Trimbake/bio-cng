import React, { useState, useEffect } from "react";
import Logo from "../assets/logo.png";

const Topbar = () => {
  let active = "text-[#c5c567]";

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if token exists in local storage
    const token = localStorage.getItem("token");
    setIsLoggedIn(token !== null);
  }, []);

  // Example: Get the current path from window.location.pathname
  const currentPath = window.location.pathname;

  return (
    <div className="bg-white">
      <div className="flex flex-row justify-between items-center px-8 py-3">
        <img src={Logo} alt="Logo" className="w-36" />
        <span>
          <ul className="flex flex-row items-center gap-6 text-lg font-semibold">
            <li>
              <a href="/" className={currentPath === "/" ? active : ""}>
                Home{" "}
              </a>
            </li>
            <li>
              <a
                href="/dashboard"
                className={currentPath === "/dashboard" ? active : ""}
              >
                Dashboard{" "}
              </a>
            </li>
            <li>
              <a
                href="/customer-data"
                className={currentPath === "/customer-data" ? active : ""}
              >
                Customer Data{" "}
              </a>
            </li>
            <li>
              <a
                href="/contact-us"
                className={currentPath === "/contact-us" ? active : ""}
              >
                Contact Us{" "}
              </a>
            </li>
            {localStorage.getItem("token") ? (
              <li>
                <a
                  href="/profile"
                  className={currentPath === "/profile" ? active : ""}
                >
                  Profile
                </a>
              </li>
            ) : (
              <li>
                <a
                  href="/login"
                  className={currentPath === "/login" ? active : ""}
                >
                  Login{" "}
                </a>
              </li>
            )}
          </ul>
        </span>
      </div>
    </div>
  );
};

export default Topbar;
