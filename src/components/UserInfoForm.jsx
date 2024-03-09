import { useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import axios from "axios";

const UserInfoForm = () => {
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [stateProvince, setStateProvince] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [adharNo, setAdharNo] = useState("");
  const [noOfCow, setNoOfCow] = useState("");
  const [farmLocation, setFarmLocation] = useState("");
  const [farmingType, setFarmingType] = useState("");
  const [farmSize, setFarmSize] = useState("");
  const [signature, setSignature] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [receiptNo, setReceiptNo] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    setSelectedImage(URL.createObjectURL(e.target.files[0]));
    setSignature(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = JSON.parse(localStorage.getItem("token"));
    const body = {
      full_name: fullName,
      gender: gender,
      dob: dob,
      address: address,
      city: city,
      state: stateProvince,
      postal_code: zipCode,
      phone: phoneNumber,
      email: email,
      aadhar_number: adharNo,
      cow_count: noOfCow,
      farm_location: farmLocation,
      farming_type: farmingType,
      farm_size: farmSize,
      payment_amount: amount,
      payment_mode: paymentMode, // payment mode : 'cash' or 'upi'
      receipt_number: receiptNo,
      Date: date,
    };

    // Basic validation
    if (
      fullName &&
      dob &&
      gender &&
      address &&
      city &&
      stateProvince &&
      zipCode &&
      phoneNumber &&
      email &&
      adharNo &&
      noOfCow &&
      farmLocation &&
      farmingType &&
      farmSize &&
      amount &&
      paymentMode &&
      receiptNo &&
      signature &&
      date
    ) {
      try {
        const submitForm = await axios.post(
          `${import.meta.env.VITE_APP_BACKEND_BASE_URL}/api/form`,
          body,
          {
            headers: {
              Authorization: `Bearer ${token.access}`,
            },
          }
        );
        console.log("submitForm data", submitForm.data);
        // Clear formData after successful signup
      } catch (error) {
        console.log("Error occurred while submitting Form", error);
      }
    } else {
      // Inform the user to fill all fields
      alert("Please fill all fields before submitting.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center py-4 ">
      <form
        onSubmit={handleSubmit}
        className="w-11/12 md:w-1/2 bg-white rounded-lg py-4 px-4 text-sm"
      >
        <div className="my-2 flex flex-col gap-3 md:gap-4 ">
          <h2 className="text-2xl md:text-4xl font-semibold text-green-900 mb-2">
            Personal Information:
          </h2>

          <div className="flex flex-row items-center gap-2">
            <p className="">Full Name:</p>

            <TextField
              label=""
              variant="standard"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              fullWidth
              style={{ flex: 1 }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2 md:flex-row items-start md:items-center">
              <p className="">Date of Birth:</p>

              <TextField
                label=""
                variant="standard"
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                fullWidth
                style={{ flex: 1 }}
              />
            </div>

            <div className="flex flex-col gap-2 md:flex-row items-start md:items-center">
              <p className="">Gender:</p>

              <Select
                labelId="demo-simple-select-standard-label"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                fullWidth
                variant="standard"
              >
                <MenuItem value="">
                  <em>Select a role</em>
                </MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </div>
          </div>

          <div className="flex flex-row items-center gap-2">
            <p className="">Address:</p>

            <TextField
              label=""
              variant="standard"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              fullWidth
              style={{ flex: 1 }}
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            <div className="flex flex-row items-center gap-2">
              <p className="">State:</p>

              <TextField
                label=""
                variant="standard"
                type="text"
                value={stateProvince}
                onChange={(e) => setStateProvince(e.target.value)}
                fullWidth
                style={{ flex: 1 }}
              />
            </div>

            <div className="flex flex-row items-center gap-2">
              <p className="">City:</p>

              <TextField
                label=""
                variant="standard"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                fullWidth
                style={{ flex: 1 }}
              />
            </div>

            <div className="flex flex-row items-center gap-2 col-span-2 md:col-span-1">
              <p className="">Zip/Postal Code:</p>

              <TextField
                label=""
                variant="standard"
                type="number"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                fullWidth
                style={{ flex: 1 }}
              />
            </div>
          </div>

          <div className="flex flex-row items-center gap-2">
            <p className="">Phone Number:</p>

            <TextField
              label=""
              variant="standard"
              type="number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              fullWidth
              style={{ flex: 1 }}
            />
          </div>
          <div className="flex flex-row items-center gap-2">
            <p className="">Email Address:</p>

            <TextField
              label=""
              variant="standard"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              style={{ flex: 1 }}
            />
          </div>
          <div className="flex flex-row items-center gap-2">
            <p className="">Adhar No:</p>

            <TextField
              label=""
              variant="standard"
              type="number"
              value={adharNo}
              onChange={(e) => setAdharNo(e.target.value)}
              fullWidth
              style={{ flex: 1 }}
            />
          </div>
        </div>
        {/* Farm Information //////////////////////////////////////////////////////////////////////////////////////////// */}

        <div className="my-2 flex flex-col gap-3 md:gap-4 ">
          <h2 className="text-2xl md:text-4xl font-semibold text-green-900 mb-2">
            Farm Information:
          </h2>

          <div className="flex flex-row items-center gap-2">
            <p className="">No. Of Cow:</p>

            <TextField
              label=""
              variant="standard"
              type="number"
              value={noOfCow}
              onChange={(e) => setNoOfCow(e.target.value)}
              fullWidth
              style={{ flex: 1 }}
            />
          </div>

          <div className="flex flex-row items-center gap-2">
            <p className="">Farm Location:</p>

            <TextField
              label=""
              variant="standard"
              type="text"
              value={farmLocation}
              onChange={(e) => setFarmLocation(e.target.value)}
              fullWidth
              style={{ flex: 1 }}
            />
          </div>
          <div className="flex flex-row items-center gap-2">
            <p className="">Type of Farming:</p>

            <TextField
              label=""
              variant="standard"
              type="text"
              value={farmingType}
              onChange={(e) => setFarmingType(e.target.value)}
              fullWidth
              style={{ flex: 1 }}
            />
          </div>

          <div className="flex flex-row items-center gap-2">
            <p className="">Size of Farm (in acres/hectares):</p>

            <TextField
              label=""
              variant="standard"
              type="number"
              value={farmSize}
              onChange={(e) => setFarmSize(e.target.value)}
              fullWidth
              style={{ flex: 1 }}
            />
          </div>
        </div>
        {/* Payment //////////////////////////////////////////////////////////////////////////////////////////// */}
        <div className="my-2 flex flex-col gap-3 md:gap-4 ">
          <h2 className="text-2xl md:text-4xl font-semibold text-green-900 mb-2">
            Payment:
          </h2>

          <div className="flex flex-row items-center gap-2">
            <p className="">Payment amount:</p>

            <TextField
              label=""
              variant="standard"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              fullWidth
              style={{ flex: 1 }}
            />
          </div>

          <div className="flex flex-row items-center gap-2">
            <p className="">Payment mode:</p>

            <Select
              labelId="demo-simple-select-standard-label"
              value={paymentMode}
              onChange={(e) => setPaymentMode(e.target.value)}
              fullWidth
              variant="standard"
              style={{ flex: 1 }}
            >
              <MenuItem value="">
                <em>Select a mode</em>
              </MenuItem>
              <MenuItem value="cash">Cash</MenuItem>
              <MenuItem value="upi">UPI</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </div>

          <div className="flex flex-row items-center gap-2">
            <p className="">Receipt Number:</p>

            <TextField
              label=""
              variant="standard"
              type="number"
              value={receiptNo}
              onChange={(e) => setReceiptNo(e.target.value)}
              fullWidth
              style={{ flex: 1 }}
            />
          </div>
        </div>

        {/* Signature //////////////////////////////////////////////////////////////////////////////////////////// */}

        <div className="flex flex-col gap-2 mt-16">
          <div className="flex flex-row items-center gap-2 w-2/3 md:w-1/3">
            <p className="">Date:</p>

            <TextField
              label=""
              variant="standard"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              fullWidth
              style={{ flex: 1 }}
            />
          </div>
          <label>
            Signature:
            <input type="file" onChange={handleImageChange} />
          </label>

          {selectedImage && (
            <img
              src={selectedImage}
              alt="Selected signature"
              className="w-32 h-16 border"
            />
          )}
        </div>

        <div className="text-center my-4 ">
          <button
            type="submit"
            className="bg-green-600 text-white text-lg font-semibold px-4 py-1 rounded-lg w-1/2"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserInfoForm;
