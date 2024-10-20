// src/components/TaskList.tsx
import React from 'react';
import { Task } from '../types/Task';
import { FixedSizeList as List } from 'react-window';
import TaskItem from './TaskItem.tsx'; // Assuming TaskItem renders a single task

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: number) => void;
  onToggleComplete: (id: number) => void;
  onEdit: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete, onToggleComplete, onEdit }) => {
  // This function renders each row using react-window


  if (!tasks) {
    return <div>No task created</div>;
  }
  
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
    <div style={{ ...style, padding: '10px', boxSizing: 'border-box' }}> {/* Ensure proper padding and sizing */}
      <TaskItem
        task={tasks[index]}
        onDelete={onDelete}
        onToggleComplete={onToggleComplete}
        onEdit={onEdit}
      />
    </div>
  );

  return (
    <List
      height={600}             // The height of the visible list area
      itemCount={tasks.length}  // Number of items in the list
      itemSize={200}            // Height of each item
      width="100%"              // Full width of the parent container
    >
      {Row}
    </List>
  );
};

export default TaskList;
