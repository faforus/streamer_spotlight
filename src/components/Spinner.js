import React from "react";

const Spinner = () => {
  return (
    <div className="fixed w-full h-full bg-gray-100/30">
      <div className="absolute top-1/2 left-1/2 -mt-10 -ml-10 transform border-4 border-solid border-gray-300 border-t-gray-600 rounded-full w-20 h-20 animate-spin duration-1000 infinite z-50"></div>
    </div>
  );
};

export default Spinner;
