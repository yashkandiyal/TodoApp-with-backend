import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from 'react-redux';
// Define the initial state
const initialState = {
  todos: [],
  status: "idle",
  error: null,
};
// Define an async thunk for fetching todos from the backend
export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().user.authToken;
    
    const response = await axios.get("http://localhost:4000/todos/:username", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

// Define an async thunk for adding a new todo
export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async ({ description, username, status }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.authToken;
      // Make a POST request to the /todos endpoint
      const response = await axios.post(
        "http://localhost:4000/todos/:username",
        { description, username, status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Return the created todo from the response
      return response.data;
    } catch (error) {
      // Handle error by rejecting the promise
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

// Define an async thunk for removing a todo
export const removeTodo = createAsyncThunk(
  "todos/removeTodo",
  async ({ username, todoId }, thunkAPI) => {
    const token = thunkAPI.getState().user.authToken;

    // Construct the URL dynamically using the username and todoId
    const url = `http://localhost:4000/todos/${username}/${todoId}`;

    // Make the DELETE request to remove the todo item
    await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Return the todoId to be used in updating the Redux state
    return todoId;
  }
);

// Define an async thunk for updating a todo
export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async ({ todoId, description, username }, thunkAPI) => {
    const token = thunkAPI.getState().user.authToken;
    await axios.put(
      `http://localhost:4000/todos/${username}/${todoId}`,
      { description, username },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { todoId, description };
  }
);

// Define an async thunk for toggling the status of a todo
export const toggleTodoStatus = createAsyncThunk(
  "todos/toggleTodoStatus",
  async ({ username, todoId }, thunkAPI) => {
    try {
      // Get the user's authentication token
      const token = thunkAPI.getState().user.authToken;

      // Make the PUT request to toggle the status of the todo
      const response = await axios.put(
        `http://localhost:4000/todos/${username}/${todoId}`,
        {}, // Body: empty because you only need to toggle the status
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Return the response data (the updated todo) if successful
      return response.data;
    } catch (error) {
      console.error("Error toggling todo status:", error);
      // Handle errors appropriately (e.g., return an error message)
      throw error;
    }
  }
);

export const todoSlice = createSlice({
  name: "Todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos.push(action.payload);
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo._id !== action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const { todoId, description } = action.payload;
        const index = state.todos.findIndex((todo) => todo._id === todoId);
        if (index !== -1) {
          state.todos[index].description = description;
        }
      })
      .addCase(toggleTodoStatus.fulfilled, (state, action) => {
        const todoIndex = state.todos.findIndex(
          (todo) => todo._id === action.payload._id
        );
       
        // Update the todo status if the todo item was found
        if (todoIndex !== -1) {
          console.log("frontend se action.payload.status:",action.payload.status);
          console.log("frontend se:",state.todos[todoIndex].status);
          state.todos[todoIndex].status = action.payload.status;
        }
      });
  },
});

export default todoSlice.reducer;
