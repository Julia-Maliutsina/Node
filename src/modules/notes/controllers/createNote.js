import {validateNewNote} from '../../../validation/postNote.js';
import mongoose from 'mongoose';
import Notes from './dbModel.js';

const ERROR_STATUS = 400;

const CreateNoteController = (request, response) => {
  const {error} = validateNewNote(request.body);
  if (error) {
    return response.status(ERROR_STATUS).json(error.details[0].message);
  };
  Notes.create(request.body)
  .then((note)=>{response.send(note)})
};

export default CreateNoteController;