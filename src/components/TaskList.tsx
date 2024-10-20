// src/components/TaskList.tsx
import React from 'react';
import { Task } from '../types/Task';
import TaskItem from './TaskItem.tsx';

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: number) => void;
  onToggleComplete: (id: number) => void;
  onEdit: (task: Task) => void;
}
//sddsds

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete, onToggleComplete, onEdit }) => {
  return (
    <div>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default TaskList;
