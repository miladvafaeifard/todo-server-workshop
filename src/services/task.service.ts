import { Task } from '../models/todo.model';
import { randomUUID } from 'crypto';

export class TaskService {
  private mockTasksData: Task[] = [];
  constructor() {
    this.mockTasksData = [
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
  }

  getAll(): Task[] {
    return this.mockTasksData;
  }

  getById(id: string): Task | undefined {
    const foundTask = this.mockTasksData.find((task) => task.id === id);
    if (foundTask) {
      return foundTask;
    }

    return;
  }

  create(description: string): Task {
    const newTask = {
      id: randomUUID(),
      description,
      isCompleted: false,
    };
    this.mockTasksData.push(newTask);
    return newTask;
  }

  update(task: Task): 'OK' | 'Not OK' {
    const foundTask = this.mockTasksData.find((t) => t.id === task.id);
    if (foundTask) {
      this.mockTasksData = this.mockTasksData.map((t) => {
        if (t.id === foundTask.id) {
          return {
            ...t,
            description: task.description,
            isCompleted: task.isCompleted,
          };
        }
        return t;
      });
      return 'OK';
    }

    return 'Not OK';
  }
}
