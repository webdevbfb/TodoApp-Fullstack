import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

app.use(cors());
app.use(bodyParser.json()); // Zum Verarbeiten von JSON-Body-Daten

let todos = [
  { id: 1, title: 'Learn React', completed: false },
  { id: 2, title: 'Build a Todo App', completed: false },
  { id: 3, title: 'Create Backend API', completed: false }
];

// GET: Alle Todos abrufen
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

// POST: Neues Todo erstellen
app.post('/api/todos', (req, res) => {
  const newTodo = { id: Date.now(), title: req.body.title, completed: false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// DELETE: Todo löschen
app.delete('/api/todos/:id', (req, res) => {
  const todoId = Number(req.params.id);
  todos = todos.filter((todo) => todo.id !== todoId);
  res.status(204).end(); // Kein Inhalt zurückgeben
});

// PATCH: Todo abhaken (completed Status ändern)
app.patch('/api/todos/:id', (req, res) => {
  const todoId = Number(req.params.id);
  const todo = todos.find((todo) => todo.id === todoId);
  if (todo) {
    todo.completed = !todo.completed;
    res.json(todo);
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
});
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
