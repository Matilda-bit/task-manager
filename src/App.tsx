// src/App.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { addTask, fetchAllTasks, updateTask as updateTaskThunk, deleteTask as deleteTaskThunk } from './redux/taskSlice';
import { Task } from './types/Task';
import './App.css';
import { AppDispatch, RootState } from './redux/store';

const App: React.FC = () => {
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const dispatch = useDispatch<AppDispatch>(); // Typed dispatch
  const tasks = useSelector((state: RootState) => state.tasks.tasks); // Typed selector
  const taskStatus = useSelector((state: RootState) => state.tasks.status);

  useEffect(() => {
    if (taskStatus === 'idle') {
      dispatch(fetchAllTasks());
    }
  }, [taskStatus, dispatch]);

  const addOrUpdateTask = (task: Task) => {
    if (task.id) {
      dispatch(updateTaskThunk(task));
    } else {
      dispatch(addTask(task));
    }

    setEditingTask(null);
  };

  const removeTask = (id: number) => {
    dispatch(deleteTaskThunk(id));
  };

  return (
    <div className="App">
      <div className="video-container">
        <video autoPlay muted loop id="background-video">
          <source
            src="https://cdn.pixabay.com/video/2022/06/13/120172-720504774_medium.mp4"
            type="video/mp4"
          />
          <source src="./../assets/bk/bk-medium.webm" type="video/webm" />
          <source src="./../assets/bk/bk-medium.ogv" type="video/ogg" />
          Your browser does not support the video tag.
        </video>
        <div className="content">
          <div className="intro">
            <h1>Welcome to My Website</h1>
            <p>Enjoy the background video!</p>
            <h1>Task Manager</h1>
          </div>

          <TaskForm task={editingTask} onSave={addOrUpdateTask} />
          <TaskList
             tasks={tasks}
             onDelete={removeTask}
             reloadTasks={() => dispatch(fetchAllTasks())}
             onEdit={setEditingTask}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
