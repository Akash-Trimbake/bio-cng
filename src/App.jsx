import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Topbar from "./components/Topbar";
import ContactUs from "./pages/ContactUs";
import Profile from "./pages/Profile";
import CustomerData from "./pages/CustomerData";
import PrivateRoutes from "./utils/privateRoutes";
import PublicRoutes from "./utils/publicRoutes";
import UserInfoForm from "./components/UserInfoForm";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <Router>
        <Topbar />
        <div className="h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-600 to-green-900">
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/dashboard" element={<Dashboard />} />

              <Route path="/customer-data" element={<CustomerData />} />
              <Route path="/userInfoForm" element={<UserInfoForm />} />
              <Route path="/register" element={<Signup />} />
            </Route>
            <Route path="/" element={<Home />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route element={<PublicRoutes />}>
              <Route path="/login" element={<Login />} exact />
            </Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
