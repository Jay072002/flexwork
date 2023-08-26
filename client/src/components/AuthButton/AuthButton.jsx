import React from "react";
import "./authbtn.css";

const AuthButton = ({ title, color, bg, icon, provider }) => {
  return (
    <button
      className="authBtn"
      style={{ backgroundColor: bg, color: color }}
      onClick={provider}
    >
      <span>{icon}</span>
      <p className="authTitle">{title}</p>
    </button>
  );
};

export default AuthButton;
