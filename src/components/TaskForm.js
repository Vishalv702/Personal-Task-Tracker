import React, { useState } from 'react';

const TaskForm = ({ onSubmit, onCancel, darkMode, task }) => {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [priority, setPriority] = useState(task?.priority || 'Medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit({
        title: title.trim(),
        description: description.trim(),
        priority, 
      });
      setTitle('');
      setDescription('');
      setPriority('Medium'); 
    }
  };

  return (
    <form className={`task-form ${darkMode ? 'dark' : ''}`} onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Task title"
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task description"
        ></textarea>
      </div>

      <div className="form-group">
        <label>Priority</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="form-select"
        >
          <option value="High">High </option>
          <option value="Medium">Medium </option>
          <option value="Low">Low </option>
        </select>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-primary">Add Task</button>
        <button type="button" onClick={onCancel} className="btn-secondary">Cancel</button>
      </div>
    </form>
  );
};

export default TaskForm;
