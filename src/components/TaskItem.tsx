import React from 'react';
import { Task } from '../types/Task';

interface TaskItemProps {
  task: Task;
  onDelete: (id: number) => void;
  onToggleComplete: (id: number) => void;
  onEdit: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, onToggleComplete, onEdit }) => {
  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <button onClick={() => onToggleComplete(task.id)}>
        {task.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
      </button>
      <button onClick={() => onEdit(task)}>Edit</button>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  );
};

export default TaskItem;
