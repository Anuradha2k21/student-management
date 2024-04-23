const router = require("express").Router();
const Student = require("../model/Student");
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');

// Upload profile image directory
const IMAGE_DIR = "./images/";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20 // limit each IP to 100 requests per windowMs
});

// set multer disk storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, IMAGE_DIR);
  },
  filename: (req, file, cb) => {
    //generate random uuid
    const fileName = uuidv4() + path.extname(file.originalname);
    cb(null, fileName);
  },
});

// Limit file upload only to images
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format is allowed!"));
    }
  },
});

// Set X-XSS-Protection header
router.use((req, res, next) => {
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Create Student
router.post("/", upload.single("file"), [
  body('studentId').trim().isAlphanumeric().escape(),
  body('firstName').trim().isLength({ min: 1 }).escape(),
  body('lastName').trim().isLength({ min: 1 }).escape(),
  body('course').trim().isLength({ min: 1 }).escape(),
  body('address').trim().isLength({ min: 1 }).escape(),
  body('badgeNumber').trim().isLength({ min: 1 }).escape(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.error("Validation errors:", errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  // Sanitize user input to prevent XSS attacks
  const sanitizedBody = {
    studentId: req.body.studentId,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    course: req.body.course,
    address: req.body.address,
    badgeNumber: req.body.badgeNumber
  };

  const newStudent = new Student(sanitizedBody);

  try {
    // save the generated filename in our MongoDB Atlas database
    newStudent.imagePic = req.file.path;
    const savedStudent = await newStudent.save();
    console.log("Student saved:", savedStudent);
    res.status(200).json(savedStudent);
  } catch (error) {
    console.error("Error saving student:", error);
    res.status(500).json({ error: error.message || "An error occurred while saving the student" });
  }
});

// Get Student list or Search Student by badgeNumber or studentid query parameters
router.get("/", async (req, res) => {
  const studentId = req.query.studentId;
  const badgeNumber = req.query.badgeNumber;

  // if either studenId or badgeNumber query parameters is present
  if (studentId || badgeNumber) {
    try {
      let student;
      if (studentId && badgeNumber) {
        // Mongoose handles parameterized queries here
        student = await Student.find({
          studentId: studentId,
          badgeNumber: badgeNumber,
        });
      } else if (studentId) {
        // Mongoose handles parameterized queries here
        student = await Student.find({ studentId });
      } else if (badgeNumber) {
        // Mongoose handles parameterized queries here
        student = await Student.find({ badgeNumber: badgeNumber });
      }
      return res.status(200).json(student);
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }
  // else return the whole Student list
  try {
    const studentList = await Student.find();
    res.status(200).json(studentList);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Get Student by ID
router.get("/:id", async (req, res) => {
  try {
    // Mongoose handles parameterized queries here
    const student = await Student.findById(req.params.id);
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Update Student
router.put("/:id", limiter, upload.single("file"), async (req, res, next) => {
  //If a new profile pic is uploaded then process it first by deleting the old image file from disk
  if (req.file) {
    try {
      //find by id
      const oldStudentDetails = await Student.findById(req.params.id);
      if (!oldStudentDetails) {
        throw new Error("Student not found!");
      }

      //if old image file exist then the delete file from directory
      if (fs.existsSync(oldStudentDetails.imagePic)) {
        fs.unlink(oldStudentDetails.imagePic, (err) => {
          if (err) {
            throw new Error("Failed to delete file..");
          } else {
            console.log("file deleted");
          }
        });
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
  // Update the database with new details
  try {
    // Mongoose handles parameterized queries here
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
        imagePic: req.file?.path,
      },
      { new: true }
    );
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Delete Student
router.delete("/:id", async (req, res) => {
  try {
    // Mongoose handles parameterized queries here
    await Student.findByIdAndDelete(req.params.id);
    res.status(200).json("Student has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
