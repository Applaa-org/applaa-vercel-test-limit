import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Edit } from 'lucide-react';
import { Todo } from '@/types';

interface TodoFormProps {
  addTodo: (text: string) => void;
  editTodo: Todo | null;
  updateTodo: (id: string, text: string) => void;
  setEditTodo: (todo: Todo | null) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ addTodo, editTodo, updateTodo, setEditTodo }) => {
  const [text, setText] = useState('');

  useEffect(() => {
    if (editTodo) {
      setText(editTodo.text);
    } else {
      setText('');
    }
  }, [editTodo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    if (editTodo) {
      updateTodo(editTodo.id, text);
    } else {
      addTodo(text);
    }
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <Input
        type="text"
        placeholder={editTodo ? "Update your todo" : "Add a new todo..."}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-grow"
      />
      <Button type="submit" size="icon" aria-label={editTodo ? "Update Todo" : "Add Todo"}>
        {editTodo ? <Edit className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
      </Button>
      {editTodo && (
        <Button type="button" variant="outline" onClick={() => setEditTodo(null)}>
          Cancel
        </Button>
      )}
    </form>
  );
};

export default TodoForm;