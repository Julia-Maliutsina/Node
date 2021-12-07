import Notes from "../models/NoteModel.js";

const ERROR_STATUS = 400;
const ERROR_NO_MATCHES = "Note not found";

const DeleteNoteController = (request, response, next) => {
	if (!request.user._id) {
		const err = new Error("Unauthorized");
		err.status = 403;
		next(err)
	}
	const NOTE_ID = request.params.id;
  const USER = request.user._id;
	Notes.deleteOne({ _id: NOTE_ID, user: USER})
	.then((result) => {
		if (result.deletedCount > 0) {
			const deletedNote = {
				success: true,
				id: NOTE_ID,
			};
			response.send(deletedNote);
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
};

export default DeleteNoteController;
