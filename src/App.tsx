import { useEffect, useState } from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'all' | 'completed' | 'active'>('all');

  useEffect(() => {
    const saved = localStorage.getItem('todos');
    if (saved) setTodos(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    const newTodo: Todo = { id: Date.now(), text, completed: false };
    setTodos([...todos, newTodo]);
  };

  const toggleComplete = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const clearTodos = () => setTodos([]);

  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'active') return !todo.completed;
    return true;
  });

  const completedCount = todos.filter(t => t.completed).length;
  const activeCount = todos.length - completedCount;

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
      <TodoInput onAdd={addTodo} />
      <div className="flex gap-2 mb-4">
        <button onClick={() => setFilter('all')} className={`px-2 py-1 border rounded ${filter === 'all' ? 'bg-blue-100' : ''}`}>All</button>
        <button onClick={() => setFilter('active')} className={`px-2 py-1 border rounded ${filter === 'active' ? 'bg-blue-100' : ''}`}>Active</button>
        <button onClick={() => setFilter('completed')} className={`px-2 py-1 border rounded ${filter === 'completed' ? 'bg-blue-100' : ''}`}>Completed</button>
      </div>
      <TodoList todos={filteredTodos} onToggle={toggleComplete} onDelete={deleteTodo} />
      <div className="mt-4 text-sm text-gray-600">
        <p>Active: {activeCount} | Completed: {completedCount}</p>
        <button onClick={clearTodos} className="mt-2 text-red-500 hover:underline">Clear All</button>
      </div>
    </div>
  );
}

export default App;
