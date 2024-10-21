import React, { useState, useEffect } from 'react';
import { Task } from '../types/Task';
import { useDispatch } from 'react-redux';
import { addTask as addTaskThunk, updateTask as updateTaskThunk } from '../redux/taskSlice'; // Import Redux thunks
import { AppDispatch } from '../redux/store'; // Import the AppDispatch type

interface TaskFormProps {
  task: Task | null;
  onSave: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onSave }) => {
  const [title, setTitle] = useState(() => task?.title || '');
  const [description, setDescription] = useState(() => task?.description || '');
  const [completed, setCompleted] = useState(false);
  const dispatch = useDispatch<AppDispatch>(); // Explicitly type dispatch as AppDispatch


  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setCompleted(task.completed);
    }
  }, [task]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title && description) {
      const newTask = {
        id: task ? task.id : Date.now(),
        title,
        description,
        completed,
      };
      if (!task) {
        // Dispatch addTask if it's a new task
        try {
          const actionResult = await dispatch(addTaskThunk(newTask)); // Dispatching addTaskThunk action
          if (addTaskThunk.fulfilled.match(actionResult)) {
            onSave(actionResult.payload); // On success, pass the added task back to the parent
          }
        } catch (error) {
          console.error('Error adding task:', error);
        }
      } else {
        // Dispatch updateTask if it's an existing task
        try {
          const actionResult = await dispatch(updateTaskThunk(newTask)); // Dispatching updateTaskThunk action
          if (updateTaskThunk.fulfilled.match(actionResult)) {
            onSave(actionResult.payload); // On success, pass the updated task back to the parent
          }
        } catch (error) {
          console.error('Error updating task:', error);
        }
      }
    }
    
  };

  return (
    <div className='task-form'>
      <form onSubmit={handleSubmit}>
        <label htmlFor="taskTitle">Title</label>
        <input
          id="taskTitle"
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">{task ? 'Update' : 'Add'} Task</button>
      </form>
    </div>
  );
};

export default TaskForm;
