import express from 'express'
import routerGreetings from './src/modules/greetings/routes/index.js';
import routerNotes from './src/modules/notes/routes/index.js';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.use('/api', routerGreetings);
app.use('/api', routerNotes);

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT} ...`)
});