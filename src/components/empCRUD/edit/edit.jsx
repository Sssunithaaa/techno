import React, { useState } from "react";
import Swal from "sweetalert2";
import "./edit.css";
function Edit({ employees, selectedEmployee, setEmployees, setIsEditing }) {
  // Check if selectedEmployee is defined, otherwise provide a default value
  const id = selectedEmployee?.id || "";

  const [ssn, setSsn] = useState(selectedEmployee?.ssn || "");
  const [name, setName] = useState(selectedEmployee?.name || "");
  const [phoneNumber, setPhoneNumber] = useState(
    selectedEmployee?.phoneNumber || ""
  );
  const [address, setAddress] = useState(selectedEmployee?.address || "");

  const handleUpdate = (e) => {
    e.preventDefault();

    if (!ssn || !name || !phoneNumber || !address) {
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "All fields are required.",
        showConfirmButton: true,
      });
    }

    const employee = {
      id,
      ssn,
      name,
      phoneNumber,
      address,
    };

    for (let i = 0; i < employees.length; i++) {
      if (employees[i].id === id) {
        employees.splice(i, 1, employee);
        break;
      }
    }

    setEmployees([...employees]); // Create a new array to trigger a re-render
    setIsEditing(false);

    Swal.fire({
      icon: "success",
      title: "Updated!",
      text: `${employee.name}'s data has been updated.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="edit-container">
      <form onSubmit={handleUpdate}>
        <h1>Edit Employee</h1>
        <label htmlFor="ssn">SSN</label>
        <input
          id="ssn"
          type="text"
          name="ssn"
          value={ssn}
          onChange={(e) => setSsn(e.target.value)}
        />
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          id="phoneNumber"
          type="number"
          name="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <label htmlFor="address">Address</label>
        <input
          id="address"
          type="text"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <div style={{ marginTop: "30px" }}>
          <input type="submit" value="Update" />
          <input
            style={{ marginLeft: "12px" }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsEditing(false)}
          />
        </div>
      </form>
    </div>
  );
}

export default Edit;
