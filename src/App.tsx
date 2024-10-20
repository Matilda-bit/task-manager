// src/App.tsx
import React, { useState } from 'react';
import { Task } from './types/Task';
import TaskForm from './components/TaskForm.tsx';
import TaskList from './components/TaskList.tsx';
import './App.css';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const addOrUpdateTask = (task: Task) => {
    setTasks((prevTasks) => {
      const taskExists = prevTasks.find((t) => t.id === task.id);
      if (taskExists) {
        return prevTasks.map((t) => (t.id === task.id ? task : t));
      } else {
        return [...prevTasks, task];
      }
    });
    setEditingTask(null);
  };

  const deleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const toggleCompleteTask = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
    );
  };

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <TaskForm task={editingTask} onSave={addOrUpdateTask} />
      <TaskList
        tasks={tasks}
        onDelete={deleteTask}
        onToggleComplete={toggleCompleteTask}
        onEdit={setEditingTask}
      />
    </div>
  );
};

export default App;
