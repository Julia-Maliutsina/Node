import mongoose from "mongoose";
import Notes from "../models/NoteModel.js";
import addFilters from "../../../utils/filterNotes.js";

const NOTES_MAX = 10;

const GetNotesController = (request, response, next) => {
	if (!request.user._id) {
		const err = new Error("Unauthorized");
		err.status = 403;
	}
	let query = {
		user: request.user._id
	}
	const { title, date, page = 1 } = request.query;
  query = addFilters(title, date, query);
	Notes.find(query)
	.limit(NOTES_MAX)
	.skip((page - 1) * NOTES_MAX)
	.then((notesArray) => {
		response.send(notesArray);
	})
	.catch((error) => {
		next(new Error(error));
	});
};

export default GetNotesController;
