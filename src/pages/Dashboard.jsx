import { useState, useEffect } from "react";
import axios from "axios";
import Signup from "./Signup";
import AddDistrict from "../components/AddDistrict";
import AddTaluka from "../components/AddTaluka";
import ShowDistricts from "../components/ShowDistricts";
import ShowTaluka from "../components/ShowTaluka";
import ShowUsers from "../components/ShowUsers";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [talukas, setTalukas] = useState([]);
  const [activeComponent, setActiveComponent] = useState(null);
  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userResponse = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL}/api/user`,
        {
          headers: { Authorization: `Bearer ${token.access}` },
        }
      );
      setUsers(userResponse.data);
    } catch (error) {
      console.log("Error occurred while fetching user data:", error);
    }

    try {
      const districtResponse = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL}/api/district`,
        {
          headers: { Authorization: `Bearer ${token.access}` },
        }
      );
      setDistricts(districtResponse.data);
    } catch (error) {
      console.log("Error occurred while fetching district data:", error);
    }

    try {
      const talukaResponse = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL}/api/subdistrict`,
        {
          headers: { Authorization: `Bearer ${token.access}` },
        }
      );
      setTalukas(talukaResponse.data);
    } catch (error) {
      console.log("Error occurred while fetching taluka data:", error);
    }
  };

  const handleComponentChange = (component) => {
    setActiveComponent(component);
    // Scroll to the component id
    document.getElementById("component").scrollIntoView();
  };

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "AddDistrict":
        return <AddDistrict />;
      case "ShowDistrict":
        return <ShowDistricts districts={districts} />;
      case "AddTaluka":
        return <AddTaluka />;
      case "ShowTaluka":
        return <ShowTaluka talukas={talukas} />;
      case "ShowUsers":
        return <ShowUsers users={users} />;
      default:
        return <Signup />;
    }
  };

  return (
    <div className="h-auto">
      <div className="flex flex-col justify-center items-center">
        <p className="text-center text-lg font-semibold text-white my-2">
          Hello {token.claims.username}{" "}
          {token.claims.district_name
            ? `( ${token.claims.district_name} )`
            : ""}
          {" "}{token.claims.subdristrict_name
            ? `( ${token.claims.subdristrict_name} )`
            : ""}
        </p>
        <div
          className={`grid grid-cols-2 md:${
            token.claims.hierarchyLevel == 1 ? "grid-cols-2" : "grid-cols-3"
          } gap-2 md:gap-4 w-11/12 md:w-4/5 my-4`}
        >
          {token.claims.hierarchyLevel >= 2 && (
            <div className="hidden md:block"></div>
          )}

          <div className="w-full flex flex-col justify-between bg-gray-50 rounded-lg pt-6 pb-2 px-4 md:px-8 shadow-lg">
            <div className="flex flex-row justify-between items-center">
              <h4 className="text-lg font-semibold text-green-700">
                Total Users:
              </h4>
              <p className="text-md font-semibold text-green-600">
                {users.length}
              </p>
            </div>

            <div className="text-center flex flex-col gap-1 my-2">
              <button
                onClick={() => handleComponentChange(null)}
                className="rounded-lg border border-green-700 bg-green-700 text-gray-50 hover:bg-gray-50 hover:text-green-700 font-semibold text-sm py-2 px-4 md:px-6 "
              >
                Add user
              </button>
              <button
                onClick={() => handleComponentChange("ShowUsers")}
                className="rounded-lg border border-green-700 bg-green-700 text-gray-50 hover:bg-gray-50 hover:text-green-700 font-semibold text-sm py-2 px-4 md:px-6 "
              >
                Show users
              </button>
            </div>
          </div>

          {token.claims.hierarchyLevel == 0 && (
            <div className="w-full flex flex-col justify-between bg-gray-50 rounded-lg pt-6 pb-2 px-4 md:px-8 shadow-lg">
              <div className="flex flex-row justify-between items-center">
                <h4 className="text-lg font-semibold text-green-700">
                  Total Districts:
                </h4>
                <p className="text-md font-semibold text-green-600">
                  {districts.length}
                </p>
              </div>
              <div className="text-center flex flex-col gap-1 my-2">
                <button
                  onClick={() => handleComponentChange("AddDistrict")}
                  className="rounded-lg border border-green-700 bg-green-700 text-gray-50 hover:bg-gray-50 hover:text-green-700 font-semibold text-sm py-2 px-4 md:px-6 "
                >
                  Add District
                </button>
                <button
                  onClick={() => handleComponentChange("ShowDistrict")}
                  className="rounded-lg border border-green-700 bg-green-700 text-gray-50 hover:bg-gray-50 hover:text-green-700 font-semibold text-sm py-2 px-4 md:px-6 "
                >
                  Show District
                </button>
              </div>
            </div>
          )}

          {token.claims.hierarchyLevel < 2 && (
            <div className="w-full flex flex-col justify-between bg-gray-50 rounded-lg pt-6 pb-2 px-4 md:px-8 shadow-lg">
              <div className="flex flex-row justify-between items-center">
                <h4 className="text-lg font-semibold text-green-700">
                  Total Talukas:
                </h4>
                <p className="text-md font-semibold text-green-600">
                  {talukas.length}
                </p>
              </div>

              <div className="text-center flex flex-col gap-1 my-2">
                <button
                  onClick={() => handleComponentChange("AddTaluka")}
                  className="rounded-lg border border-green-700 bg-green-700 text-gray-50 hover:bg-gray-50 hover:text-green-700 font-semibold text-sm py-2 px-4 md:px-6 "
                >
                  Add Taluka
                </button>
                <button
                  onClick={() => handleComponentChange("ShowTaluka")}
                  className="rounded-lg border border-green-700 bg-green-700 text-gray-50 hover:bg-gray-50 hover:text-green-700 font-semibold text-sm py-2 px-4 md:px-6 "
                >
                  Show Taluka
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="py-4" id="component">
        {renderActiveComponent()}
      </div>
    </div>
  );
};

export default Dashboard;
