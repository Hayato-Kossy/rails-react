import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import TodoList from './TodoList';
import UserList from './UserList';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/todos">Todo List</Link>
            </li>
            <li>
              <Link to="/users">User List</Link>
            </li>
          </ul>
        </nav>

        <Route path="/todos" component={TodoList} />
        <Route path="/users" component={UserList} />
      </div>
    </Router>
  );
}

export default App;
