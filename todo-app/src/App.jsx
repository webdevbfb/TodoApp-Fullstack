import './App.css';
import { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';

function App() {
  const [todos, setTodos] = useState([]);

  // Todos laden
  useEffect(() => {
    fetch('http://localhost:3000/api/todos')
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error('Error fetching todos:', error));
  }, []);

  // Neues Todo hinzufügen
  const addTodo = (title) => {
    fetch('http://localhost:3000/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    })
      .then((response) => response.json())
      .then((newTodo) => setTodos([...todos, newTodo]));
  };

  // Todo löschen
  const deleteTodo = (id) => {
    fetch(`http://localhost:3000/api/todos/${id}`, { method: 'DELETE' })
      .then(() => setTodos(todos.filter((todo) => todo.id !== id)));
  };

  // Todo abhaken (completed Status umschalten)
  const toggleTodo = (id) => {
    fetch(`http://localhost:3000/api/todos/${id}`, { method: 'PATCH' })
      .then((response) => response.json())
      .then((updatedTodo) => {
        setTodos(todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)));
      });
  };

  return (
    <div className="app-container">
      <h1>Todo App</h1>
      <AddTodo onAdd={addTodo} />
      <TodoList todos={todos} onDelete={deleteTodo} onToggle={toggleTodo} />
    </div>
  );
}

export default App;
