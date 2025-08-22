import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddTodoForm from "../components/AddTodoForm";

describe("AddTodoForm Component", () => {
  test("calls onAdd with input value when form is submitted", () => {
    const mockOnAdd = jest.fn();
    render(<AddTodoForm onAdd={mockOnAdd} />);

    const input = screen.getByTestId("todo-input");
    const addButton = screen.getByTestId("add-btn");

    // Enter text and submit
    fireEvent.change(input, { target: { value: "Test Todo" } });
    fireEvent.click(addButton);

    // Check if onAdd was called with correct value
    expect(mockOnAdd).toHaveBeenCalledWith("Test Todo");
    expect(input).toHaveValue("");
  });

  test("does not call onAdd when input is empty", () => {
    const mockOnAdd = jest.fn();
    render(<AddTodoForm onAdd={mockOnAdd} />);

    const addButton = screen.getByTestId("add-btn");

    // Submit with empty input
    fireEvent.click(addButton);

    // onAdd should not be called
    expect(mockOnAdd).not.toHaveBeenCalled();
  });
});
