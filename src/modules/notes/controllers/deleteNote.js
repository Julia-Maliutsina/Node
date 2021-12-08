import Notes from "../models/NoteModel.js";
import { ERROR_MESSAGES, ERROR_STATUSES } from "../../../constants.js"

const DeleteNoteController = async (request, response, next) => {
	if (!request.user._id) {
		const err = new Error(ERROR_MESSAGES.noToken);
		err.status = ERROR_STATUSES.unauthorized;
		next(err)
	}
	const noteId = request.params.id;
  const user = request.user._id;
	try {
	  const result = await Notes.deleteOne({ _id: noteId, user: user});
		if (result.deletedCount) {
			const deletedNote = {
				success: true,
				id: noteId,
			};
			response.send(deletedNote);
		}	else {
			const err = new Error(ERROR_MESSAGES.noMatchNotes);
			err.status = ERROR_STATUSES.badRequest;
			next(err);
		}
  }	catch(error) {
		next(new Error(error));
	};
};

export default DeleteNoteController;
