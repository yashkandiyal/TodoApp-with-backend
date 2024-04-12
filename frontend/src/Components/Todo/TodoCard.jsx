import React, { useState } from "react";
import { Checkbox, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import { useDispatch, useSelector } from "react-redux";
import {
  removeTodo,
  updateTodo,
  toggleTodoStatus,
} from "../TodoStore/TodoReducers";

const TodoCard = ({ todo }) => {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [updatedText, setUpdatedText] = useState(todo.description);
  const username = useSelector((state) => state.user.username);
  const handleToggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleUpdateTodo = async () => {
    try {
      const description = updatedText;
      const result = await dispatch(
        updateTodo({ todoId: todo._id, description, username })
      );

      setUpdatedText(result.payload.description);
      setEditMode(false);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleDeleteTodo = () => {
    try {
      dispatch(removeTodo({ username, todoId: todo._id }));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const checkStatus = async () => {
    try {
      await dispatch(toggleTodoStatus({ username, todoId: todo._id }));
    } catch (error) {
      console.error("Error toggling todo status:", error);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 w-[22rem] md:w-[50rem]">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Checkbox
            color="primary"
            checked={todo.status}
            onClick={checkStatus}
            aria-label="Toggle Todo Status"
            className="text-blue-500 focus:ring-blue-500"
          />
          <div className="flex-grow ml-4">
            {editMode ? (
              <input
                className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow"
                value={updatedText}
                onChange={(e) => setUpdatedText(e.target.value)}
                aria-label="Edit Todo Text"
              />
            ) : (
              <p
                className={`text-gray-800 break-words ${
                  todo.status ? "line-through text-gray-500" : ""
                }`}
                aria-label={todo.status ? "Completed Todo" : "Todo"}>
                {todo.description}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center">
          {editMode ? (
            <IconButton
              aria-label="Save"
              onClick={handleUpdateTodo}
              title="Save Changes"
              className="text-green-500 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-full">
              <DoneIcon />
            </IconButton>
          ) : (
            <IconButton
              aria-label="Edit"
              onClick={handleToggleEditMode}
              title="Edit Todo"
              className="text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-full">
              <EditIcon />
            </IconButton>
          )}
          <IconButton
            aria-label="Delete"
            onClick={handleDeleteTodo}
            title="Delete Todo"
            className="text-red-500 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-full ml-2">
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
