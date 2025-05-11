import React from "react";
import { PropagateLoader } from "react-spinners"; // Make sure you've installed react-spinners

const LoadingModal = ({ color, size }) => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50"
      style={{
        backdropFilter: "blur(5px)", // Adding the blur effect to the background
      }}
    >
      <div className="flex flex-col items-center justify-center">
        <PropagateLoader color={color || "#E74C3C"} loading={true} size={size || 40} />
      </div>
    </div>
  );
};

export default LoadingModal;
