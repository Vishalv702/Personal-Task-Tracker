/* Updated App.js with plain CSS class names */

import React, { useState, useEffect } from 'react';
import { Plus, Search, Sun, Moon, Check } from 'lucide-react';
import Login from './components/Login';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskFilter from './components/TaskFilter';
import {
  saveToLocalStorage,
  loadFromLocalStorage,
  removeFromLocalStorage
} from './utils/localstorage';
import './styles/App.css';

const App = () => {
  const [user, setUser] = useState('');
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);


  useEffect(() => {
    const savedUser = loadFromLocalStorage('username', '');
    const savedTasks = loadFromLocalStorage('tasks', []);
    const savedTheme = loadFromLocalStorage('darkMode', false);

    setUser(savedUser);
    setTasks(savedTasks);
    setDarkMode(savedTheme);
    setHasLoaded(true);
  }, []);

  useEffect(() => {
  if (hasLoaded) {
    saveToLocalStorage('tasks', tasks);
  }
}, [tasks, hasLoaded]);


  useEffect(() => {
    if(hasLoaded){
      saveToLocalStorage('darkMode', darkMode);
    }
    
  }, [darkMode,hasLoaded]);

  const handleLogin = (username) => {
    setUser(username);
    saveToLocalStorage('username', username);
  };

  const handleLogout = () => {
    removeFromLocalStorage('username');
    setUser('');
    setTasks([]);
  };

 const addTask = (taskData) => {
  const newTask = {
    id: Date.now(),
    title: taskData.title,
    description: taskData.description,
    priority: taskData.priority || 'Medium', 
    completed: false,
    createdAt: new Date().toISOString(),
  };
  setTasks([...tasks, newTask]);
  setIsAddingTask(false);
};

 const updateTask = (taskId, updates) => {
  setTasks(tasks.map(task =>
    task.id === taskId ? { ...task, ...updates } : task
  ));
  setEditingTaskId(null);
};

  const deleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter(task => task.id !== taskId));
    }
  };

  const toggleComplete = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const filteredTasks = tasks.filter(task => {
    const matchFilter =
      filter === 'all' ||
      (filter === 'completed' && task.completed) ||
      (filter === 'pending' && !task.completed);

    const matchSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchFilter && matchSearch;
  });

  const taskCounts = {
    all: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length
  };

  if (!user) {
    return <Login onLogin={handleLogin} darkMode={darkMode} setDarkMode={setDarkMode} />;
  }

  return (
    <div className={`app-container ${darkMode ? 'dark' : ''}`}>
      <header className={`app-header ${darkMode ? 'dark' : ''}`}>
        <div className="header-content">
          <div className="header-left">
            <div className="logo-circle">
              <Check className="logo-icon" />
            </div>
            <div>
              <h1 className="title">Task Tracker</h1>
              <p className="subtitle">Welcome, {user}!</p>
            </div>
          </div>

          <div className="header-actions">
            <button onClick={() => setDarkMode(!darkMode)} className="toggle-theme">
              {darkMode ? <Sun className="icon" /> : <Moon className="icon" />}
            </button>
            <button onClick={handleLogout} className="logout">Logout</button>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="task-controls">
          <div className="top-controls">
            <TaskFilter
              currentFilter={filter}
              setFilter={setFilter}
              taskCounts={taskCounts}
              darkMode={darkMode}
            />
            <button onClick={() => setIsAddingTask(true)} className="add-task">
              <Plus className="icon" /> Add Task
            </button>
          </div>

          <div className="search-box">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {isAddingTask && (
          <TaskForm
            onSubmit={addTask}
            onCancel={() => setIsAddingTask(false)}
            darkMode={darkMode}
          />
        )}

        <TaskList
          tasks={filteredTasks}
          onToggle={toggleComplete}
          onEdit={setEditingTaskId}
          onDelete={deleteTask}
          onUpdate={updateTask}
          editingTaskId={editingTaskId}
          darkMode={darkMode}
          searchTerm={searchTerm}
        />
      </main>
    </div>
  );
};

export default App;
