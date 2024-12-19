import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNotes } from '../features/notesSlice';
import { getNotes as getNotesAPI } from '../utils/api';
import NoteItem from '../components/NoteItem';
import NoteForm from '../components/NoteForm';

const Notes = () => {
  const dispatch = useDispatch();
  const { notes } = useSelector((state) => state.notes);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await getNotesAPI(token);
      dispatch(setNotes(response.data));
      } catch (error) {
        console.log(error)
      }
    };
    fetchNotes();
  }, [dispatch, token,notes]);

  return (
    <div className="container mx-auto p-4">
      <NoteForm />
      <div>
        {notes.map((note) => (
          <NoteItem key={note._id} note={note} />
        ))}
      </div>
    </div>
  );
};

export default Notes;
