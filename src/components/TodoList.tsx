import TodoItem from './TodoItem';
import type { Todo } from '../App';
import '../../app/app.css'  

type Props = {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

function TodoList({ todos, onToggle, onDelete }: Props) {
  if (todos.length === 0) return <p className="text-gray-500">No tasks yet.</p>;

  return (
    <ul>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default TodoList;
