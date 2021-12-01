import express from 'express'

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());

app.get('/api/greetings', (request, response) => {
  const name = request.body.name;
  name ?
  response.send(`<p>Hello ${name}!</p>`)
  : response.status(400).json({ error: 'Name undefined' })
})

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT} ...`)
});