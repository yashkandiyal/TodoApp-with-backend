const express = require("express");
const Todo = require("../models/todo.model");
const router = express.Router();
router.delete("/:username/:todoId", async (req, res) => {
  try {
    // Extract the todoId from the request body

    const { todoId } = req.params;
    console.log("Received todoId:", todoId);

    // Check if the todo exists
    const todo = await Todo.findById(todoId);
    if (!todo) {
      // If the todo does not exist, return a 404 status code
      return res.status(404).json({ error: "Todo not found" });
    }

    // Delete the todo from the database
    await Todo.findByIdAndDelete(todoId);

    // Return a success message and the deleted todo
    res
      .status(200)
      .json({ success: true, message: "Todo deleted successfully", todo });
  } catch (error) {
    console.error("Error in deleting a todo:", error);
    // Return a 500 status code for server errors
    res.status(500).json({ error: "Server error: Unable to delete todo" });
  }
});
module.exports = router;
