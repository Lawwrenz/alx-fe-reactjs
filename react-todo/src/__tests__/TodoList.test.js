import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoList from "../components/TodoList";

describe("TodoList Component", () => {
  // Test 1: Initial render with demo todos
  test("renders initial todos correctly", () => {
    render(<TodoList />);

    // Check if initial todos are rendered
    expect(screen.getByText("Learn React")).toBeInTheDocument();
    expect(screen.getByText("Build a Todo App")).toBeInTheDocument();
    expect(screen.getByText("Write Tests")).toBeInTheDocument();

    // Check if completed todo has proper styling
    const completedTodo = screen.getByTestId("todo-item-3");
    expect(completedTodo).toHaveClass("completed");
  });

  // Test 2: Adding a new todo
  test("adds a new todo when form is submitted", () => {
    render(<TodoList />);

    const input = screen.getByTestId("todo-input");
    const addButton = screen.getByTestId("add-btn");

    // Add a new todo
    fireEvent.change(input, { target: { value: "New Test Todo" } });
    fireEvent.click(addButton);

    // Check if new todo is added
    expect(screen.getByText("New Test Todo")).toBeInTheDocument();

    // Check if input is cleared after adding
    expect(input).toHaveValue("");
  });

  // Test 3: Toggling todo completion
  test("toggles todo completion status when clicked", () => {
    render(<TodoList />);

    const todoItem = screen.getByTestId("todo-item-1"); // Learn React

    // Initially should not be completed
    expect(todoItem).not.toHaveClass("completed");

    // Click to toggle completion
    fireEvent.click(todoItem);

    // Should now be completed
    expect(todoItem).toHaveClass("completed");

    // Click again to toggle back
    fireEvent.click(todoItem);

    // Should not be completed again
    expect(todoItem).not.toHaveClass("completed");
  });

  // Test 4: Deleting a todo
  test("deletes a todo when delete button is clicked", () => {
    render(<TodoList />);

    const initialTodos = screen.getAllByTestId(/todo-item-/);
    const initialCount = initialTodos.length;

    // Delete the first todo
    const deleteButton = screen.getByTestId("delete-btn-1");
    fireEvent.click(deleteButton);

    // Check if todo is removed
    const remainingTodos = screen.getAllByTestId(/todo-item-/);
    expect(remainingTodos).toHaveLength(initialCount - 1);

    // Verify the specific todo is gone
    expect(screen.queryByText("Learn React")).not.toBeInTheDocument();
  });

  // Test 5: Empty input validation
  test("does not add empty todo", () => {
    render(<TodoList />);

    const initialTodos = screen.getAllByTestId(/todo-item-/);
    const initialCount = initialTodos.length;

    // Try to add empty todo
    const addButton = screen.getByTestId("add-btn");
    fireEvent.click(addButton);

    // Count should remain the same
    const currentTodos = screen.getAllByTestId(/todo-item-/);
    expect(currentTodos).toHaveLength(initialCount);
  });
});
