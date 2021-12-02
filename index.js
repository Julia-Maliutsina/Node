import express from 'express'

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());

app.get('/api/greetings', (request, response) => {
  const name = request.query.name;
  name ?
  response.send(`<p>Hello ${name}!</p>`)
  : response.status(400).json({ error: 'Name undefined' })
})

app.route('/api/notes')
.get((request, response) => {
  response.send([2]);
})
.post((request, response) => {
  response.send(request.body);
})

app.route('/api/notes/:id')
.put((request, response) => {
  let noteId = request.params.id;
  let putNoteResponse = {
    id: noteId,
    title: request.body.title,
    content: request.body.content,
    createdAt: request.body.content,
    updatedAt: request.body.updatedAt,    
  };
  response.send(putNoteResponse);
})
.delete((request, response) => {
  let noteId = request.params.id;
  let deleteNoteResponse = {
    success: true, 
    id: noteId,   
  };
  response.send(deleteNoteResponse);
}) 

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT} ...`)
});