import type { Task } from "../App";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskItem = ({ task, onToggle, onDelete }: TaskItemProps) => {
  return (
    <li className={`task-item ${task.completed ? "completed" : ""}`}>
      <div>
        <h3>{task.taskName}</h3>
        <p>
          Priority:{" "}
          <span className={`priority-${task.priority.toLowerCase()} task-info`}>
            {task.priority}
          </span>
        </p>
        <p>
          Story Points: <span className="task-info">{task.storyPoints}</span>
        </p>
        <p>
          Assignee: <span className="task-info">{task.assignee}</span>
        </p>
        <p>
          Due Date: <span className="task-info">{task.dueDate}</span>
        </p>
      </div>
      <div className="task-actions">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
          />
          Completed
        </label>
        <button className="delete-button" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
