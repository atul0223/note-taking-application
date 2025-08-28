import Note from "../models/note.model";

const createNote = async (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const newNote = await Note.create({ title, content, userId: req.user.id });
    return res.status(201).json({ message: "Note created successfully", note: newNote });
}

const getNotes = async (req, res) => {
    const notes = await Note.find({ userId: req.user.id });
    return res.status(200).json({ notes });
}


const  deleteNote = async (req, res) => {
    const { id } = req.params;
    const note = await Note.findOne({ _id: id, userId: req.user.id });
    if (!note) {
        return res.status(404).json({ message: "Note not found" });
    }
    await note.deleteOne();
    return res.status(200).json({ message: "Note deleted successfully" });
}

export { createNote, getNotes, deleteNote };