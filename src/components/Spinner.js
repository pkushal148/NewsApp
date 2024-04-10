import React from "react";
import Search from "./Search.gif";

const Spinner = () => {
  return (
    <div className="text-center mt-3">
      <img className="my-3" src={Search} alt="loading" />
    </div>
  );
};

export default Spinner;
