import { useState } from 'react';
import type { FormEvent } from 'react'; 
import '../../app/app.css'


type Props = {
  onAdd: (text: string) => void;
};

function TodoInput({ onAdd }: Props) {
  const [text, setText] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (text.trim() !== '') {
      onAdd(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
      <input
        type="text"
        className="border p-2 flex-1"
        placeholder="Add a task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="bg-blue-500 hover:bg-blue-900 text-white px-4 py-2 rounded">Add</button>
    </form>
  );
}

export default TodoInput;
    
