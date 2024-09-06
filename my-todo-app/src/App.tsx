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
  const response = await fetch(
    "https://66dadc89f47a05d55be63d23.mockapi.io/tasks"
  );
  return response.json();
};

const createTodo = async (text: string): Promise<Todo> => {
  try {
    const response = await fetch(
      "https://66dadc89f47a05d55be63d23.mockapi.io/tasks",
      {
        method: "POST",
        body: JSON.stringify({ text }),
        headers: { "Content-Type": "application/json" },
      }
    );
    if (!response.ok) {
      throw new Error(`Error adding todo: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Error adding todo:", error);
    throw error;
  }
};

const updateTodo = async ({
  id,
  done,
}: {
  id: number;
  done: boolean;
}): Promise<Todo> => {
  try {
    const response = await fetch(
      `https://66dadc89f47a05d55be63d23.mockapi.io/tasks/${id}`,
      {
        method: "PUT",
        body: JSON.stringify({ done }),
        headers: { "Content-Type": "application/json" },
      }
    );
    if (!response.ok) {
      throw new Error(`Error updating todo: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Error updating todo:", error);
    throw error;
  }
};

const deleteTodo = async (id: number): Promise<void> => {
  try {
    const response = await fetch(
      `https://66dadc89f47a05d55be63d23.mockapi.io/tasks/${id}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error(`Error deleting todo: ${response.status}`);
    }
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw error;
  }
}; // React Component
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
    staleTime: 1000,
  });

  const addMutation = useMutation<string, Error, string, unknown>({
    mutationFn: async (text: string) => {
      const response = await createTodo(text);
      return response.id.toString(); // Return the ID of the newly created todo as a string
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
    onError: (error: Error) => console.error("Error adding todo:", error),
  });

  const updateMutation = useMutation<
    Todo,
    Error,
    { id: number; done: boolean },
    unknown
  >({
    mutationFn: updateTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
    onError: (error: Error) => console.error("Error updating todo:", error),
  });

  const deleteMutation = useMutation<void, Error, number, unknown>({
    mutationFn: deleteTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
    onError: (error: Error) => console.error("Error deleting todo:", error),
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
        {Array.isArray(todos) &&
          todos.map((todo: Todo) => (
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
