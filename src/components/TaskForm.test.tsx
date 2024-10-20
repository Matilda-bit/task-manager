// src/components/TaskForm.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskForm from './TaskForm.tsx';

test('renders TaskForm and allows adding a task', () => {
  const handleSave = jest.fn();
  render(<TaskForm task={null} onSave={handleSave} />);


  const titleInput = screen.getByPlaceholderText(/task title/i);
  const descriptionInput = screen.getByPlaceholderText(/task description/i);
  const submitButton = screen.getByText(/add task/i);

  fireEvent.change(titleInput, { target: { value: 'Test Task' } });
  fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });
  fireEvent.click(submitButton);

  expect(handleSave).toHaveBeenCalledWith({
    id: expect.any(Number),
    title: 'Test Task',
    description: 'Test Description',
    completed: false,
  });
});
