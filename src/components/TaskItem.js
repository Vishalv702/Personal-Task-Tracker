import React from "react";
import { Check, Edit2, Trash2 } from "lucide-react";
import TaskForm from "./TaskForm";

const TaskItem = ({
  task,
  onToggle,
  onEdit,
  onDelete,
  onUpdate,
  isEditing,
  darkMode,
}) => {
  const formatDate = (dateString) =>
    new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const priority = (task.priority || "Medium").toLowerCase();
  const capitalizedPriority =
    priority.charAt(0).toUpperCase() + priority.slice(1);

  if (isEditing) {
    return (
      <TaskForm
        task={task}
        onSubmit={(updates) => onUpdate(task.id, updates)}
        onCancel={() => onEdit(null)}
        darkMode={darkMode}
      />
    );
  }

  return (
    <div className={`task-item-container ${darkMode ? "dark" : ""}`}>
      <div className="task-item-content">
        {/* Completion Toggle */}
        <button
          className={`complete-toggle ${task.completed ? "completed" : ""} ${
            darkMode ? "dark" : ""
          }`}
          onClick={() => onToggle(task.id)}
        >
          {task.completed && <Check size={14} />}
        </button>

        {/* Task Details */}
        <div className="task-details">
          <div className="task-header">
            <h3 className={`task-title ${task.completed ? "completed" : ""}`}>
              {task.title}
            </h3>
          </div>
          <p className={`task-desc ${task.completed ? "completed" : ""}`}>
            {task.description}
          </p>
          <div className="task-meta">
            <span className={`priority-badge ${capitalizedPriority}`}>
              {capitalizedPriority}
            </span>
            <span className="date">{formatDate(task.createdAt)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="task-actions">
          <button className="edit-btn action-btn" onClick={() => onEdit(task.id)}>
            <Edit2 size={16} />
          </button>
          <button className="delete-btn action-btn" onClick={() => onDelete(task.id)}>
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
