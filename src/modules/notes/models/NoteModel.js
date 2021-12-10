import mongoose from "mongoose";
import Schema from 'mongoose';

let date = new Date();
const dateIso = date.toISOString();

const NoteSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: dateIso,
		required: true,
	},
	user: {
		ref: 'users',
		type: Schema.Types.ObjectId
	}
});

const Notes = mongoose.model("notes", NoteSchema);

export default Notes;
