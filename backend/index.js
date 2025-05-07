const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, "data");
const DATA_FILE = path.join(DATA_DIR, "todos.json");

app.use(express.json());

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}

// Load todos from file or initialize with an empty array
let todos = [];
if (fs.existsSync(DATA_FILE)) {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf8");
    todos = JSON.parse(data);
  } catch (err) {
    console.error("Error reading data file:", err);
  }
} else {
  console.log("Data file not found, initializing with an empty array.");
}

// Save todos to file
const saveTodos = () => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(todos, null, 2));
  } catch (err) {
    console.error("Error writing to data file:", err);
  }
};

// Get all todos
app.get("/api/todos", (req, res) => {
  res.json(todos);
});

// Get a single todo by ID
app.get("/api/todos/:id", (req, res) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).send("Todo not found");
  res.json(todo);
});

// Add a new todo
app.post("/api/todos", (req, res) => {
  const newTodo = { id: todos.length + 1, ...req.body };
  todos.push(newTodo);
  saveTodos();
  res.status(201).json(newTodo);
});

// Delete a todo by ID
app.delete("/api/todos/:id", (req, res) => {
  todos = todos.filter((t) => t.id !== parseInt(req.params.id));
  saveTodos();
  res.status(204).send();
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
