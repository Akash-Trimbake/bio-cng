import { useNavigate } from "react-router-dom";
import H1Img from "../assets/h1.png";

const Home = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/userInfoForm");
  };
  return (
    <div className="h-screen md:h-full flex flex-col justify-center items-center ">
      <div className="text-center font-extrabold text-white px-2 md:w-1/2 ">
        <h1 className="text-3xl md:text-7xl">WELCOME TO MHA BIO CNG PROJECT</h1>
      </div>

      <img src={H1Img} alt="Hero Img" />

      <button
        onClick={handleButtonClick}
        className="mt-2 py-2 px-3 rounded-lg bg-white text-green-900 hover:bg-green-900 hover:text-gray-50 font-semibold"
      >
        Fill out the form to get started.
      </button>
    </div>
  );
};

export default Home;
