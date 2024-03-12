import { useState, useEffect } from "react";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormsTable from "./FormsTable";
import CircularProgress from "@mui/material/CircularProgress";

const DailyForms = () => {
  const [selectedUser, setSelectedUser] = useState("");
  const [forms, setForms] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchForms = async () => {
    setLoading(true); // Start loading

    const token = JSON.parse(localStorage.getItem("token"));
    try {
      const getUserForms = await axios.get(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }/api/form?date=${selectedDate}`,
        {
          headers: {
            Authorization: `Bearer ${token.access}`,
          },
        }
      );
      console.log("getUserForms", getUserForms.data);
      setForms(getUserForms.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error if needed
    } finally {
      setLoading(false); // Stop loading regardless of success or failure
    }
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
    <div className="h-screen">
      <div className="flex flex-row items-center gap-3 ">
        <p className="text-lg text-green-900">Select a Date</p>
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          style={{ flex: 1 }}
          className="border border-gray-300 rounded-md p-2 w-full"
        />
      </div>

      <div className="text-center mt-4">
        {loading ? (
          <CircularProgress style={{ color: "green" }} />
        ) : (
          <button
            onClick={fetchForms}
            className="bg-green-600 border border-green-700 hover:text-green-700 hover:bg-gray-50 text-white rounded-lg py-1 px-4 w-full my-2 "
          >
            Get Forms
          </button>
        )}
      </div>

      {forms.length > 0 && (
        <div className="py-4">
          <FormsTable forms={forms} />
        </div>
      )}
    </div>
  );
};

export default DailyForms;
