import { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import FormsTable from "../components/FormsTable";
import GeoForms from "../components/GeoForms";
import UserForms from "../components/UserForms";

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

  const handleChange = (event, newValue) => {
    // Reset logs state to null when changing tabs

    setValue(newValue);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white w-11/12 md:w-2/3 rounded-lg my-4 md:py-4">
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
  );
}
