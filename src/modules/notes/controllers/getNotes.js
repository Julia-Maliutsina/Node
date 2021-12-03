import mongoose from 'mongoose';
import Notes from './dbModel.js';

const GetNotesController = (request, response) => {
  Notes.find()
  .then((notesArray) => response.send(notesArray))
}

export default GetNotesController;