import mongoose from "mongoose";
import Notes from "./dbModel.js";

const NOTES_MAX = 10;

const GetNotesController = (request, response, next) => {
	const { title, date, page = 1 } = request.query;
	if (title && date) {
		Notes.find({ title: title, createdAt: date })
			.limit(NOTES_MAX)
			.skip((page - 1) * NOTES_MAX)
			.then((notesArray) => {
				response.send(notesArray);
			})
			.catch((error) => {
				next(new Error(error));
			});
		return;
	}
	if (title) {
		Notes.find({ title: title })
			.limit(NOTES_MAX)
			.skip((page - 1) * NOTES_MAX)
			.then((notesArray) => {
				response.send(notesArray);
			})
			.catch((error) => {
				next(new Error(error));
			});
		return;
	}
	if (date) {
		Notes.find({ createdAt: date })
			.limit(NOTES_MAX)
			.skip((page - 1) * NOTES_MAX)
			.then((notesArray) => {
				response.send(notesArray);
			})
			.catch((error) => {
				next(new Error(error));
			});
	} else {
		Notes.find()
			.limit(NOTES_MAX)
			.skip((page - 1) * NOTES_MAX)
			.then((notesArray) => {
				response.send(notesArray);
			})
			.catch((error) => {
				next(new Error(error));
			});
	}
};

export default GetNotesController;
