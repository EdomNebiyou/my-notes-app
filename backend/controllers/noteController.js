import Note from '../models/Note.js';

// @desc    Create a Note
// @route   POST /api/notes
// @access  Private
const createNote = async (req, res) => {
  const { title, content } = req.body;
  if(!title || !content){
    return res.status(400).json({msg:"all fields are required"})
  }
  try {
    const newNote = new Note({
      title,
      content,
      user: req.user.id,
    });

    const savedNote = await newNote.save();

    res.status(201).json(savedNote);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({msg:'Server Error'});
  }
};

// @desc    Get all user notes
// @route   GET /api/notes
// @access  Private
const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({msg:'Server Error'});
  }
};

// @desc    Get single note
// @route   GET /api/notes/:id
// @access  Private
const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ msg: 'Note not found' });
    }

    res.json(note);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({msg:'Server Error'});
  }
};

// @desc    Update a note
// @route   PUT /api/notes/:id
// @access  Private
const updateNote = async (req, res) => {

  try {
    let note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ msg: 'Note not found' });
    }

    // Make sure user owns note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorized' });
    }
    note.title = req.body.title || note.title;
    note.content = req.body.content || note.content;

    await note.save();

    res.json(note);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({msg:'Server Error'});
  }
};

// @desc    Delete a note
// @route   DELETE /api/notes/:id
// @access  Private
const deleteNote = async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ msg: 'Note not found' });
    }

    // Make sure user owns note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorized' });
    }

    await note.deleteOne();

    res.json({ msg: 'Note removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({msg:'Server Error'});
  }
};

export { createNote, getNotes, getNoteById, updateNote, deleteNote };