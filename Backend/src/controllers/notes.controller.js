"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.getNotes = exports.createNote = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const note_model_1 = __importDefault(require("../models/note.model"));
const createNote = async (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const newNote = await note_model_1.default.create({ title, content, userId: req.user.id });
    return res.status(201).json({ message: "Note created successfully", note: newNote });
};
exports.createNote = createNote;
const getNotes = async (req, res) => {
    try {
        const notes = await note_model_1.default.find({ userId: req.user.id });
        return res.status(200).json({ notes });
    }
    catch (error) {
        console.error("Error fetching notes:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.getNotes = getNotes;
const deleteNote = async (req, res) => {
    let { id } = req.params;
    id = new mongoose_1.default.Types.ObjectId(id);
    const note = await note_model_1.default.findOne({ _id: id, userId: req.user.id });
    if (!note) {
        return res.status(404).json({ message: "Note not found" });
    }
    await note.deleteOne();
    return res.status(200).json({ message: "Note deleted successfully" });
};
exports.deleteNote = deleteNote;
