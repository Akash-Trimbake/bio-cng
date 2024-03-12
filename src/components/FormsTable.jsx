import { useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import toast, { Toaster } from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";

const FormsTable = ({ forms }) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const [loadingState, setLoadingState] = useState({}); // Track loading state for each row

  const deleteForm = async (formId) => {
    setLoadingState((prevLoadingState) => ({
      ...prevLoadingState,
      [formId]: true, // Set loading state for the clicked row to true
    }));
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL}/api/form/${formId}`,
        {
          headers: { Authorization: `Bearer ${token.access}` },
        }
      );

      console.log("response", response);
      toast.success("Form deleted successfully.");
    } catch (error) {
      console.log("error occurred while deleting form", error);
      toast.error("Error occurred while deleting form.");
    } finally {
      setLoadingState((prevLoadingState) => ({
        ...prevLoadingState,
        [formId]: false, // Set loading state for the clicked row back to false after deletion attempt
      }));
    }
  };

  // Define columns for the DataGrid
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "full_name", headerName: "Full Name", width: 150 },
    { field: "gender", headerName: "Gender", width: 120 },
    { field: "dob", headerName: "Date of Birth", width: 150 },
    { field: "address", headerName: "Address", width: 150 },
    { field: "city", headerName: "City", width: 120 },
    { field: "state", headerName: "State", width: 120 },
    { field: "postal_code", headerName: "Postal Code", width: 130 },
    { field: "phone", headerName: "Phone", width: 130 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "aadhar_number", headerName: "Aadhar Number", width: 180 },
    { field: "cow_count", headerName: "Cow Count", width: 130 },
    { field: "farm_location", headerName: "Farm Location", width: 180 },
    { field: "farming_type", headerName: "Farming Type", width: 180 },
    { field: "farm_size", headerName: "Farm Size", width: 130 },
    { field: "payment_amount", headerName: "Payment Amount", width: 160 },
    { field: "payment_mode", headerName: "Payment Mode", width: 160 },
    { field: "receipt_number", headerName: "Receipt Number", width: 160 },
    { field: "Date", headerName: "Date", width: 130 },
    {
      field: "delete",
      headerName: " ",
      width: 130,
      renderCell: (params) => (
        <button
          onClick={() => deleteForm(params.row.id)}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          disabled={loadingState[params.row.id]} // Disable button when loading state for this row is true
        >
          {loadingState[params.row.id] ? (
            <CircularProgress size={20} /> // Show loader if loading state for this row is true
          ) : (
            "Delete" // Show "Delete" text if loading state for this row is false
          )}
        </button>
      ),
    },
  ];

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Toaster position="top-right" reverseOrder={false} />
      <DataGrid
        rows={forms}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
      />
    </div>
  );
};

export default FormsTable;
