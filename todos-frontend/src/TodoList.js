import React, { useEffect, useState } from "react";
import axios from 'axios';
import './App.css';
// import { useState } from 'react';
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState(''); // 追加
  useEffect(() => {
    axios.get('http://localhost:3001/todos')
      .then(response => setTodos(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleNewTodoChange = (e) => { // 追加
    setNewTodo(e.target.value);
  };

  const handleNewTodo = (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
  
    axios.post('http://localhost:3001/todos', { // POSTリクエストを送信
      title: newTodo,
      completed: false
    })
    .then(response => {
      setTodos([...todos, response.data]);
      setNewTodo('');
    })
    .catch(error => console.error(error));
  };

  const handleDeleteTodo = (id) => { // 追加
    axios.delete(`http://localhost:3001/todos/${id}`)
    .then(response => {
      setTodos(todos.filter(todo => todo.id !== id));
    })
    .catch(error => console.error(error));
  };
  const [editingTodo, setEditingTodo] = useState(null);
const [editingText, setEditingText] = useState('');

const handleEditButtonClick = (todo) => {
  setEditingTodo(todo);
  setEditingText(todo.title);
};

const handleEditingTextChange = (e) => {
  setEditingText(e.target.value);
};

const handleUpdateTodo = (e) => {
  e.preventDefault();

  axios.patch(`http://localhost:3001/todos/${editingTodo.id}`, { title: editingText })
  .then(response => {
    setTodos(todos.map(todo => todo.id === editingTodo.id ? response.data : todo));
    setEditingTodo(null);
    setEditingText('');
  })
  .catch(error => console.error(error));
};

  return (
    <div className="TodoList">
  <div className="container">
    <h1>Todo App</h1>
    <form onSubmit={handleNewTodo}>
      <input
        value={newTodo}
        onChange={handleNewTodoChange}
      />
      <button type="submit">Add Todo</button>
    </form>
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          {editingTodo && editingTodo.id === todo.id ? (
            <form onSubmit={handleUpdateTodo}>
              <input
                value={editingText}
                onChange={handleEditingTextChange}
              />
              <button type="submit">Update Todo</button>
            </form>
          ) : (
            <>
              {todo.title} {todo.completed ? "✓" : ""}
              <button onClick={() => handleEditButtonClick(todo)}>Edit</button>
              <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
            </>
          )}
        </li>
      ))}
    </ul>
  </div>
</div>
  );
}

export default TodoList;
