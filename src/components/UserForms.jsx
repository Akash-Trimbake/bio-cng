import { useState, useEffect } from "react";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormsTable from "./FormsTable";

const UserForms = () => {
  const [selectedUser, setSelectedUser] = useState("");
  const [forms, setForms] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = JSON.parse(localStorage.getItem("token"));
      try {
        const users = await axios.get(
          `${import.meta.env.VITE_APP_BACKEND_BASE_URL}/api/user`,
          {
            headers: { Authorization: `Bearer ${token.access}` },
          }
        );

        console.log("forms users:", users.data);
        setUsers(users.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
  };

  const fetchForms = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      const getUserForms = await axios.get(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }/api/form?user=${selectedUser}`,
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
    }
  };

  return (
    <div className="h-screen">
      <div className="flex flex-row items-center gap-3 ">
        <p className="text-lg text-green-900">Select a User</p>

        <Select
          style={{ flex: 1 }}
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={selectedUser}
          onChange={handleUserChange}
          fullWidth
          variant="standard"
        >
          <MenuItem value="">
            <em>Select a User</em>
          </MenuItem>

          {users.map((user, index) => (
            <MenuItem key={user.id} value={user.username}>
              {user.username}
            </MenuItem>
          ))}
        </Select>
      </div>

      <div className="text-center mt-4">
        <button
          onClick={fetchForms}
          className="bg-green-600 text-white rounded-lg py-1 px-4 w-full my-2 "
        >
          Get Forms
        </button>
      </div>

      {forms.length > 0 && (
        <div className="py-4">
          <FormsTable forms={forms} />
        </div>
      )}
    </div>
  );
};

export default UserForms;
