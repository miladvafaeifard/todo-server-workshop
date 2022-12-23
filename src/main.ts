import express from 'express';
import { errorHandler } from './helpers/error-handler';
import { Task } from './models/todo.model';

const port = process.env.PORT || 8000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);

// get all tasks
app.get('/tasks', (request, response) => {});

// get a task by id
app.get('/tasks/:id', (request, response) => {});

// create a task
app.post('/tasks', (request, response) => {});

// update a task by id
app.put('/tasks/:id', (request, response) => {});

app.listen(port, () => {
  console.log(`the server is listening at port: ${port}`);
});
