import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { TaskFormData } from "../schema/tasksSchema";

interface TaskFormProps {
  onSubmit: (data: TaskFormData) => void;
  register: UseFormRegister<TaskFormData>;
  errors: FieldErrors<TaskFormData>;
  handleSubmit: (
    cb: (data: TaskFormData) => void
  ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
}

const TaskForm = ({
  onSubmit,
  register,
  errors,
  handleSubmit,
}: TaskFormProps) => {
  return (
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
          <select id="priority" defaultValue="" {...register("priority")}>
            <option value="" disabled>
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
          <input id="storyPoints" type="number" {...register("storyPoints")} />
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
  );
};

export default TaskForm;
