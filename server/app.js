/*
=====================================================
// Title: Nodebucket Application
// Author: Evan Durkin
// Date: April 3, 2022
// Description: MongoDB connection and server setup
=====================================================
*/

// Require statements
const express = require("express");
const http = require("http");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const Employee = require("./models/employee");
const EmployeeRoutes = require("./routes/employees-routes");
// const TaskRoutes = require("./routes/task-routes");

// App configurations
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "../dist/nodebucket")));
app.use("/", express.static(path.join(__dirname, "../dist/nodebucket")));

// Connecting to server port
const port = 3000;

// MongoDB connection string
const conn =
  "mongodb+srv://bu-user:NRMYxvt57Yb5DQt@buwebdev-cluster-1.a6yhz.mongodb.net/nodebucket?retryWrites=true&w=majority";

// MongoDB database connection
mongoose
  .connect(conn, {
    promiseLibrary: require("bluebird"),
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.debug(`Connection to the database instance was successful`);
  })
  .catch((err) => {
    console.log(`MongoDB Error: ${err.message}`);
  }); // end mongoose connection

// API uses the employees-routes
app.use("/api/employees", EmployeeRoutes);
// app.use("/api/employees", TaskRoutes);

// Creates the server and listens on port 3000
http.createServer(app).listen(port, function () {
  console.log(`Application started and listening on port: ${port}`);
}); // end http create server function
