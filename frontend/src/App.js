import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import the styles

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');

  // Fetch todos from the backend
  useEffect(() => {
    axios.get('http://localhost:5000/todos')
      .then(response => {
        setTodos(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the todos!', error);
      });
  }, []);

  // Function to add a new todo
  const addTodo = () => {
    if (task) {
      axios.post('http://localhost:5000/todos', { task })
        .then(response => {
          setTodos([...todos, response.data]);
          setTask(''); // Clear input field after adding todo
        })
        .catch(error => {
          console.error('Error adding todo!', error);
        });
    }
  };

  // Function to delete a todo by id
  const deleteTodo = (id) => {
    axios.delete(`http://localhost:5000/todos/${id}`)
      .then(() => {
        setTodos(todos.filter(todo => todo.id !== id));
      })
      .catch(error => {
        console.error('Error deleting todo!', error);
      });
  };

  return (
    <div>
      <h1>To-Do App</h1>
      <div className="input-container">
        <input
          type="text"
          value={task}
          onChange={e => setTask(e.target.value)}
          placeholder="Enter a task"
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.task}
            <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
