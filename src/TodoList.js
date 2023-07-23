import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  const addTodo = () => {
    if (inputValue.trim() !== "") {
      setTodos((prevTodos) => [
        ...prevTodos,
        { id: uuidv4(), text: inputValue, completed: false },
      ]);
      setInputValue("");
    }
  };

  const toggleTodoComplete = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDoubleClick = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    setEditingTodo(todoToEdit);
  };

  const editTodo = (id, newText) => {
    if (newText.trim() !== "") {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, text: newText } : todo
        )
      );
      setEditingTodo(null);
    }
  };

  const startEditing = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    setEditingTodo(todoToEdit);
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="todo-list-container">
      <h1>Todo List</h1>
      <div className="todo-input-container">
        <input
          type="text"
          placeholder="Enter a new todo..."
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul className="todo-items">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`todo-item ${todo.completed ? "completed" : ""}`}
            onClick={() => toggleTodoComplete(todo.id)}
            onDoubleClick={() => handleDoubleClick(todo.id)}
          >
            {editingTodo && editingTodo.id === todo.id ? (
              <input
                type="text"
                value={editingTodo.text}
                onChange={(e) =>
                  setEditingTodo({
                    ...editingTodo,
                    text: e.target.value,
                  })
                }
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    editTodo(todo.id, editingTodo.text);
                  }
                }}
                onBlur={() => editTodo(todo.id, editingTodo.text)}
                autoFocus
              />
            ) : (
              <span>{todo.text}</span>
            )}
            <div className="todo-item-actions">
              <button onClick={() => startEditing(todo.id)}>Edit</button>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;