import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./queryfilter.css";

export default function QueryFilter({ searchStudent, getStudents }) {
  // State information for the filter by StudentId or badgeNumber or both
  const [studentId, setStudentId] = useState("");
  const [badgeNumber, setbadgeNumber] = useState("");
  // For page navigation during button click
  const navigate = useNavigate();

  // Clear the input text
  const clearSearch = () => {
    setStudentId("");
    setbadgeNumber("");
    getStudents();
  };

  // Display the filter jsx
  return (
    <div className="filter">
      <div className="filterFields">
        <label htmlFor="studentId" className="filterLabel">
          Student ID
        </label>
        <input
          name="studentId"
          id="studentId"
          className="filterInputs"
          type="text"
          placeholder="Enter Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
      </div>
      <div className="filterFields">
        <label htmlFor="batchId" className="filterLabel">
        Badge ID
        </label>
        <input
          name="batchId"
          id="batchId"
          className="filterInputs"
          type="text"
          placeholder="Enter Badge ID"
          value={badgeNumber}
          onChange={(e) => setbadgeNumber(e.target.value)}
        />
      </div>
      <div className="filterFields">
        <div className="btn-container">
          <button
            type="button"
            className="queryBtn"
            onClick={() => searchStudent(studentId, badgeNumber)}
          >
            Search Student
          </button>
          <button type="button" className="queryBtn" onClick={clearSearch}>
            Clear Search
          </button>
          <button
            type="button"
            className="queryBtn"
            onClick={() => navigate("/add")}
          >
            Add Student
          </button>

          <button
            type="button"
            className="queryBtn"
            onClick={() => {
              fetch('http://localhost:3000/logout', {
                method: 'POST', // or 'GET', depending on your API
                credentials: 'include', // to include cookies if your API uses them
              })
                .then(response => {
                  if (!response.ok) {
                    throw new Error('Network response was not ok');
                  }
                  // navigate to the login page after successful logout
                  window.location.href = 'http://localhost:3000/login';
                })
                .catch(error => {
                  console.error('There has been a problem with your fetch operation:', error);
                });
            }}
          >
            Sign Out
          </button>

        </div>
      </div>
    </div>
  );
}
