import React, { useState } from 'react';

interface TodoProps {
  id: string;
  text: string;
  completed: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

const Todo: React.FC<TodoProps> = ({ id, text, completed, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const handleEdit = () => {
    onEdit(id, editText);
    setIsEditing(false);
  };

  return (
    <div className={`todo-item ${completed ? 'completed' : ''}`}>
      {isEditing ? (
        <div className="edit-mode">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button onClick={handleEdit}>Сохранить</button>
          <button onClick={() => setIsEditing(false)}>Отмена</button>
        </div>
      ) : (
        <div className="view-mode">
          <input
            type="checkbox"
            checked={completed}
            onChange={() => onToggle(id)}
          />
          <span className={completed ? 'text-completed' : ''}>{text}</span>
          <div className="actions">
            <button onClick={() => setIsEditing(true)}>Редактировать</button>
            <button onClick={() => onDelete(id)}>Удалить</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Todo; 