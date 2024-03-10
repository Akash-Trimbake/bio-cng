import { useState, useEffect } from "react";
import axios from "axios";
import FormsTable from "../components/FormsTable";
import CircularProgress from "@mui/material/CircularProgress";

const MyForms = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    const fetchMyForms = async () => {
      try {
        const getUserForms = await axios.get(
          `${import.meta.env.VITE_APP_BACKEND_BASE_URL}/api/form?user=${
            token.claims.id
          }`,
          {
            headers: {
              Authorization: `Bearer ${token.access}`,
            },
          }
        );
        console.log("getUserForms", getUserForms.data);
        setForms(getUserForms.data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.log(error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchMyForms();
  }, []);

  return (
    <div className="h-full md:h-screen">
      <div className="flex flex-col justify-center items-center gap-4 py-4">
        <h2 className="text-white font-semibold">My Forms</h2>

        {loading ? (
          <CircularProgress style={{ color: "white" }} /> // Show loading message while fetching data
        ) : forms.length > 0 ? (
          <div className="w-11/12 md:w-2/3 bg-white md:p-8 rounded-md shadow-lg">
            <FormsTable forms={forms} />
          </div>
        ) : (
          <p>Forms not found</p> // Show message when forms data is empty
        )}
      </div>
    </div>
  );
};

export default MyForms;
