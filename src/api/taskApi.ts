import axios from 'axios';
import { Task } from '../types/Task';

const API_URL = 'http://localhost:3001/tasks';

export const fetchTasks = () => axios.get<Task[]>(API_URL); // Fetch all tasks

export const addTask = (task: Task) => {
    // Generate the ID as a string manually
    const newTask = { ...task, id: String(Date.now()) }; // Ensure ID is a string
    return axios.post(API_URL, newTask); // Send the new task with a string ID
  };

  export const updateTask = (task: Task) => {
    // Ensure the task ID is treated as a string
    const taskWithStringId = { ...task, id: String(task.id) }; // Ensure the ID is a string
    return axios.put(`${API_URL}/${taskWithStringId.id}`, taskWithStringId); // Update the task using the PUT method
  };

export const deleteTask = (id: number) => {
    const taskId = String(id); // Convert the number to string
    console.log(`Deleting task with ID: ${taskId}`);
    return axios
      .delete(`${API_URL}/${taskId}`)
      .then((response) => {
        console.log('Task deleted successfully:', response.data);
        return response;
      })
      .catch((error) => {
        console.error('Error deleting task:', error.response ? error.response.data : error.message);
        throw error;
      });
  };