const TaskFilter = ({ currentFilter, setFilter, taskCounts, darkMode }) => {
  const filters = ['all', 'pending', 'completed'];

  return (
    <div className={`task-filter ${darkMode ? 'dark' : ''}`}>
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => setFilter(filter)}
          className={`filter-button ${currentFilter === filter ? 'active' : ''}`}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)} ({taskCounts[filter]})
        </button>
      ))}
    </div>
  );
};

export default TaskFilter;
