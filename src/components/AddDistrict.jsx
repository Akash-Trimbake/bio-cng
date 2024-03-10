import { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";

const AddDistrict = () => {
  const [districtName, setDistrictName] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    console.log(districtName);
    e.preventDefault();
    setLoading(true); // Start loading

    const token = JSON.parse(localStorage.getItem("token"));
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL}/api/district`,
        { district_name: districtName }, // Assuming you need to send the district name in the request body
        {
          headers: {
            Authorization: `Bearer ${token.access}`,
          },
        }
      );

      console.log("response", response);
      setDistrictName(""); // Clear the districtName after successful submission
    } catch (error) {
      console.log("Error occurred while adding district.", error);
    } finally {
      setLoading(false); // Stop loading regardless of success or failure
    }
  };

  // Function to handle input change
  const handleChange = (e) => {
    setDistrictName(e.target.value);
  };

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <form
        onSubmit={handleSubmit}
        className="w-4/5 md:w-2/3 bg-white p-8 rounded-xl shadow-lg flex flex-col gap-4"
      >
        <div className="text-center">
          <h3 className="font-semibold text-2xl text-green-700">
            Add a new District
          </h3>
        </div>
        <div className="flex flex-col">
          <p className="my-0">District Name:</p>
          <TextField
            id="standard-basic"
            label=""
            variant="standard"
            type="text"
            name="districtName"
            value={districtName}
            onChange={handleChange}
            fullWidth
          />
        </div>
        <div className="text-center">
          {loading ? (
            <CircularProgress style={{ color: "green" }} />
          ) : (
            <button
              type="submit"
              className="bg-green-500 border border-green-700 hover:text-green-700 hover:bg-gray-50 text-white rounded-lg py-2 w-1/3 text-center"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddDistrict;
