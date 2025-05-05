const API_URL = import.meta.env.VITE_API_URL;

export const fetchTodos = async () => {
  const response = await fetch(`${API_URL}/api/todos`);
  return response.json();
};

export const addTodo = async (todo) => {
  const response = await fetch(`${API_URL}/api/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  });
  return response.json();
};

export const deleteTodo = async (id) => {
  await fetch(`${API_URL}/api/todos/${id}`, { method: 'DELETE' });
};
