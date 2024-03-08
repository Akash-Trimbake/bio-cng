import React, { useState } from "react";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle form submission, e.g., send data to server
    console.log({
      fullName,
      dob,
      gender,
      address,
      city,
      stateProvince,
      zipCode,
      phoneNumber,
      email,
      adharNo,
      noOfCow,
      farmLocation,
      farmingType,
      farmSize,
      signature,
      date,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Personal Information:</h2>
      <label>
        Full Name:
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Date of Birth:
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
      </label>
      <br />
      <label>
        Gender:
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </label>
      <br />
      <label>
        Address:
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </label>
      <br />
      <label>
        City:
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </label>
      <br />
      <label>
        State/Province:
        <input
          type="text"
          value={stateProvince}
          onChange={(e) => setStateProvince(e.target.value)}
        />
      </label>
      <br />
      <label>
        Zip/Postal Code:
        <input
          type="text"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
        />
      </label>
      <br />
      <label>
        Phone Number:
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </label>
      <br />
      <label>
        Email Address:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <br />
      <label>
        Adhar No:
        <input
          type="text"
          value={adharNo}
          onChange={(e) => setAdharNo(e.target.value)}
        />
      </label>
      <br />
      <h2>Farm Information:</h2>
      <label>
        No Of Cow:
        <input
          type="text"
          value={noOfCow}
          onChange={(e) => setNoOfCow(e.target.value)}
        />
      </label>
      <br />
      <label>
        Farm Location:
        <input
          type="text"
          value={farmLocation}
          onChange={(e) => setFarmLocation(e.target.value)}
        />
      </label>
      <br />
      <label>
        Type of Farming:
        <input
          type="text"
          value={farmingType}
          onChange={(e) => setFarmingType(e.target.value)}
        />
      </label>
      <br />
      <label>
        Size of Farm (in acres/hectares):
        <input
          type="text"
          value={farmSize}
          onChange={(e) => setFarmSize(e.target.value)}
        />
      </label>
      <br />
      <h2>Signature:</h2>
      <label>
        Signature:
        <input type="file" onChange={(e) => setSignature(e.target.files[0])} />
      </label>
      <br />
      <label>
        Date:
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserInfoForm;
