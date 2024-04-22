import { useNavigate } from "react-router-dom";
import H1Img from "../assets/h1.png";

const Home = () => {
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("token"));

  const handleButtonClick = () => {
    navigate("/userInfoForm");
  };

  // console.log(token.claims.id);

  const copyToClipboard = () => {
    const referralLink = `https://bio-cng.vercel.app/refer/${token.claims.id}`;
    navigator.clipboard
      .writeText(referralLink)
      .then(() => {
        console.log("Referral link copied to clipboard:", referralLink);
        // You can show a success message here if needed
      })
      .catch((err) => {
        console.error("Failed to copy referral link to clipboard:", err);
        // You can show an error message here if needed
      });
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center ">
      <div className="text-center font-extrabold text-white px-2 md:w-1/2 ">
        <h1 className="text-3xl md:text-7xl">
          WELCOME TO <br /> MHA BIO CNG <br /> PROJECT
        </h1>
      </div>

      {/* <img src={H1Img} alt="Hero Img" /> */}

      {token && token.claims && token.claims.hierarchyLevel == 3 ? (
        <div className="flex flex-col gap-2">
          <button
            onClick={handleButtonClick}
            className="mt-2 py-2 px-3 rounded-lg bg-white text-green-900 hover:bg-green-900 hover:text-gray-50 font-semibold"
          >
            Fill out the form to get started.
          </button>
          <button
            onClick={copyToClipboard}
            className="mt-2 py-2 px-3 rounded-lg bg-green-900 text-white hover:bg-gray-50 hover:text-green-900 font-semibold"
          >
            Copy referral link
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Home;
