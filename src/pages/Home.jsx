import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/userInfoForm");
  };
  return (
    <div className="h-screen flex flex-col justify-center items-center ">
      <div className="text-center font-extrabold text-white flex flex-col gap-8 ">
        <h1 className="text-3xl md:text-7xl">WELCOME</h1>

        <h1 className="text-3xl md:text-7xl">TO MHA BIO CNG</h1>
        <h1 className="text-3xl md:text-7xl">PROJECT</h1>
      </div>

      <button
        onClick={handleButtonClick}
        className="mt-8 py-2 px-3 rounded-lg bg-white text-green-900"
      >
        Fill out the form to get started.
      </button>
    </div>
  );
};

export default Home;
