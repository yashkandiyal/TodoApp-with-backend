const express = require("express");
const Todo = require("../models/todo.model");
const router = express.Router();
router.post("/", async (req, res) => {
  try {
    const { description, username, status } = req.body;

    // Create a new todo
    const todo = new Todo({
      userId: req.user._id,
      description,
      username,
      status,
    });

    await todo.save();

    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
