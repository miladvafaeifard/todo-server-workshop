import express from 'express';
import { errorHandler } from './helpers/error-handler';
import { Task } from './models/todo.model';
import { randomUUID } from 'crypto';


const port = process.env.PORT || 8000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);

let mockTasksData: Task[] = [
  {
    id: '1',
    description: 'buy a car',
    isCompleted: false,
  },
  {
    id: '2',
    description: 'Do homework',
    isCompleted: true,
  },
];

// get all tasks
app.get('/tasks', (request, response) => {
  response.send(mockTasksData);
  response.end();
});

// get a task by id
app.get('/tasks/:id', (request, response) => {
  const foundTask = mockTasksData.find(task => task.id === request.params.id);
  if(foundTask){
    response.send(foundTask);  
  }

  response.end();
});

// create a task
app.post<Task>('/tasks', (request, response) => {
  const newTask = {
    id: randomUUID(), 
    description: request.body.description as string,
    isCompleted: false
  };
  mockTasksData.push(newTask);
  response.send(newTask);
});

// update a task by id
app.put('/tasks/:id', (request, response) => {
  const foundTask = mockTasksData.find(task => task.id === request.params.id);
  if(foundTask) {
    mockTasksData = mockTasksData.map(task => {
      if (task.id === foundTask.id) {
        return {
          ...task,
          description: request.body.description,
          isCompleted: request.body.isCompleted 
        }
      }
      return task;
    });
    response.sendStatus(200);  
  }

  response.end();
});

app.listen(port, () => {
  console.log(`the server is listening at port: ${port}`);
});
