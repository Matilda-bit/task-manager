import React, { useState, useEffect } from 'react';
import { Task } from '../types/Task';
import { addTask } from '../api/taskApi'; // Import API function

interface TaskFormProps {
  task: Task | null;
  onSave: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onSave }) => {
  const [title, setTitle] = useState(() => task?.title || '');
  const [description, setDescription] = useState(() => task?.description || '');
  const [completed, setCompleted] = useState(false);

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
        // Add a new task if it's a new task
        try {
          const response = await addTask(newTask); // API call to add task
          onSave(response.data); // Pass the added task back to the parent
        } catch (error) {
          console.error('Error adding task:', error);
        }
      } else {
        // Update the existing task
        onSave(newTask);
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
