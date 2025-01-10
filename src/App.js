import React, { useState } from "react";
import "./App.css"; // For adding custom styles

function App() {
  const [tasks, setTasks] = useState([]); // Store all tasks
  const [newTask, setNewTask] = useState(""); // Handle input for new tasks

  // Add a new task
  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask(""); // Clear input field
    }
  };

  // Toggle task completion
  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, idx) =>
      idx === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Remove a task
  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, idx) => idx !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="todo-app">
      <h2>A Simple ToDo List App</h2>

      {/* Input and Add Task Button */}
      <div className="add-task">
        <input
          type="text"
          placeholder="Add new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      {/* Added Task Section */}
      <h3>Added Task</h3>
      <ul className="task-list">
        {tasks
          .filter((task) => !task.completed)
          .map((task, index) => (
            <li key={index} className="task-item">
              <input
                type="checkbox"
                onChange={() => toggleTaskCompletion(index)}
              />
              {task.text}
              <button className="remove-btn" onClick={() => removeTask(index)}>
                Remove
              </button>
            </li>
          ))}
      </ul>

      {/* Completed Task Section */}
      <h3>Completed task</h3>
      <ul className="task-list">
        {tasks
          .filter((task) => task.completed)
          .map((task, index) => (
            <li key={index} className="task-item completed">
              <input
                type="checkbox"
                checked
                onChange={() => toggleTaskCompletion(index)}
              />
              {task.text}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
