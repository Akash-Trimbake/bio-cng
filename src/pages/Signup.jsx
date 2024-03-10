import { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import CircularProgress from "@mui/material/CircularProgress";

const Signup = () => {
  const [roles, setRoles] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [talukas, setTalukas] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    hierarchyLevel: "",
    district: "",
    sub_district: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const token = JSON.parse(localStorage.getItem("token"));
      try {
        const [rolesResponse, districtResponse, talukaResponse] =
          await Promise.all([
            axios.get(
              `${import.meta.env.VITE_APP_BACKEND_BASE_URL}/api/roles`,
              {
                headers: { Authorization: `Bearer ${token.access}` },
              }
            ),
            axios.get(
              `${import.meta.env.VITE_APP_BACKEND_BASE_URL}/api/district`,
              {
                headers: { Authorization: `Bearer ${token.access}` },
              }
            ),
            axios.get(
              `${import.meta.env.VITE_APP_BACKEND_BASE_URL}/api/subdistrict`,
              {
                headers: { Authorization: `Bearer ${token.access}` },
              }
            ),
          ]);

        setRoles(rolesResponse.data);
        setDistricts(districtResponse.data);
        setTalukas(talukaResponse.data);
      } catch (error) {
        console.log("Error occurred while fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle role selection
  const handleRoleChange = (e) => {
    const selectedRoleId = e.target.value;
    setFormData({
      ...formData,
      hierarchyLevel: selectedRoleId,
    });
  };

  // Function to handle district selection
  const handleDistrictChange = (e) => {
    const selectedDistrictId = e.target.value;
    setFormData({
      ...formData,
      district: selectedDistrictId,
    });
  };

  // Function to handle Taluka selection
  const handleTalukaChange = (e) => {
    const selectedTalukaId = e.target.value;
    setFormData({
      ...formData,
      sub_district: selectedTalukaId,
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    const token = JSON.parse(localStorage.getItem("token"));
    try {
      const signup = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL}/api/register`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token.access}`,
          },
        }
      );
      console.log("Signup data", signup);
      // Clear formData after successful signup
      setFormData({
        username: "",
        password: "",
        hierarchyLevel: "",
        district: "",
        sub_district: "",
      });
    } catch (error) {
      console.log("Error occurred while creating user", error);
    } finally {
      setLoading(false); // Stop loading regardless of success or failure
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <form
        onSubmit={handleSubmit}
        className="w-4/5 md:w-2/3 bg-white p-8 rounded-xl shadow-lg flex flex-col gap-4"
      >
        <div className="text-center">
          <h3 className="font-semibold text-2xl text-green-700">
            Create a new user
          </h3>
        </div>
        <div className="flex flex-col">
          <p className="my-0">Username:</p>
          <TextField
            label=""
            variant="standard"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            fullWidth
          />
        </div>
        <div className="flex flex-col">
          <p className="my-0">Password:</p>
          <TextField
            label=""
            variant="standard"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
          />
        </div>
        <div className="flex flex-row items-center gap-2">
          <p>Role:</p>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={formData.hierarchyLevel}
            onChange={handleRoleChange}
            fullWidth
            variant="standard"
          >
            <MenuItem value="">
              <em>Select a role</em>
            </MenuItem>
            {roles
              .filter((role) => role.id !== 0) // Exclude role with ID 0
              .map((role) => (
                <MenuItem key={role.id} value={role.id}>
                  {role.role_name}
                </MenuItem>
              ))}
          </Select>
        </div>

        {formData.hierarchyLevel > 0 && (
          <div className="flex flex-row items-center gap-2">
            <p>District:</p>
            <Select
              labelId="demo-simple-select-standard-label"
              value={formData.district}
              onChange={handleDistrictChange}
              fullWidth
              variant="standard"
            >
              <MenuItem value="">
                <em>Select a District</em>
              </MenuItem>
              {districts.map((district) => (
                <MenuItem key={district.id} value={district.id}>
                  {district.district_name}
                </MenuItem>
              ))}
            </Select>
          </div>
        )}

        {formData.hierarchyLevel > 1 && (
          <div className="flex flex-row items-center gap-2">
            <p>Taluka:</p>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={formData.sub_district}
              onChange={handleTalukaChange}
              fullWidth
              variant="standard"
            >
              <MenuItem value="">
                <em>Select a Taluka</em>
              </MenuItem>
              {talukas.map((taluka) => (
                <MenuItem key={taluka.id} value={taluka.id}>
                  {taluka.sub_district_name}
                </MenuItem>
              ))}
            </Select>
          </div>
        )}

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

export default Signup;
