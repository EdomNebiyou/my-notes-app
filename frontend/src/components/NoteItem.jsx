import { useDispatch } from 'react-redux';
import { deleteNote, setEditedNote } from '../features/notesSlice';
import { deleteNote as deleteNoteAPI } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const NoteItem = ({ note }) => {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const handleDelete = async () => {
    await deleteNoteAPI(note._id, localStorage.getItem('token'));
    dispatch(deleteNote(note._id));
  };
  function handleNavigateToUpdate(note){
    dispatch(setEditedNote(note))
    navigate('update')
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h3 className="font-semibold text-xl">{note.title}</h3>
      <p className="text-gray-700">{note.content}</p>
      <div className='flex gap-4'>
        <button
          onClick={handleDelete}
          className="mt-2 text-red-500 hover:text-red-700"
        >
          Delete
        </button>
        <button
          className="mt-2 text-yellow-500 hover:text-yellow-700"
          onClick={()=>handleNavigateToUpdate(note)}
        >
          update
        </button>
      </div>
    </div>
  );
};

export default NoteItem;
