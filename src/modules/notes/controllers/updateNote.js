import {validateUpdateNote} from '../../../validation/putNote.js';
import Notes from './dbModel.js';

const ERROR_STATUS = 400;

let date = new Date();
const dateIso = date.toISOString();

const UpdateNoteController = (request, response) => {
  const noteId = request.params.id;
  const putNote = {
    id: noteId,
    title: request.body.title,
    content: request.body.content   
  };
  const {error} = validateUpdateNote(putNote);
  if (error) {
    return response.status(ERROR_STATUS).json(error.details[0].message);
  };
  Notes.updateOne({ _id: putNote.id }, { content: putNote.content, title: putNote.title, updatedAt: dateIso })
  .then(result => {
    response.send(putNote);
  })
};

export default UpdateNoteController;