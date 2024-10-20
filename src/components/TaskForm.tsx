import React, { useState } from 'react';
import { Task } from '../types/Task';


interface TaskFormProps {
    task?: Task;
    onSave: (task: Task) => void;
}
//asdad
const TaskForm: React.FC<TaskFormProps> = ({ task, onSave }) => {
    const [title, setTitle] = useState(task?.title || '');
    const [description, setDescription] = useState(task?.description || '');
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (title && description) {
        const newTask = {
          id: task ? task.id : Date.now(),
          title,
          description,
          completed: task?.completed || false,
        };
        onSave(newTask);
      }
    };
  
    return (
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
        {/* <label htmlFor="TaskDescription">Task Description</label> */}
        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">{task ? 'Update' : 'Add'} Task</button>
      </form>
    );
  };
  
  export default TaskForm;