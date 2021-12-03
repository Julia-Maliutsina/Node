import express from 'express'

import {validateNewNote} from './validation/postNote.js';
import {validateUpdateNote} from './validation/putNote.js';

const app = express();
const PORT = process.env.PORT ?? 3000;
const ERROR_STATUS = 400;

app.use(express.json());

app.get('/api/greetings', (request, response) => {
  const { name } = request.query;
  if (name) {
    response.send(`<p>Hello ${name}!</p>`)
  } else {
    response.status(ERROR_STATUS).json({ error: 'Name undefined' })
  }
})

app.route('/api/notes')
.get((request, response) => {
  response.send([]);
})
.post((request, response) => {
  const {error} = validateNewNote(request.body);
  if (error) {
    return response.status(ERROR_STATUS).json(error.details[0].message);
  };
  response.send(request.body);
})

app.route('/api/notes/:id')
.put((request, response) => {
  const noteId = request.params.id;
  const putNoteResponse = {
    id: noteId,
    title: request.body.title,
    content: request.body.content,
    createdAt: request.body.content,
    updatedAt: request.body.updatedAt,    
  };
  const {error} = validateUpdateNote(putNoteResponse);
  if (error) {
    return response.status(ERROR_STATUS).json(error.details[0].message);
  };
  response.send(putNoteResponse);
})
.delete((request, response) => {
  const noteId = request.params.id;
  const deleteNoteResponse = {
    success: true, 
    id: noteId,   
  };
  response.send(deleteNoteResponse);
}) 

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT} ...`)
});