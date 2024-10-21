import React, { useState, useEffect } from 'react';
import { Task } from './types/Task';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { fetchTasks, addTask, updateTask, deleteTask } from './api/taskApi'; // Import API functions
import './App.css';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Fetch tasks from API on component mount and whenever a task is added or deleted
  const fetchAllTasks = () => {
    fetchTasks()
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
      });
  };

  useEffect(() => {
    fetchAllTasks(); // Initial fetch on mount
  }, []);

  // Add or update task
  const addOrUpdateTask = (task: Task) => {
    if (task.id) {
      // Update task
      updateTask(task)
        .then((response) => {
          setTasks((prevTasks) =>
            prevTasks.map((t) => (t.id === task.id ? task : t))
          );
        })
        .catch((error) => {
          console.error('Error adding task:', error);
        });
    } else {
      // Add new task
      addTask(task)
        .then((response) => {
          setTasks((prevTasks) => [...prevTasks, response.data]);

        })
        .catch((error) => {
          console.error('Error adding task:', error);
        });
    }
    setEditingTask(null);
    fetchAllTasks();
  };

  // Delete task
  const removeTask = (id: number) => {
    console.log(`Requesting to delete task with ID: ${id}`); // Debug log
    console.log(tasks);
    deleteTask(id)
      .then(() => {
        setTasks((prevTasks) => prevTasks.filter((task) => {
          console.log(prevTasks);

          console.log(task.id, + " " + id,  + " " + ((task.id !== id)? "true" : "false") );
          return task.id !== id;
        }
          ));
      })
      .catch((error) => {
        console.error('Error deleting task:', error);
      });

      fetchAllTasks();
  };

  const toggleCompleteTask = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
    fetchAllTasks();
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
          <div className="intro">
            <h1>Welcome to My Website</h1>
            <p>Enjoy the background video!</p>
            <h1>Task Manager</h1>
          </div>

          <TaskForm task={editingTask} onSave={addOrUpdateTask} />
          <TaskList
            tasks={tasks}
            onDelete={removeTask}
            reloadTasks={fetchAllTasks}
            onEdit={setEditingTask}
           
          />
        </div>
      </div>
    </div>
  );
};

export default App;
