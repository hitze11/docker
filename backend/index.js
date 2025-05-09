const express = require("express");
const fs = require("fs");
const path = require("path");
const winston = require("winston");

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, "data");
const DATA_FILE = path.join(DATA_DIR, "todos.json");

// Configure Winston Logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [new winston.transports.Console()],
});

// Log database configuration
logger.info("Starting backend API...");
logger.info("Database Configuration (received via ENV):", {
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USER: process.env.DB_USER,
  DB_NAME: process.env.DB_NAME,
  DB_PASSWORD: process.env.DB_PASSWORD ? "[REDACTED]" : "N/A",
});
logger.info("-------------------------------------------");

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
    logger.error("Error reading data file:", err);
  }
} else {
  logger.info("Data file not found, initializing with an empty array.");
}

// Save todos to file
const saveTodos = () => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(todos, null, 2));
  } catch (err) {
    logger.error("Error writing to data file:", err);
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

app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
