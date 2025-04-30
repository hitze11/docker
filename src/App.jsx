import { useState } from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  const addTodo = (text) => {
    setTodos([...todos, { text, done: false }]);
  };

  const toggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].done = !newTodos[index].done;
    setTodos(newTodos);
  };

  const filteredTodos = todos.filter(todo =>
    filter === 'all' ? true : filter === 'done' ? todo.done : !todo.done
  );

  return (
    <div className="app">
      <h1>To-do Liste</h1>
      <TodoInput onAdd={addTodo} />
      <div>
        <button onClick={() => setFilter('all')}>Alle</button>
        <button onClick={() => setFilter('open')}>Offen</button>
        <button onClick={() => setFilter('done')}>Erledigt</button>
      </div>
      <TodoList todos={filteredTodos} onToggle={toggleTodo} />
    </div>
  );
}

export default App;
