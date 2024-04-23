import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import Message from "../../components/message/Message";
import "./add.css";
import DOMPurify from 'dompurify';

export default function Add() {
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    studentId: "",
    firstName: "",
    lastName: "",
    course: "",
    address: "",
    badgeNumber: "",
    imagePic: "",
  });

  const [file, setFile] = useState(null);
  const [message, setMessage] = useState({
    show: false,
    msg: "",
    type: "",
  });

  const updateStudent = (e) => {
    const fieldName = e.target.name;
    setStudent((currentStudent) => ({
      ...currentStudent,
      [fieldName]: e.target.value,
    }));
  };

  const showMessage = (show = false, type = "", msg = "") => {
    setMessage({ show, type, msg });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!student.studentId.trim()) {
      alert("Student ID is required!");
      return;
    }
    if (!/^ST\d{3}$/.test(student.studentId.trim())) {
      alert('Student ID must start with "ST" followed by 3 digits (000 to 999)');
      return;
    }

    if (!student.firstName.trim()) {
      alert("First Name is required!");
      return;
    }
    
    if (!/^[a-zA-Z\s]*$/.test(student.firstName.trim())) {
      alert("First Name can only contain letters and spaces!");
      return;
    }

    if (!student.lastName.trim()) {
      alert("Last Name is required!");
      return;
    }


    if (!/^[a-zA-Z\s]*$/.test(student.lastName.trim())) {
      alert("Last Name can only contain letters and spaces!");
      return;
    }

    if (!student.course.trim()) {
      alert("Course name is required!");
      return;
    }

    if (!student.address.trim()) {
      alert("Address is required!");
      return;
    }

    if (!student.badgeNumber.trim()) {
      alert("Badge ID is required!");
      return;
    }

    if (!/^BCH\d{2}$/.test(student.badgeNumber.trim())) {
      alert("Badge ID must start with \"BCH\" followed by two digits (00 to 99)");
      return;
    }

    if (!file) {
      alert("Profile picture is required!");
      return;
    }

    const studenData = new FormData();
    studenData.append("studentId", student.studentId);
    studenData.append("firstName", student.firstName);
    studenData.append("lastName", student.lastName);
    studenData.append("course", student.course);
    studenData.append("address", student.address);
    studenData.append("badgeNumber", student.badgeNumber);
    if (file) {
      studenData.append("file", file);
    }

    try {
      console.log("Sending request with data:", student, file);
      const response = await axios.post("http://localhost:5000/api/students", studenData);
      console.log("Response:", response.data);
      showMessage(true, "info", "Successfully added student information");

      setStudent({
        studentId: "",
        firstName: "",
        lastName: "",
        course: "",
        address: "",
        badgeNumber: "",
      });
      setFile(null);
      navigate(-1);

    } catch (error) {
      console.error("Error:", error);
      showMessage(true, "error", error.message || "An error occurred while adding student information");
    }
  };

  return (
    <>
      <Header />
      <div className="header">
        <h1>Add Student</h1>
      </div>
      <section className="managePage">
        <form className="editForm" onSubmit={handleSubmit}>
          <div className="fields">
            <div className="imgColumn">
              <img 
                src={
                  file
                    ? URL.createObjectURL(file)
                    : "http://localhost:5000/images/defaultPic.png"
                }
                alt="Profile Pic"
              />
              <label htmlFor="fileInput" className="fileUploadLabel">
                <i className="fa-solid fa-circle-plus addProfileIcon">
                  Add Profile Pic
                </i>
              </label>
              <input
                type="file"
                id="fileInput"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />
            </div>
            <div className="fieldsColumn">
              <div className="fieldRow">
                <label htmlFor="studentId" className="fieldLabel">
                  Student ID
                </label>
                <input
                  type="text"
                  name="studentId"
                  id="studentId"
                  value={student.studentId}
                  onChange={updateStudent}
                  className="addInputs"
                />
              </div>
              <div className="fieldRow">
                <label htmlFor="firstName" className="fieldLabel">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={student.firstName}
                  onChange={updateStudent}
                  className="addInputs"
                />
              </div>
              <div className="fieldRow">
                <label htmlFor="lastName" className="fieldLabel">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={student.lastName}
                  onChange={updateStudent}
                  className="addInputs"
                />
              </div>
              <div className="fieldRow">
                <label htmlFor="course" className="fieldLabel">
                  Course
                </label>
                <input
                  type="text"
                  name="course"
                  id="course"
                  value={student.course}
                  onChange={updateStudent}
                  className="addInputs"
                />
              </div>
              <div className="fieldRow">
                <label htmlFor="address" className="fieldLabel">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={student.address}
                  onChange={updateStudent}
                  className="addInputs"
                />
              </div>
              <div className="fieldRow">
                <label htmlFor="badgeNumber" className="fieldLabel">
                  Badge ID
                </label>
                <input
                  type="text"
                  name="badgeNumber"
                  id="badgeNumber"
                  value={student.badgeNumber}
                  onChange={updateStudent}
                  className="addInputs"
                />
              </div>
            </div>
          </div>

          <div className="btnContainer">
            <button type="submit" className="bottomButton">
              Add
            </button>
            <button
              type="button"
              className="bottomButton"
              onClick={() => navigate("/")}
            >
              Back
            </button>
          </div>
          <div>
            {message.show && (
              <Message {...message} removeMessage={showMessage} />
            )}
          </div>
        </form>
      </section>
    </>
  );
}
