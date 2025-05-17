import React from "react";
import { TbError404 } from "react-icons/tb";

const NotFound = () => {
  return (
    <div className="min-h-[90vh] flex flex-col justify-center md:items-center">
      <TbError404 className="w-44 h-44 text-[#ffb400]" />
      <h1 className="font-bold text-4xl md:text-5xl text-gray-800 mb-4">
        Page Not Found
      </h1>
      <p className="text-sm text-gray-500 mb-4 max-w-sm md:text-center">
        The page you are looking for does not exist or has been moved.
      </p>
    </div>
  );
};

export default NotFound;
