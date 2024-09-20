import React from "react";
import error from "../assets/404.png";

const NotFound = () => {
  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center justify-center">
        <div className="text-center w-1/2">
          <img className="w-full mx-auto" src={error} />
        </div>
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Page Not Found</h2>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
