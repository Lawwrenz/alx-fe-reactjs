import React, { useState } from "react";

const AddTodoForm = ({ onAdd }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAdd(inputValue.trim());
      setInputValue("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="add-todo-form"
      data-testid="add-todo-form"
    >
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add a new todo..."
        className="todo-input"
        data-testid="todo-input"
      />
      <button type="submit" className="add-btn" data-testid="add-btn">
        Add Todo
      </button>
    </form>
  );
};

export default AddTodoForm;
