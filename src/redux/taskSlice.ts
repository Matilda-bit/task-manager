// src/redux/taskSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../types/Task';
import { fetchTasks, addTask as addTaskAPI, updateTask as updateTaskAPI, deleteTask as deleteTaskAPI } from '../api/taskApi';

interface TaskState {
  tasks: Task[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  status: 'idle',
  error: null,
};

// Fetch all tasks
export const fetchAllTasks = createAsyncThunk('tasks/fetchAllTasks', async () => {
  const response = await fetchTasks();
  return response.data;
});

// Add a new task
export const addTask = createAsyncThunk('tasks/addTask', async (newTask: Task) => {
  const response = await addTaskAPI(newTask);
  return response.data;
});

// Update a task
export const updateTask = createAsyncThunk('tasks/updateTask', async (updatedTask: Task) => {
  const response = await updateTaskAPI(updatedTask);
  return response.data;
});

// Delete a task
export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId: number) => {
  await deleteTaskAPI(taskId);
  return taskId; // Return task ID to easily filter it out
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
      })
      .addCase(fetchAllTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch tasks';
      })
      .addCase(addTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
        const index = state.tasks.findIndex((task) => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload; // Update the task in the list
        }
      })
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<number>) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload); // Remove task by ID
      });
  },
});

export default taskSlice.reducer;
