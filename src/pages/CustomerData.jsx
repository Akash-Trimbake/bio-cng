import { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import GeoForms from "../components/GeoForms";
import UserForms from "../components/UserForms";
import { supabase } from "../helper/supabaseClient";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function CustomerData() {
  const [value, setValue] = useState(0);
  const token = JSON.parse(localStorage.getItem("token"));

  const handleChange = (event, newValue) => {
    // Reset logs state to null when changing tabs

    setValue(newValue);
  };

  const downloadData = async () => {
    try {
      let { data: user_info, error } = await supabase
        .from("logic_form")
        .select("*");

      if (error) {
        throw error;
      }

      // Convert the data to CSV format
      const csvContent =
        "data:text/csv;charset=utf-8," +
        Object.keys(user_info[0]).join(",") +
        "\n" +
        user_info.map((row) => Object.values(row).join(",")).join("\n");

      // Create a CSV file and trigger download
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "user_forms.csv");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center ">
        <div className="mt-4 mb-2 flex flex-col justify-end items-end">
          <button
            onClick={downloadData}
            className="bg-green-500 border border-green-700 hover:text-green-700 hover:bg-gray-50 text-white rounded-lg py-2 px-4 text-center"
          >
            Download data
          </button>
        </div>
        <div className="bg-white w-11/12 md:w-2/3 rounded-lg md:py-4">
          <div>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs value={value} onChange={handleChange} centered>
                <Tab
                  label="District"
                  {...a11yProps(0)}
                  sx={{
                    textTransform: "capitalize",
                    fontSize: "small",
                    margin: 0,
                    padding: 0,
                  }}
                />
                <Tab
                  label="Taluka"
                  {...a11yProps(1)}
                  sx={{
                    textTransform: "capitalize",
                    fontSize: "small",
                    margin: 0,
                    padding: 0,
                  }}
                />
                <Tab
                  label="Executive"
                  {...a11yProps(2)}
                  sx={{
                    textTransform: "capitalize",
                    fontSize: "small",
                    margin: 0,
                    padding: 0,
                  }}
                />
              </Tabs>
            </Box>
            <div className="p-4">
              <CustomTabPanel value={value} index={0}>
                <GeoForms type={"district"} />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <GeoForms type={"taluka"} />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>
                <UserForms type={"executive"} />
              </CustomTabPanel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
