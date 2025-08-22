import React, { useState } from "react";
import "./App.css";

// TodoItem Component
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
        aria-label={`Delete ${todo.text}`}
      >
        Delete
      </button>
    </li>
  );
};

// AddTodoForm Component
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
        aria-label="Todo input"
      />
      <button type="submit" className="add-btn" data-testid="add-btn">
        Add Todo
      </button>
    </form>
  );
};

// TodoList Component (Main Component)
const TodoList = () => {
  // Initial demo todos - static array as required
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Build a Todo App", completed: false },
    { id: 3, text: "Write Tests", completed: true },
  ]);

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="todo-list" data-testid="todo-list">
      <h1>Todo List</h1>
      <AddTodoForm onAdd={addTodo} />
      <ul className="todos-container" data-testid="todos-container">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))
        ) : (
          <p data-testid="no-todos-message">No todos yet. Add one above!</p>
        )}
      </ul>
    </div>
  );
};

// App Component
function App() {
  return (
    <div className="App">
      <TodoList />
    </div>
  );
}

export default App;
