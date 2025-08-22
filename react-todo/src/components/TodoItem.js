import React from "react";

const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <li
      className={`todo-item ${todo.completed ? "completed" : ""}`}
      onClick={() => onToggle(todo.id)}
      data-testid={`todo-item-${todo.id}`}
    >
      <span className="todo-text">{todo.text}</span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(todo.id);
        }}
        className="delete-btn"
        data-testid={`delete-btn-${todo.id}`}
      >
        Delete
      </button>
    </li>
  );
};

export default TodoItem;
