import React from "react";

const Loader = () => {
  return (
    <div style={{
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      fontSize: "30px",
    }}>
      Loading...
    </div>
  );
};

export default Loader;
