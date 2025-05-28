import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tasksSchema } from "./schema/tasksSchema";
import type { TaskFormData } from "./schema/tasksSchema";

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import DeleteModal from "./components/DeleteModal";
import "./styles/App.css";
import "./styles/DeleteModal.css";
import "./styles/TaskForm.css";
import "./styles/TaskItem.css";
import "./styles/TaskList.css";

export interface Task extends TaskFormData {
  id: string;
  completed: boolean;
}

function App() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({ resolver: zodResolver(tasksSchema) });

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
    setTasks((prev) => [...prev, newTask]);
    reset();
  };

  const handleToggleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
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
      setTasks((prev) => prev.filter((task) => task.id !== taskIdToDelete));
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
      <TaskForm
        onSubmit={onSubmit}
        register={register}
        errors={errors}
        handleSubmit={handleSubmit}
      />
      <TaskList
        tasks={filteredTasks}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        showCompleted={showCompleted}
        setShowCompleted={setShowCompleted}
        handleToggleComplete={handleToggleComplete}
        openDeleteConfirmModal={openDeleteConfirmModal}
      />
      <DeleteModal
        visible={showConfirmModal}
        onConfirm={confirmDeleteTask}
        onCancel={closeDeleteConfirmModal}
      />
    </div>
  );
}

export default App;
