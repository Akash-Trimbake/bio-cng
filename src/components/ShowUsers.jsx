import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";

const roles = ["Admin", "District Admin", "Taluka Admin", "Customer Executive"];

const ShowUsers = ({ users }) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const [loadingState, setLoadingState] = useState({});

  const deleteUser = async (userId) => {
    setLoadingState((prevLoadingState) => ({
      ...prevLoadingState,
      [userId]: true, // Set loading state for the clicked row to true
    }));
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL}/api/user/${userId}`,
        {
          headers: { Authorization: `Bearer ${token.access}` },
        }
      );

      console.log("response", response);
      toast.success("User deleted successfully.");
    } catch (error) {
      console.log("error occurred while deleting user", error);
      toast.error("Error occurred while deleting user.");
    } finally {
      setLoadingState((prevLoadingState) => ({
        ...prevLoadingState,
        [userId]: false, // Set loading state for the clicked row back to false after deletion attempt
      }));
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-full overflow-auto">
      <div className="w-4/5 md:w-2/3 bg-white p-8 rounded-xl shadow-lg flex flex-col gap-4">
        {users.length &&
          users.map((user, index) => (
            <ol key={user.id}>
              <li className="flex flex-roe justify-between items-center">
                <p>
                  {index + 1}. {user.username} ( {user.district_name}
                  {", "}
                  {user.subdristrict_name} {", "} {roles[user.hierarchyLevel]} )
                </p>
                <button
                  onClick={() => deleteUser(user.id)}
                  className="py-1 px-2 rounded-lg bg-red-500 text-white"
                >
                  Delete
                </button>
              </li>
            </ol>
          ))}
      </div>
    </div>
  );
};

export default ShowUsers;
