import { validateUpdateNote } from "../../../validation/putNote.js";
import Notes from "../models/NoteModel.js";

const ERROR_STATUS = 400;
const ERROR_NO_MATCHES = "Note not found";

let date = new Date();
const dateIso = date.toISOString();

const UpdateNoteController = (request, response, next) => {
	if (!request.user._id) {
		const err = new Error("Unauthorized");
		err.status = 403;
	}
	const USER = request.user._id;
	const PUT_NOTE = {
		id: request.params.id,
		title: request.body.title,
		content: request.body.content,
		updatedAt: dateIso
	};
	const {error} = validateUpdateNote(PUT_NOTE);
	if (error) {
		const err = new Error(error.details[0].message);
		err.status = ERROR_STATUS;
		next(err);
	} 
	else {
		Notes.updateOne({ _id: PUT_NOTE.id, user: USER }, {content: PUT_NOTE.content,title: PUT_NOTE.title, updatedAt: dateIso })
		.then((result) => {
			if (result.matchedCount > 0) {
			  response.send(PUT_NOTE);
			}
      else {
				const err = new Error(ERROR_NO_MATCHES);
				err.status = ERROR_STATUS;
				next(err);
			}
		})
		.catch((error) => {
			next(new Error(error));
		});
	}
};

export default UpdateNoteController;
