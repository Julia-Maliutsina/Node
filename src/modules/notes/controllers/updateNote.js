import { validateUpdateNote } from "../../../validation/putNote.js";
import Notes from "./dbModel.js";

const ERROR_STATUS = 400;

let date = new Date();
const dateIso = date.toISOString();

const UpdateNoteController = (request, response, next) => {
	const PUT_NOTE = {
		id: request.params.id,
		title: request.body.title,
		content: request.body.content,
		updatedAt: dateIso,
	};
	const { error } = validateUpdateNote(PUT_NOTE);
	if (error) {
		const err = new Error(error.details[0].message);
		err.status = ERROR_STATUS;
		next(err);
	} else {
		Notes.updateOne(
			{ _id: PUT_NOTE.id },
			{
				content: PUT_NOTE.content,
				title: PUT_NOTE.title,
				updatedAt: dateIso,
			}
		)
			.then((result) => {
				response.send(PUT_NOTE);
			})
			.catch((error) => {
				next(new Error(error));
			});
	}
};

export default UpdateNoteController;
