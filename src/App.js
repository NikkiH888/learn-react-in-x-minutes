import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList'
import uuidv4 from 'uuid/v4'

const LOCAL_STORAGE_KEY = 'todoApp.todos';

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();
  var numbersOfLeftTodo = todos.filter(todo => !todo.complete).length;

  // Load the todos from our local storage 
  // Only call once right when our component loads
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  // Save the todos to our local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find(todo => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value;
    if (name === "") { return; }
    setTodos(prevTodos => [...prevTodos, { id: uuidv4(), name: name, complete: false }]);
    todoNameRef.current.value = null; // clear the input field
  }

  function handleClearTodos(e) {
    const newtTodos = todos.filter(todo => !todo.complete);
    setTodos(newtTodos);
  }

  return (
    <>
      <TodoList todoList={todos} toggleTodo={toggleTodo} />
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodos}>Clear Completed</button>
      <div>{numbersOfLeftTodo} left to do</div>
    </>
  );
}

export default App;
