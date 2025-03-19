import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { addTodo, toggleTodo, deleteTodo, editTodo } from '../redux/slices/todoSlice';
import Todo from './Todo';
import { v4 as uuidv4 } from 'uuid';

const TodoList: React.FC = () => {
  const [newTodoText, setNewTodoText] = useState('');
  const todos = useSelector((state: RootState) => state.todos.items);
  const dispatch = useDispatch();

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodoText.trim()) {
      dispatch(addTodo({
        id: uuidv4(),
        text: newTodoText,
        completed: false
      }));
      setNewTodoText('');
    }
  };

  return (
    <div className="todo-list">
      <h2>Список задач</h2>
      
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="Добавить новую задачу"
        />
        <button type="submit">Добавить</button>
      </form>
      
      <div className="todos-container">
        {todos.length === 0 ? (
          <p>Нет задач. Добавьте новую задачу!</p>
        ) : (
          todos.map(todo => (
            <Todo
              key={todo.id}
              id={todo.id}
              text={todo.text}
              completed={todo.completed}
              onToggle={(id) => dispatch(toggleTodo(id))}
              onDelete={(id) => dispatch(deleteTodo(id))}
              onEdit={(id, newText) => dispatch(editTodo({ id, text: newText }))}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TodoList; 