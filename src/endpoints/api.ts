import { TodoList } from "../types";

export const fetchTodoLists = async (): Promise<TodoList[]> => {
  const response = await fetch("/api/todolists");

  if (!response.ok) {
    throw new Error("Failed to fetch todo lists");
  }

  return response.json();
};

export const createTodoList = async (name: string): Promise<TodoList> => {
  const response = await fetch("/api/todolists", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    throw new Error("Failed to create todo list");
  }

  return response.json();
};

export const deleteTodoList = async (listId: number): Promise<void> => {
  const response = await fetch(`/api/todolists/${listId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete todo list");
  }
};

export const deleteItem = async (itemId: number): Promise<void> => {
  const response = await fetch(`/api/items/${itemId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete item");
  }
};

export const createItem = async ({
  listId,
  description,
}: {
  listId: number;
  description: string;
}): Promise<void> => {
  const response = await fetch("/api/items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      todo_list_id: listId,
      description,
      completed: false,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create item");
  }
};

export const toggleItem = async (itemId: number): Promise<void> => {
  const response = await fetch(`/api/items/${itemId}/toggle`, {
    method: "PATCH",
  });

  if (!response.ok) {
    throw new Error("Failed to toggle item");
  }
};

export const completeAllItems = async ({
  listId,
  complete,
}: {
  listId: number;
  complete: boolean;
}): Promise<void> => {
  const response = await fetch(`/api/todolists/${listId}/complete-all`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ complete }),
  });

  if (!response.ok) {
    throw new Error("Failed to complete all items");
  }
};
