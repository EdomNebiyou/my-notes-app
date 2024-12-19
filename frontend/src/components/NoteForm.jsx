import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNote } from '../features/notesSlice';
import { createNote as createNoteAPI } from '../utils/api';

const NoteForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const noteData = { title, content };
    const response = await createNoteAPI(noteData, localStorage.getItem('token'));
    dispatch(addNote(response.data));
    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full p-2 border border-gray-300 rounded-md mb-4"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        className="w-full p-2 border border-gray-300 rounded-md mb-4"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700"
      >
        Add Note
      </button>
    </form>
  );
};

export default NoteForm;
