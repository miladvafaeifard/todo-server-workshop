import express from 'express';
import { errorHandler } from './helpers/error-handler';
import { Task } from './models/todo.model';
import { randomUUID } from 'crypto';
import { TaskService } from './services/task.service';


const port = process.env.PORT || 8000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);

const taskService = new TaskService();

// get all tasks
app.get('/tasks', (request, response) => {
  response.send(taskService.getAll());
  response.end();
});

// get a task by id
app.get('/tasks/:id', (request, response) => {
  const foundTask = taskService.getById(request.params.id);
  if(foundTask){
    response.send(foundTask);  
  }

  response.end();
});

// create a task
app.post<Task>('/tasks', (request, response) => {
  const newTask = taskService.create(request.body.description);
  response.send(newTask);
});

// update a task by id
app.put('/tasks/:id', (request, response) => {
  const updatedTask = taskService.update({ 
    id: request.params.id,
    description: request.body.description,
    isCompleted: request.body.isCompleted
  });
  updatedTask === 'OK' ?
  response.sendStatus(200)
  : response.sendStatus(404);

  response.end();
});

app.listen(port, () => {
  console.log(`the server is listening at port: ${port}`);
});
