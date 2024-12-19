import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateNote } from '../features/notesSlice';
import { updateNote as updateNoteAPI } from '../utils/api';
import { useNavigate } from 'react-router-dom';
export default function NoteUpdate(){
    const dispatch = useDispatch();
    const navigate=useNavigate()
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const {editedNote}=useSelector(state=>state.notes)
  console.log(editedNote)
  useEffect(()=>{
    setTitle(editedNote.title)
    setContent(editedNote.content)
  },[])
  const handleSubmit = async (e) => {
    e.preventDefault();
    const noteData = { title, content };
    const response = await updateNoteAPI(editedNote._id,noteData, localStorage.getItem('token'));
    dispatch(updateNote(response.data));
    navigate("/notes")
  };
    return(
        <>
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
        update Note
      </button>
    </form>
        </>
    )
}
