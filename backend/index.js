const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import the cors middleware
const app = express();
const port = 4000;
const registerRoute = require("./routes/Register.route.js");
const loginRoute = require("./routes/Login.route.js");
const storeTodos = require("./routes/StoreTodos.route.js");
const fetchTodos = require("./routes/FetchTodos.route.js");
const deleteTodos = require("./routes/DeleteTodos.route.js");
const updateTodos = require("./routes/UpdateTodos.route.js");
const authenticate=require("./Authentication.js")
// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/todoapp")
  .then((e) => console.log("mongodb connection successfull!"))
  .catch((e) => console.log("error in connection:", e));

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// User registration
app.use("/", registerRoute);

//login 
app.use("/login", loginRoute);

//storing todos to the backend
app.use("/todos/:username", authenticate, storeTodos);

//fetching todos from backend
app.use("/todos/:username", fetchTodos);

//deleting a todo
app.use("/todos", deleteTodos);

//update todo and toggle status of a todo
app.use("/todos", updateTodos);

// Start the server
app.listen(port, () => {
  console.log(`Server is running at port:${port}`);
});
