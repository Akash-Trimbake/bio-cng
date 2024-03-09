import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const FormsTable = ({ forms }) => {
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
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
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
