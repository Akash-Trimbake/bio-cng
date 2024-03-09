import { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const Signup = () => {
  const [roles, setRoles] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    hierarchyLevel: "", // Changed initial value to empty string
  });

  useEffect(() => {
    const fetchRoles = async () => {
      const token = JSON.parse(localStorage.getItem("token"));
      try {
        const getRoles = await axios.get(
          `${import.meta.env.VITE_APP_BACKEND_BASE_URL}/api/roles`,
          {
            headers: {
              Authorization: `Bearer ${token.access}`,
            },
          }
        );
        setRoles(getRoles.data);
      } catch (error) {
        console.log("Error occurred while getting user roles.", error);
      }
    };

    fetchRoles();
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

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
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
      });
    } catch (error) {
      console.log("Error occurred while creating user", error);
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
            Creata a new user
          </h3>
        </div>
        <div className="flex flex-col ">
          <p className="my-0">Username:</p>

          <TextField
            id="standard-basic"
            label=""
            variant="standard"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            fullWidth
          />
        </div>
        <div className="flex flex-col ">
          <p className="my-0">Password:</p>

          <TextField
            id="standard-basic"
            label=""
            variant="standard"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
          />
        </div>
        <div className="flex flex-row items-center gap-2 ">
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
        <div className="text-center">
          <button
            type="submit"
            className="bg-green-500 text-white rounded-lg py-2 w-1/3 text-center"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
