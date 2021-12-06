import { validateNewNote } from "../../../validation/postNote.js";
import mongoose from "mongoose";
import Notes from "./dbModel.js";

const ERROR_STATUS = 400;
let date = new Date();
const dateIso = date.toISOString();

const CreateNoteController = (request, response, next) => {
	const { error } = validateNewNote(request.body);
	if (error) {
		const err = new Error(error.details[0].message);
		err.status = ERROR_STATUS;
		next(err);
	}
	Notes.create({
		content: request.body.content,
		title: request.body.title,
		createdAt: dateIso,
	})
		.then((note) => {
			response.send(note);
		})
		.catch((error) => {
			next(new Error(error));
		});
};

export default CreateNoteController;
