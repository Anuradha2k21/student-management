const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const csurf = require('csurf');

const studentRoute = require("./routes/students");
  
//setup cors for our project
app.use(cors());
//load static files
app.use("/images", express.static(path.join(__dirname, "/images")));

//load the .env file
dotenv.config();
//parse the json request and put it in the req.body
app.use(express.json());

//setup cors for our project
app.use(cors());

//connect to our mongodb atlas database
mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => console.log('Connected to MongoDB!'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

//load our rest api routes
app.use("/api/students", studentRoute);

//start the server
app.listen("5000", () => {
  console.log("Student backend API server is running.");
});

// Listen for termination signals
process.on('SIGINT', closeConnection).on('SIGUSR2', closeConnection).on('SIGTERM', closeConnection);

// Function to close MongoDB connection
function closeConnection() {
    mongoose.connection.close(() => {
        console.log('Mongoose connection disconnected due to app termination');
        process.exit(0);
    });
}