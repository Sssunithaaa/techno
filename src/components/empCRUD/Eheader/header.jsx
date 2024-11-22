import React from "react";
import "./header.css";

function Header({ setIsAdding }) {
  return (
    <header style={{ display: "block", width: "100%" }}>
      <h1>Employee Management </h1>
      <div>
        <button onClick={() => setIsAdding(true)} className="round-button">
          Add Employee
        </button>
      </div>
    </header>
  );
}

export default Header;
