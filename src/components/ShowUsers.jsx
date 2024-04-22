import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";
import { DataGrid } from "@mui/x-data-grid";

const roles = ["Admin", "District Admin", "Taluka Admin", "Customer Executive"];

const ShowUsers = ({ users }) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const [loadingState, setLoadingState] = useState({});

  console.log(users);

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
      // Reload the page after successful deletion
      window.location.reload();
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

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "username", headerName: "UserName", width: 180 },
    {
      field: "location",
      headerName: "Location",
      width: 200,
      valueGetter: (params) =>
        `${params.row.district_name || ""}, ${
          params.row.subdristrict_name || ""
        }`,
    },
    {
      field: "role",
      headerName: "Role",
      width: 180,
      valueGetter: (params) => roles[params.row.hierarchyLevel],
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 130,
      renderCell: (params) => (
        <button
          onClick={() => deleteUser(params.row.id)}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          disabled={loadingState[params.row.id]}
        >
          {loadingState[params.row.id] ? (
            <CircularProgress size={20} />
          ) : (
            "Delete"
          )}
        </button>
      ),
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center h-full overflow-auto">
      <Toaster /> {/* Add Toast container */}
      <div className="w-4/5 md:w-2/3 bg-white p-8 rounded-xl shadow-lg flex flex-col gap-4">
        {users.length ? (
          <DataGrid
            rows={users}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
          />
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </div>
  );
};

export default ShowUsers;
