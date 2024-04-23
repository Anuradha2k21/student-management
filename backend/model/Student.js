const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: String,
    lastName: String,
    course: String,
    address: String,
    badgeNumber: {
      type: String,
      unique: true,
      sparse: true,
    },
    imagePic: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", StudentSchema);
