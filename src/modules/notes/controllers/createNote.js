import { validateNewNote } from "../../../validation/postNote.js";
import Notes from "../models/NoteModel.js";

const ERROR_STATUS = 400;
let date = new Date();
const dateIso = date.toISOString();

const CreateNoteController = (request, response, next) => {
	if (!request.user._id) {
		const err = new Error("Unauthorized");
		err.status = 403;
		next(err)
	}
	const {error} = validateNewNote(request.body);
	if (error) {
		const err = new Error(error.details[0].message);
		err.status = ERROR_STATUS;
		next(err);
	} 
	else {
		Notes.create({content: request.body.content, title: request.body.title,	createdAt: dateIso, user: request.user._id})
		.then((note) => {
			response.send(note);
		})
		.catch((error) => {
			next(new Error(error));
		});
	}
};

export default CreateNoteController;
