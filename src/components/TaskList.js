import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({
  tasks,
  onToggle,
  onEdit,
  onDelete,
  onUpdate,
  editingTaskId,
  darkMode,
  searchTerm
}) => {
  if (tasks.length === 0) {
    return <p className={`no-tasks ${darkMode ? 'dark' : ''}`}>No tasks found.</p>;
  }

  return (
    <div className={`task-list ${darkMode ? 'dark' : ''}`}>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
          onUpdate={onUpdate}
          isEditing={editingTaskId === task.id}
          darkMode={darkMode}
          searchTerm={searchTerm}
        />
      ))}
    </div>
  );
};

export default TaskList;
