import { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import CircularProgress from "@mui/material/CircularProgress";
import toast, { Toaster } from "react-hot-toast";

const AddTaluka = () => {
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [talukaName, setTalukaName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const getDistricts = await axios.get(
          `${import.meta.env.VITE_APP_BACKEND_BASE_URL}/api/district`,
          {
            headers: {
              Authorization: `Bearer ${token.access}`,
            },
          }
        );

        setDistricts(getDistricts.data);
      } catch (error) {
        console.log("Error occurred while fetching data:", error);
      }
    };

    fetchDistricts();
  }, []);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    const token = JSON.parse(localStorage.getItem("token"));
    const dist =
      token.claims.hierarchyLevel == 1
        ? token.claims.district
        : selectedDistrict;
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL}/api/subdistrict`,
        { district: dist, sub_district_name: talukaName },
        {
          headers: {
            Authorization: `Bearer ${token.access}`,
          },
        }
      );
      console.log("response", response);
      toast.success("Taluka created successfully.");
      setTalukaName(""); // Clear the talukaName after successful submission
      setError(""); // Clear any previous error messages
    } catch (error) {
      console.log("Error occurred while adding taluka.", error);
      toast.error("Error occurred while adding taluka."); // Set error message
    } finally {
      setLoading(false); // Stop loading regardless of success or failure
    }
  };

  // Function to handle district name input change
  const handleRoleChange = (event) => {
    setSelectedDistrict(event.target.value);
  };

  // Function to handle taluka name input change
  const handleTalukaChange = (e) => {
    setTalukaName(e.target.value);
  };

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <Toaster position="top-right" reverseOrder={false} />
      <form
        onSubmit={handleSubmit}
        className="w-4/5 md:w-2/3 bg-white p-8 rounded-xl shadow-lg flex flex-col gap-4"
      >
        <div className="text-center">
          <h3 className="font-semibold text-2xl text-green-700">
            Add a new Taluka
          </h3>
        </div>

        <div className="flex flex-row items-center gap-2 ">
          <p>District:</p>

          {token.claims.hierarchyLevel == 1 ? (
            <p>{token && token.claims.district_name}</p>
          ) : (
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={selectedDistrict}
              onChange={handleRoleChange}
              fullWidth
              variant="standard"
            >
              <MenuItem value="">
                <em>Select a district</em>
              </MenuItem>

              {districts
                .filter((district) => district.id !== 0) // Exclude district with ID 0
                .map((district) => (
                  <MenuItem key={district.id} value={district.id}>
                    {district.district_name}
                  </MenuItem>
                ))}
            </Select>
          )}
        </div>

        <div className="flex flex-col">
          <p className="my-0">Taluka Name:</p>
          <TextField
            id="talukaName"
            variant="standard"
            type="text"
            name="talukaName"
            value={talukaName}
            onChange={handleTalukaChange}
            fullWidth
          />
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>}
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

export default AddTaluka;
