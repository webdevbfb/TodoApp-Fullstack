export default function TodoList({ todos, onDelete, onToggle }) {

  const check = <i class="fa-solid fa-rotate-left"></i>;
  
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id} className={todo.completed ? 'completed' : ''}>
          {todo.title}
          <div>
            <button onClick={() => onToggle(todo.id)}>
              {todo.completed ? <i class="fa-solid fa-rotate-left"></i> : <i class="fa-solid fa-check"></i>}
            </button>
            <button className="delete" onClick={() => onDelete(todo.id)}>
            <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
