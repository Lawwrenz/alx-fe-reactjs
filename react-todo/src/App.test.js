import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";

describe("TodoList Component", () => {
  beforeEach(() => {
    render(<App />);
  });

  // Test 1: Initial render with demo todos
  test("renders initial todos correctly", () => {
    // Check if initial todos are rendered
    expect(screen.getByText("Learn React")).toBeInTheDocument();
    expect(screen.getByText("Build a Todo App")).toBeInTheDocument();
    expect(screen.getByText("Write Tests")).toBeInTheDocument();

    // Check if completed todo has proper styling
    const completedTodo = screen.getByTestId("todo-item-3");
    expect(completedTodo).toHaveClass("completed");

    // Check if non-completed todos don't have completed class
    const nonCompletedTodo = screen.getByTestId("todo-item-1");
    expect(nonCompletedTodo).not.toHaveClass("completed");
  });

  // Test 2: Adding a new todo
  test("adds a new todo when form is submitted", () => {
    const input = screen.getByTestId("todo-input");
    const addButton = screen.getByTestId("add-btn");

    // Add a new todo
    fireEvent.change(input, { target: { value: "New Test Todo" } });
    fireEvent.click(addButton);

    // Check if new todo is added
    expect(screen.getByText("New Test Todo")).toBeInTheDocument();

    // Check if input is cleared after adding
    expect(input).toHaveValue("");

    // Verify the new todo is not completed by default
    const newTodo = screen.getByText("New Test Todo").closest("li");
    expect(newTodo).not.toHaveClass("completed");
  });

  // Test 3: Toggling todo completion
  test("toggles todo completion status when clicked", () => {
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
    const initialTodos = screen.getAllByTestId(/todo-item-/);
    const initialCount = initialTodos.length;
    const todoText = "Learn React";

    // Verify the todo exists before deletion
    expect(screen.getByText(todoText)).toBeInTheDocument();

    // Delete the todo
    const deleteButton = screen.getByTestId("delete-btn-1");
    fireEvent.click(deleteButton);

    // Check if todo is removed
    const remainingTodos = screen.getAllByTestId(/todo-item-/);
    expect(remainingTodos).toHaveLength(initialCount - 1);

    // Verify the specific todo is gone
    expect(screen.queryByText(todoText)).not.toBeInTheDocument();
  });

  // Test 5: Empty input validation
  test("does not add empty todo when form is submitted with empty input", () => {
    const initialTodos = screen.getAllByTestId(/todo-item-/);
    const initialCount = initialTodos.length;

    // Try to add empty todo
    const addButton = screen.getByTestId("add-btn");
    fireEvent.click(addButton);

    // Count should remain the same
    const currentTodos = screen.getAllByTestId(/todo-item-/);
    expect(currentTodos).toHaveLength(initialCount);
  });

  // Test 6: Form submission with Enter key
  test("adds todo when form is submitted with Enter key", () => {
    const input = screen.getByTestId("todo-input");
    const form = screen.getByTestId("add-todo-form");

    // Add a new todo using Enter key
    fireEvent.change(input, { target: { value: "Enter Key Todo" } });
    fireEvent.submit(form);

    // Check if new todo is added
    expect(screen.getByText("Enter Key Todo")).toBeInTheDocument();
  });

  // Test 7: Adding todo with whitespace only
  test("does not add todo with whitespace only input", () => {
    const initialTodos = screen.getAllByTestId(/todo-item-/);
    const initialCount = initialTodos.length;
    const input = screen.getByTestId("todo-input");
    const addButton = screen.getByTestId("add-btn");

    // Try to add todo with only spaces
    fireEvent.change(input, { target: { value: "   " } });
    fireEvent.click(addButton);

    // Count should remain the same
    const currentTodos = screen.getAllByTestId(/todo-item-/);
    expect(currentTodos).toHaveLength(initialCount);
  });

  // Test 8: Multiple todo operations
  test("handles multiple operations correctly", () => {
    const input = screen.getByTestId("todo-input");
    const addButton = screen.getByTestId("add-btn");

    // Add multiple todos
    fireEvent.change(input, { target: { value: "First New Todo" } });
    fireEvent.click(addButton);

    fireEvent.change(input, { target: { value: "Second New Todo" } });
    fireEvent.click(addButton);

    // Verify they were added
    expect(screen.getByText("First New Todo")).toBeInTheDocument();
    expect(screen.getByText("Second New Todo")).toBeInTheDocument();

    // Toggle one of them
    const newTodo = screen.getByText("First New Todo").closest("li");
    fireEvent.click(newTodo);
    expect(newTodo).toHaveClass("completed");

    // Delete one of them
    const deleteButton = within(newTodo).getByTestId(/delete-btn/);
    fireEvent.click(deleteButton);

    // Verify it was deleted
    expect(screen.queryByText("First New Todo")).not.toBeInTheDocument();
    expect(screen.getByText("Second New Todo")).toBeInTheDocument();
  });
});
