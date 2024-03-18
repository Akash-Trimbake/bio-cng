import { useState } from "react";
import axios from "axios";
import FormsTable from "./FormsTable";
import CircularProgress from "@mui/material/CircularProgress";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

const DailyForms = () => {
  const [forms, setForms] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("all");

  const fetchForms = async () => {
    setLoading(true); // Start loading

    const token = JSON.parse(localStorage.getItem("token"));
    try {
      const getUserForms = await axios.get(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }/api/form?date=${selectedDate}`,
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
    } finally {
      setLoading(false); // Stop loading regardless of success or failure
    }
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="h-screen">
      <div className="flex flex-row items-center gap-3 ">
        <p className="text-lg text-green-900">Select a Date</p>
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          style={{ flex: 1 }}
          className="border border-gray-300 rounded-md p-2 w-full"
        />
      </div>

      <div className="text-center mt-4">
        {loading ? (
          <CircularProgress style={{ color: "green" }} />
        ) : (
          <button
            onClick={fetchForms}
            className="bg-green-600 border border-green-700 hover:text-green-700 hover:bg-gray-50 text-white rounded-lg py-1 px-4 w-full my-2 "
          >
            Get Forms
          </button>
        )}
      </div>

      {forms.length > 0 && (
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={selectedOption} // Controlled component: value from state
            onChange={handleRadioChange} // Handler for radio button change
          >
            <FormControlLabel
              value="all"
              control={<Radio />}
              label="All Forms"
            />
            <FormControlLabel
              value="collection"
              control={<Radio />}
              label="Collection"
            />
          </RadioGroup>
        </FormControl>
      )}

      {/* Conditionally render content based on selected radio button option */}
      {selectedOption === "all" && forms.length > 0 && (
        <div className="py-4">
          <FormsTable forms={forms} />
        </div>
      )}

      {selectedOption === "collection" && (
        <div className="py-4">
          {forms.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-2">
                Executive Daily Collections:
              </h2>
              {Object.entries(
                forms.reduce((acc, form) => {
                  if (!acc[form.executive_name]) {
                    acc[form.executive_name] = {
                      count: 1,
                      totalPayment: form.payment_amount,
                    };
                  } else {
                    acc[form.executive_name].count++;
                    acc[form.executive_name].totalPayment +=
                      form.payment_amount;
                  }
                  return acc;
                }, {})
              ).map(([executiveName, { count, totalPayment }]) => (
                <div
                  key={executiveName}
                  className="flex flex-row gap-2 items-center"
                >
                  <p className="text-md font-semibold text-green-900">
                    {executiveName}:
                  </p>
                  <p className="text-sm font-semibold">₹ {totalPayment}</p>
                  <p className="text-sm font-semibold text-gray-600">
                    ( {count} forms )
                  </p>

                  {/* <p>{`${executiveName}: ₹ ${totalPayment} (${count} forms)`}</p> */}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DailyForms;
