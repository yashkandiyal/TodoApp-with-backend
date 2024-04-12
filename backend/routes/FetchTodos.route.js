const express = require("express");
const Todo = require("../models/todo.model");
const router = express.Router();
router.get("/", async (req, res) => {
  try {
    // Get the userId from the authenticated user's request
    const userId = req.user._id;

    // Query the Todo collection for todos with the matching userId
    const userTodos = await Todo.find({ userId });

    // Send the todos back in the response
    res.json(userTodos);
  } catch (error) {
    console.error("Error fetching todos for user:", error);
    res.status(500).json({ error: "Server error" });
  }
});
module.exports = router;
