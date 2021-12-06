import Notes from "./dbModel.js";

const DeleteNoteController = (request, response, next) => {
	const noteId = request.params.id;
	Notes.deleteOne({ _id: noteId })
		.then((res) => {
			const deleteNoteResponse = {
				success: true,
				id: noteId,
			};
			response.send(deleteNoteResponse);
		})
		.catch((error) => {
			next(new Error(error));
		});
};

export default DeleteNoteController;
