import { validateNewNote } from "../../../validation/postNote.js";
import Notes from "../models/NoteModel.js";
import { ERROR_MESSAGES, ERROR_STATUSES } from "../../../constants.js"

let date = new Date();
const dateIso = date.toISOString();

const CreateNoteController = async (request, response, next) => {
	if (!request.user._id) {
		const err = new Error(ERROR_MESSAGES.noToken);
		err.status = ERROR_STATUSES.unauthorized;
		next(err)
	}
	const {error} = validateNewNote(request.body);
	if (error) {
		const err = new Error(error.details[0].message);
		err.status = ERROR_STATUSES.badRequest;
		next(err);
	} else {
		try {
		let title = request.body.title; 
		if (process.env.NOTE_POSTFIX) {
      title = title + ' ' + process.env.NOTE_POSTFIX;
		}
		const note = await Notes.create({content: request.body.content, title: title,	createdAt: dateIso, user: request.user._id});
		response.send(note);
		}	catch(error) {
			next(new Error(error));
		};
	}
};

export default CreateNoteController;
