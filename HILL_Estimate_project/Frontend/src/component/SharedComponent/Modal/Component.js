import React from "react";
import Button from "../../GlobalComponent/Button/Component";

const Modal = ({ show, onClose, children }) => {
  if (!show) return null;
  const theme = {
    primary: "gray",
  };
  return (
    <div style={{
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}>
      <div style={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "8px",
        width: "300px",
      }}>
        {children}
        <br />
        <Button onClick={onClose} style={{ backgroundColor: theme.primary }}>Close</Button>
      </div>
    </div>
  );
};

export default Modal;
