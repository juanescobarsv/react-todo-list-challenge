import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tasksSchema } from "./schema/tasksSchema";
import type { TaskFormData } from "./schema/tasksSchema";

import "./styles/App.css";

interface Task extends TaskFormData {
  id: string;
  completed: boolean;
}

function App() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(tasksSchema),
  });

  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [showCompleted, setShowCompleted] = useState(false);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [taskIdToDelete, setTaskIdToDelete] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const onSubmit = (data: TaskFormData) => {
    const newTask: Task = {
      ...data,
      id: Date.now().toString(),
      completed: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    reset();
  };

  const handleToggleComplete = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const openDeleteConfirmModal = (id: string) => {
    setTaskIdToDelete(id);
    setShowConfirmModal(true);
  };

  const closeDeleteConfirmModal = () => {
    setTaskIdToDelete(null);
    setShowConfirmModal(false);
  };

  const confirmDeleteTask = () => {
    if (taskIdToDelete) {
      setTasks((prevTasks) =>
        prevTasks.filter((task) => task.id !== taskIdToDelete)
      );
      closeDeleteConfirmModal();
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.taskName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.assignee.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCompletion = showCompleted ? task.completed : !task.completed;
    return matchesSearch && matchesCompletion;
  });

  return (
    <div className="container">
      <h1>To Do List</h1>

      <div className="new-task-section">
        <h2>Add New Task</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="taskName">Task Name:</label>
            <input id="taskName" {...register("taskName")} />
            {errors.taskName && (
              <span className="error">{errors.taskName.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priority:</label>
            <select id="priority" {...register("priority")}>
              <option value="" selected disabled>
                Select Priority
              </option>
              <option value="Urgent">Urgent</option>
              <option value="High">High</option>
              <option value="Normal">Normal</option>
              <option value="Low">Low</option>
            </select>
            {errors.priority && (
              <span className="error">{errors.priority.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="storyPoints">Story Points (Effort 1-20):</label>
            <input
              id="storyPoints"
              type="number"
              {...register("storyPoints")}
            />
            {errors.storyPoints && (
              <span className="error">{errors.storyPoints.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="assignee">Assignee:</label>
            <input id="assignee" {...register("assignee")} />
            {errors.assignee && (
              <span className="error">{errors.assignee.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="dueDate">Due Date:</label>
            <input id="dueDate" type="date" {...register("dueDate")} />
            {errors.dueDate && (
              <span className="error">{errors.dueDate.message}</span>
            )}
          </div>

          <button type="submit">Add Task</button>
        </form>
      </div>
      {/* END OF NEW TASK SECTION */}

      <div className="task-list-section">
        <h2>Task List</h2>
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

        {filteredTasks.length === 0 ? (
          <p>No tasks found!</p>
        ) : (
          <ul className="task-list">
            {filteredTasks.map((task) => (
              <li
                key={task.id}
                className={`task-item ${task.completed ? "completed" : ""}`}
              >
                <div>
                  <h3>{task.taskName}</h3>
                  <p>
                    Priority:
                    <span
                      className={`priority-${task.priority.toLowerCase()} task-info`}
                    >
                      <span className="task-info"> {task.priority}</span>
                    </span>
                  </p>
                  <p>
                    Story Points (Effort 1-20):
                    <span className="task-info"> {task.storyPoints}</span>
                  </p>
                  <p>
                    Assignee:
                    <span className="task-info"> {task.assignee}</span>
                  </p>
                  <p>
                    Due Date:
                    <span className="task-info"> {task.dueDate}</span>
                  </p>
                </div>

                <div className="task-actions">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleToggleComplete(task.id)}
                    />
                    Completed
                  </label>
                  <button
                    className="delete-button"
                    onClick={() => openDeleteConfirmModal(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* END OF TASK LIST SECTION */}

      {showConfirmModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this task?</p>
            <div className="modal-actions">
              <button
                className="modal-button confirm"
                onClick={confirmDeleteTask}
              >
                Yes, Delete
              </button>
              <button
                className="modal-button cancel"
                onClick={closeDeleteConfirmModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
