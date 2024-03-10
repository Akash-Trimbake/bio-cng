import { useState, useEffect } from "react";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormsTable from "./FormsTable";

const GeoForms = ({ type }) => {
  const [districts, setDistricts] = useState([]);
  const [talukas, setTalukas] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [forms, setForms] = useState([]);

  const handleRoleChange = (event) => {
    setSelectedDistrict(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        if (type === "district") {
          const getDistricts = await axios.get(
            `${import.meta.env.VITE_APP_BACKEND_BASE_URL}/api/district`,
            {
              headers: {
                Authorization: `Bearer ${token.access}`,
              },
            }
          );
          console.log("getDistricts", getDistricts.data);
          setDistricts(getDistricts.data);
        } else {
          // taluka
          const getTalukas = await axios.get(
            `${import.meta.env.VITE_APP_BACKEND_BASE_URL}/api/subdistrict`,
            {
              headers: { Authorization: `Bearer ${token.access}` },
            }
          );
          console.log("getTalukas", getTalukas.data);
          setTalukas(getTalukas.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error if needed
      }
    };

    fetchData();
  }, []);

  const fetchForms = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      if (type === "district") {
        const getDistrictForms = await axios.get(
          `${
            import.meta.env.VITE_APP_BACKEND_BASE_URL
          }/api/form?district=${selectedDistrict}`,
          {
            headers: {
              Authorization: `Bearer ${token.access}`,
            },
          }
        );
        console.log("getDistrictForms", getDistrictForms.data);
        setForms(getDistrictForms.data);
      } else {
        // taluka
        const getTalukaForms = await axios.get(
          `${
            import.meta.env.VITE_APP_BACKEND_BASE_URL
          }/api/form?subdistrict=${selectedDistrict}`,
          {
            headers: { Authorization: `Bearer ${token.access}` },
          }
        );
        console.log("getTalukaForms", getTalukaForms.data);
        setForms(getTalukaForms.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error if needed
    }
  };

  return (
    <div className={`${forms.length > 0 ? "h-full" : "h-screen"}`}>
      <div className="flex flex-row items-center gap-3 ">
        <p className="text-lg text-green-900">
          {type === "district" ? "Select a District" : "Select a Taluka"}:
        </p>

        <Select
          style={{ flex: 1 }}
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={selectedDistrict}
          onChange={handleRoleChange}
          fullWidth
          variant="standard"
        >
          <MenuItem value="">
            <em>Select a {type === "district" ? "District" : "Taluka"}</em>
          </MenuItem>

          {type === "district"
            ? districts
                .filter((district) => district.id !== 0) // Exclude district with ID 0
                .map((district) => (
                  <MenuItem key={district.id} value={district.id}>
                    {district.district_name}
                  </MenuItem>
                ))
            : talukas
                .filter((taluka) => taluka.id !== 0) // Exclude district with ID 0
                .map((taluka) => (
                  <MenuItem key={taluka.id} value={taluka.id}>
                    {taluka.sub_district_name}
                  </MenuItem>
                ))}
        </Select>
      </div>
      <div className="text-center mt-4">
        <button
          onClick={fetchForms}
          className="bg-green-600 border border-green-700 hover:text-green-700 hover:bg-gray-50 text-white rounded-lg py-1 px-4 w-full my-2 "
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

export default GeoForms;
