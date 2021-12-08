import { validateUpdateNote } from "../../../validation/putNote.js";
import Notes from "../models/NoteModel.js";
import { ERROR_MESSAGES, ERROR_STATUSES } from "../../../constants.js"

let date = new Date();
const dateIso = date.toISOString();

const UpdateNoteController = async (request, response, next) => {
	if (!request.user._id) {
		const err = new Error(ERROR_MESSAGES.noToken);
		err.status = ERROR_STATUSES.unauthorized;
	}
	const user = request.user._id;
	const putNote = {
		id: request.params.id,
		title: request.body.title,
		content: request.body.content,
		updatedAt: dateIso
	};
	const {error} = validateUpdateNote(putNote);
	if (error) {
		const err = new Error(error.details[0].message);
		err.status = ERROR_STATUSES.badRequest;
		next(err);
	} else {
		try {
		  const result = await Notes.updateOne({ _id: putNote.id, user: user }, {content: putNote.content,title: putNote.title, updatedAt: dateIso });
			if (result.matchedCount) {
			  response.send(putNote);
			} else {
				const err = new Error(ERROR_MESSAGES.noMatchNotes);
				err.status = ERROR_STATUSES.badRequest;
				next(err);
			}
		}	catch(error) {
			next(new Error(error));
		};
	}
};

export default UpdateNoteController;
