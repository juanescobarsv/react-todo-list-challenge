import type { Task } from "../App";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  showCompleted: boolean;
  setShowCompleted: (value: boolean) => void;
  handleToggleComplete: (id: string) => void;
  openDeleteConfirmModal: (id: string) => void;
}

const TaskList = ({
  tasks,
  searchTerm,
  setSearchTerm,
  showCompleted,
  setShowCompleted,
  handleToggleComplete,
  openDeleteConfirmModal,
}: TaskListProps) => {
  return (
    <div className="task-list-section">
      <h2>{showCompleted ? "Task List: Completed" : "Task List: Pending"}</h2>
      <div className="search-and-filter">
        <input
          type="text"
          placeholder="Search by name or assignee:"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={showCompleted}
            onChange={() => setShowCompleted(!showCompleted)}
          />
          Show Completed Tasks
        </label>
      </div>

      {tasks.length === 0 ? (
        <p>No tasks found!</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={handleToggleComplete}
              onDelete={openDeleteConfirmModal}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
