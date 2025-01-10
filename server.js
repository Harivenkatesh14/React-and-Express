const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

let todos = []; // This will temporarily store our to-dos (replace with a database in production)

// Route to get all to-dos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// Route to add a new to-do
app.post('/todos', (req, res) => {
  const newTodo = {
    id: todos.length + 1,
    text: req.body.text,
    completed: false
  };
  todos.push(newTodo);
  res.json(newTodo);
});

// Route to delete a to-do
app.delete('/todos/:id', (req, res) => {
  todos = todos.filter(todo => todo.id !== parseInt(req.params.id));
  res.json({ message: 'Todo deleted' });
});

// Route to toggle completion status of a to-do
app.put('/todos/:id', (req, res) => {
  const todo = todos.find(todo => todo.id === parseInt(req.params.id));
  if (todo) {
    todo.completed = !todo.completed;
    res.json(todo);
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
