import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const login = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL}/api/login`,
        formData
      );

      // console.log("login data", login);

      if (login) {
        localStorage.setItem("token", JSON.stringify(login.data));
        navigate("/");
      }
    } catch (error) {
      console.log("error occured while login the user", error);
    }
  };
  // const healthCheck = async () => {
  //   try {
  //     const res = await axios.get(
  //       `${import.meta.env.VITE_APP_BACKEND_BASE_URL}/health`
  //     );

  //     console.log("health data", res);
  //   } catch (error) {
  //     console.log("error occured while login the user", error);
  //   }
  // };

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <form
        onSubmit={handleSubmit}
        className="w-4/5 md:w-1/2 bg-white p-8 rounded-xl shadow-lg flex flex-col gap-4"
      >
        <div className="text-center">
          <h3 className="font-semibold text-2xl text-green-700">Login</h3>
        </div>

        <div className="flex flex-col ">
          <p className="my-0">Username:</p>

          <TextField
            id="standard-basic"
            label=""
            variant="standard"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            fullWidth
          />
        </div>

        <div className="flex flex-col ">
          <p className="my-0">Password:</p>

          <TextField
            id="standard-basic"
            label=""
            variant="standard"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-green-500 text-white rounded-lg py-2 w-1/3 text-center"
          >
            Login
          </button>
        </div>
      </form>
      {/* <button onClick={healthCheck}>healthCheck</button> */}
    </div>
  );
};

export default Login;
