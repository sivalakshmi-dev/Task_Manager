import { useEffect, useState } from "react";
import "./App.css";
import type { Task } from "./types";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";


function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Load tasks from localStorage when app loads
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Save tasks whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
    };

    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );

    setTasks(updatedTasks);
  };
  const updateTask = (id: string, newTitle: string) => {
  const updatedTasks = tasks.map((task) =>
    task.id === id ? { ...task, title: newTitle } : task
  );

  setTasks(updatedTasks);
};
  const deleteTask = (id: string) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  };

  return (
  <div className="app-wrapper">
    <h1 className="main-heading">Task Manager</h1>

    <div className="container">
      <p className="subtitle">Stay organized and productive</p>

      <TaskForm addTask={addTask} />

      <div className="task-summary">
        <span>Total: {tasks.length}</span>
        <span>
          Completed: {tasks.filter((task) => task.completed).length}
        </span>
      </div>

      <TaskList
        tasks={tasks}
        toggleTask={toggleTask}
        deleteTask={deleteTask}
        updateTask={updateTask}
      />
    </div>
  </div>
);


}
export default App;
