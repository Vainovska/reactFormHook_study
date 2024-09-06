import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";

type Todo = {
  id: number;
  text: string;
  done: boolean;
};

// API functions
const fetchTodos = async (): Promise<Todo[]> => {
  const response = await fetch("/api/todos"); // replace with your API
  return response.json();
};

const createTodo = async (text: string): Promise<Todo> => {
  const response = await fetch("/api/todos", {
    method: "POST",
    body: JSON.stringify({ text, done: false }),
    headers: { "Content-Type": "application/json" },
  });
  return response.json();
};

const updateTodo = async ({
  id,
  done,
}: {
  id: number;
  done: boolean;
}): Promise<Todo> => {
  const response = await fetch(`/api/todos/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ done }),
    headers: { "Content-Type": "application/json" },
  });
  return response.json();
};

const deleteTodo = async (id: number): Promise<void> => {
  await fetch(`/api/todos/${id}`, {
    method: "DELETE",
  });
};

// React Component
const TodoApp: React.FC = () => {
  const [newTask, setNewTask] = useState("");
  const queryClient = useQueryClient();

  // Use fetchTodos in useQuery directly
  const {
    data: todos = [], // Значення за замовчуванням
    isLoading,
    isError,
    error,
  } = useQuery<Todo[], Error>(["todos"], fetchTodos, {
    staleTime: 1000, // кеш даних оновлюється кожну секунду
  });

  const addMutation = useMutation<string, Error, string>(createTodo, {
    onSuccess: () => queryClient.invalidateQueries(["todos"]),
    onError: (error) => console.error("Error creating todo:", error),
  });

  const updateMutation = useMutation<
    { id: number; done: boolean },
    Error,
    { id: number; done: boolean }
  >(updateTodo, {
    onSuccess: () => queryClient.invalidateQueries(["todos"]),
    onError: (error) => console.error("Error updating todo:", error),
  });

  const deleteMutation = useMutation<number, Error, number>(deleteTodo, {
    onSuccess: () => queryClient.invalidateQueries(["todos"]),
    onError: (error) => console.error("Error deleting todo:", error),
  });

  const handleAdd = () => {
    if (newTask.length > 1) {
      addMutation.mutate(newTask);
      setNewTask("");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>; // Handle error display
  }

  return (
    <div>
      <TextField
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="New Task"
      />
      <Button variant="contained" onClick={handleAdd}>
        Add Task
      </Button>
      <List>
        {todos.map((todo) => (
          <ListItem key={todo.id}>
            <ListItemText
              primary={todo.text}
              style={{ textDecoration: todo.done ? "line-through" : "none" }}
            />
            <IconButton
              edge="end"
              onClick={() =>
                updateMutation.mutate({ id: todo.id, done: !todo.done })
              }
            >
              <CheckIcon color={todo.done ? "primary" : "inherit"} />
            </IconButton>
            <IconButton
              edge="end"
              onClick={() => deleteMutation.mutate(todo.id)}
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default TodoApp;
