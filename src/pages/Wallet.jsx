import React from "react";

const Wallet = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  console.log("wallet balance:", token.claims.wallet);

  return <div className="h-screen">Wallet</div>;
};

export default Wallet;
