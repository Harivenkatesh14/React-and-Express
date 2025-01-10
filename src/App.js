import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  // Fetch todos from the backend when the component mounts
  useEffect(() => {
    axios.get('http://localhost:5000/todos')
      .then(response => {
        setTodos(response.data);
      })
      .catch(error => {
        console.error('Error fetching todos:', error);
      });
  }, []); // Empty array ensures this runs only once when the component mounts

  // Handle adding a new to-do
  const handleAddTodo = () => {
    if (newTodo.trim() === '') return;

    axios.post('http://localhost:5000/todos', { text: newTodo })
      .then(response => {
        setTodos([...todos, response.data]);
        setNewTodo('');
      })
      .catch(error => {
        console.error('Error adding todo:', error);
      });
  };

  // Handle deleting a to-do
  const handleDeleteTodo = (id) => {
    axios.delete(`http://localhost:5000/todos/${id}`)
      .then(() => {
        setTodos(todos.filter(todo => todo.id !== id));
      })
      .catch(error => {
        console.error('Error deleting todo:', error);
      });
  };

  // Handle toggling completion status of a to-do
  const handleToggleTodo = (id) => {
    axios.put(`http://localhost:5000/todos/${id}`)
      .then(response => {
        const updatedTodos = todos.map(todo =>
          todo.id === id ? { ...todo, completed: response.data.completed } : todo
        );
        setTodos(updatedTodos);
      })
      .catch(error => {
        console.error('Error toggling todo:', error);
      });
  };

  return (
    <div className="App">
      <h1>To-Do App</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Enter a new task"
      />
      <button onClick={handleAddTodo}>Add To-Do</button>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              onClick={() => handleToggleTodo(todo.id)}
            >
              {todo.text}
            </span>
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
