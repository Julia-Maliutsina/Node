import {validateNewNote} from '../../../validation/postNote.js';

const ERROR_STATUS = 400;

const CreateNoteController = (request, response) => {
  const {error} = validateNewNote(request.body);
  if (error) {
    return response.status(ERROR_STATUS).json(error.details[0].message);
  };
  response.send(request.body);
};

export default CreateNoteController;