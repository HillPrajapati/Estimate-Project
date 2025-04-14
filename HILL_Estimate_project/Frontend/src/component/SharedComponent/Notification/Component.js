import React from "react";

const Notification = ({ message, type }) => {
  return (
    <div style={{ 
      backgroundColor: type === "error" ? "red" : "green", 
      color: "white", 
      padding: "10px", 
      margin: "10px 0"
    }}>
      {message}
    </div>
  );
};

export default Notification;
