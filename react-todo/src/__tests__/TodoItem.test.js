import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoItem from "../components/TodoItem";

describe("TodoItem Component", () => {
  const mockTodo = {
    id: 1,
    text: "Test Todo",
    completed: false,
  };

  const mockOnToggle = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders todo text correctly", () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("Test Todo")).toBeInTheDocument();
  });

  test("calls onToggle when todo item is clicked", () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );

    const todoItem = screen.getByTestId("todo-item-1");
    fireEvent.click(todoItem);

    expect(mockOnToggle).toHaveBeenCalledWith(1);
  });

  test("calls onDelete when delete button is clicked", () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );

    const deleteButton = screen.getByTestId("delete-btn-1");
    fireEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });

  test("applies completed class when todo is completed", () => {
    const completedTodo = { ...mockTodo, completed: true };

    render(
      <TodoItem
        todo={completedTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );

    const todoItem = screen.getByTestId("todo-item-1");
    expect(todoItem).toHaveClass("completed");
  });
});
