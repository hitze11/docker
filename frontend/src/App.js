import React, { useState, useEffect } from 'react';
import { fetchTodos, addTodo, deleteTodo } from './api';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTodos().then(setTodos);
  }, []);

  const handleAddTodo = async () => {
    const todo = await addTodo({ text: newTodo, completed: false });
    setTodos([...todos, todo]);
    setNewTodo('');
  };

  const handleDeleteTodo = async (id) => {
    await deleteTodo(id);
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <input
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="New todo"
      />
      <button onClick={handleAddTodo}>Add Todo</button>
    </div>
  );
}

export default App;
