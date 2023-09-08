import React from "react";

interface LoaderType {
  size: "sm" | "md" | "lg";
}

const Loader = ({ size }: LoaderType) => {
  return (
    <div className="flex justify-center items-center">
      <div className={`loader loader-${size}`} />
    </div>
  );
};

export default Loader;
