import { Router } from "express";
import passport from "passport";
import NotesControllers from "../controllers/index.js";

const routerNotes = new Router();

routerNotes.get('/notes', passport.authenticate('jwt', {session: false}) ,NotesControllers.getNotes);
routerNotes.post('/notes', passport.authenticate('jwt', {session: false}), NotesControllers.createNote);
routerNotes.put('/notes/:id', passport.authenticate('jwt', {session: false}),NotesControllers.updateNote);
routerNotes.delete('/notes/:id', passport.authenticate('jwt', {session: false}),NotesControllers.deleteNote);

export default routerNotes;