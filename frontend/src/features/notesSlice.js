import { createSlice } from '@reduxjs/toolkit';

const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    notes: [],
    editedNote:localStorage.getItem("editedNote")
    ? JSON.parse(localStorage.getItem("editedNote"))
    : null,
    loading: false,
    error: null
  },
  reducers: {
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    addNote: (state, action) => {
      state.notes.push(action.payload);
    },
    updateNote: (state, action) => {
      const index = state.notes.findIndex(note => note.id === action.payload.id);
      if (index !== -1) {
        state.notes[index] = action.payload;
      }
      localStorage.removeItem('editedNote')
    },
    deleteNote: (state, action) => {
      state.notes = state.notes.filter(note => note.id !== action.payload);
    },
    setEditedNote:(state,action)=>{
      localStorage.setItem('editedNote',JSON.stringify(action.payload))
      state.editedNote=action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { setNotes, addNote, updateNote, deleteNote,setEditedNote, setLoading, setError } = notesSlice.actions;
export default notesSlice.reducer;
