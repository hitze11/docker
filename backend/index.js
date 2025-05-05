const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let todos = [
  { id: 1, text: 'Learn Docker', completed: false },
  { id: 2, text: 'Build a Full-Stack App', completed: false },
];

// Get all todos
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

// Get a single todo by ID
app.get('/api/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).send('Todo not found');
  res.json(todo);
});

// Add a new todo
app.post('/api/todos', (req, res) => {
  const newTodo = { id: todos.length + 1, ...req.body };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Delete a todo by ID
app.delete('/api/todos/:id', (req, res) => {
  todos = todos.filter(t => t.id !== parseInt(req.params.id));
  res.status(204).send();
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
