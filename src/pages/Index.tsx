import { useState } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Todo } from '@/types';
import TodoForm from '@/components/todo/TodoForm';
import TodoList from '@/components/todo/TodoList';
import { v4 as uuidv4 } from 'uuid';

const Index = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [editTodo, setEditTodo] = useState<Todo | null>(null);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: uuidv4(),
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const updateTodo = (id: string, text: string) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, text } : todo
      )
    );
    setEditTodo(null);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
        Todo App
      </h1>
      <p className="text-center text-muted-foreground mb-8">
        Organize your day, one task at a time.
      </p>
      <TodoForm 
        addTodo={addTodo} 
        editTodo={editTodo} 
        updateTodo={updateTodo} 
        setEditTodo={setEditTodo} 
      />
      <TodoList
        todos={todos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
        setEditTodo={setEditTodo}
      />
    </div>
  );
};

export default Index;