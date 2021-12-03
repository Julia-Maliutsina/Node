import {validateUpdateNote} from '../../../validation/putNote.js';

const ERROR_STATUS = 400;

const UpdateNoteController = (request, response) => {
  const noteId = request.params.id;
  const putNoteResponse = {
    id: noteId,
    title: request.body.title,
    content: request.body.content,
    createdAt: request.body.createdAt,
    updatedAt: request.body.updatedAt,    
  };
  const {error} = validateUpdateNote(putNoteResponse);
  if (error) {
    return response.status(ERROR_STATUS).json(error.details[0].message);
  };
  response.send(putNoteResponse);
};

export default UpdateNoteController;