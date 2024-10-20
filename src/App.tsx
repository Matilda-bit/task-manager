// src/App.tsx
import React, { useState } from 'react';
import { Task } from './types/Task';
import TaskForm from './components/TaskForm.tsx';
import TaskList from './components/TaskList.tsx';
import './App.css';
// import '../assets/bk/bk-medium.mp4'

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
      <div className="video-container">
        <video autoPlay muted loop id="background-video">
          <source src="https://cdn.pixabay.com/video/2022/06/13/120172-720504774_medium.mp4" type="video/mp4" />
          <source src="./../assets/bk/bk-medium.webm" type="video/webm" />
          <source src="./../assets/bk/bk-medium.ogv" type="video/ogg" />
          Your browser does not support the video tag.
        </video> 
        <div className="content">
          <div className='intro'>
            <h1>Welcome to My Website</h1>
            <p >Enjoy the background video!</p>
            <h1>Task Manager</h1>

          </div>
            
          <TaskForm task={editingTask} onSave={addOrUpdateTask} />
          <TaskList
            tasks={tasks}
            onDelete={deleteTask}
            onToggleComplete={toggleCompleteTask}
            onEdit={setEditingTask}
          />
        </div>
      </div>
    
      
    </div>
  ); 
};

export default App;
