import Notes from "../models/NoteModel.js";
import addFilters from "../../../utils/filterNotes.js";
import { ERROR_MESSAGES, ERROR_STATUSES } from "../../../constants.js"

const NOTES_MAX = 10;

const GetNotesController = async (request, response, next) => {
	if (!request.user._id) {
		const err = new Error(ERROR_MESSAGES.noToken);
		err.status = ERROR_STATUSES.unauthorized;
	}
	let query = {
		user: request.user._id
	}
	const { title, date, page = 1 } = request.query;
  query = addFilters(title, date, query);
	try {
	const notesArray = await Notes.find(query).limit(NOTES_MAX).skip((page - 1) * NOTES_MAX);
	response.send(notesArray);
	}	catch(error) {
		next(new Error(error));
	};
};

export default GetNotesController;
