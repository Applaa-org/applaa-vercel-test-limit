import React from 'react';
import { Todo } from '@/types';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { Edit, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  setEditTodo: (todo: Todo) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleTodo, deleteTodo, setEditTodo }) => {
  return (
    <Card className="p-4 flex items-center gap-4 transition-all hover:shadow-md">
      <Checkbox
        id={`todo-${todo.id}`}
        checked={todo.completed}
        onCheckedChange={() => toggleTodo(todo.id)}
        aria-label={`Mark ${todo.text} as ${todo.completed ? 'incomplete' : 'complete'}`}
      />
      <label
        htmlFor={`todo-${todo.id}`}
        className={cn(
          "flex-grow cursor-pointer transition-colors",
          todo.completed ? "text-muted-foreground line-through" : "text-foreground"
        )}
      >
        {todo.text}
      </label>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => setEditTodo(todo)} aria-label={`Edit ${todo.text}`}>
          <Edit className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => deleteTodo(todo.id)} className="text-destructive hover:text-destructive" aria-label={`Delete ${todo.text}`}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};

export default TodoItem;