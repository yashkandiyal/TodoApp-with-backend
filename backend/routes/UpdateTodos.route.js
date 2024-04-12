const express = require("express");
const Todo = require("../models/todo.model");
const router = express.Router();
router.put("/:username/:todoId", async (req, res) => {
  try {
    // Extract the username and todoId from the URL parameters
    const { username, todoId } = req.params;

    // Find the to-do item by its ID and username
    const todo = await Todo.findOne({ _id: todoId, username });

    if (!todo) {
      // If the to-do item was not found, respond with a 404 error
      return res.status(404).json({ error: "Todo not found" });
    }

    if (req.body.description !== undefined) {
      // If a description is provided in the request body, update the description
      todo.description = req.body.description;

      // Save the updated to-do item
      await todo.save();

      // Respond with the updated to-do item
      return res.json(todo);
    } else {
      // If no description is provided in the request body, toggle the status
      todo.status = !todo.status;

      // Save the updated to-do item
      await todo.save();

      // Respond with the updated to-do item
      return res.json(todo);
    }
  } catch (error) {
    console.error("Error updating a todo or toggling status:", error);
    res
      .status(500)
      .json({ error: "Server error: Unable to update todo or toggle status" });
  }
});
module.exports = router;
