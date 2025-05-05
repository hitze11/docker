export default function TodoList({ todos, onToggle }) {
    return (
      <ul>
        {todos.map((todo, index) => (
          <li
            key={index}
            onClick={() => onToggle(index)}
            style={{ textDecoration: todo.done ? 'line-through' : 'none', cursor: 'pointer' }}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    );
  }
  