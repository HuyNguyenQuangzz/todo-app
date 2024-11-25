import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState("All");

  const handleAddTask = () => {
    if (inputValue.trim()) {
      setTasks([...tasks, { text: inputValue, completed: false }]);
      setInputValue("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleAddTask();
  };

  const toggleCompleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "All") return true;
    if (filter === "To do") return !task.completed;
    if (filter === "Done") return task.completed;
    return true;
  });

  return (
    <div className="app">
      <p>Let's add what you have to do!</p>
      <p>
        Fill the input and click the button or press "Enter" to add a new task
        <br></br>into the list.<br></br> To mark as completed, just click
        directly to the task.
      </p>
      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Enter a task..."
          className="task-input"
        />
        <button onClick={handleAddTask} className="add-button">
          +
        </button>
      </div>

      <div className="task-list" style={{ backgroundColor: "#FEF3C7" }}>
        <div className="filter-container">
          <label id="Filter" htmlFor="filter">List:</label>
          <select
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="filter-dropdown"
          >
            <option value="All">All</option>
            <option value="To do">To do</option>
            <option value="Done">Done</option>
          </select>
        </div>
        {filteredTasks.map((task, index) => (
          <div
            key={index}
            className="task-item"
            onMouseEnter={() =>
              (document.getElementById(`delete-${index}`).style.visibility =
                "visible")
            }
            onMouseLeave={() =>
              (document.getElementById(`delete-${index}`).style.visibility =
                "hidden")
            }
          >
            <span
              onClick={() => toggleCompleteTask(index)}
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                color: task.completed ? "#9CA3AF" : "#000",
              }}
            >
              {index + 1}. {task.text}
            </span>
            <button
              id={`delete-${index}`}
              onClick={() => handleDeleteTask(index)}
              className="delete-button"
              style={{ visibility: "hidden", color: "#B45309" }}
            >
              🗑️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
