import { Router } from "express";
import NotesControllers from "../controllers/index.js";

const routerNotes = new Router();

routerNotes.get('/notes', NotesControllers.getNotes);
routerNotes.post('/notes', NotesControllers.createNote);
routerNotes.put('/notes/:id', NotesControllers.updateNote);
routerNotes.delete('/notes/:id', NotesControllers.deleteNote);

export default routerNotes;