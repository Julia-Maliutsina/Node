import GetNotesController from "./getNotes.js"
import CreateNoteController from "./createNote.js"
import UpdateNoteController from "./updateNote.js"
import DeleteNoteController from "./deleteNote.js"

const NotesControllers = {
  getNotes: GetNotesController,
  createNote: CreateNoteController,
  updateNote: UpdateNoteController,
  deleteNote: DeleteNoteController,
}

export default NotesControllers