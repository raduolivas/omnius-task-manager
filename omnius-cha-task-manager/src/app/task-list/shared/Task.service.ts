import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { Injectable } from "@angular/core";
import { Task } from './task.model';
import { catchError, map } from 'rxjs/internal/operators';

@Injectable()
export class TaskService {
  public tasksUrl = 'http://localhost:8080/task/';

  public constructor(private httpClient: HttpClient) {}

  public getAll(params: HttpParams): Observable<Task[]> {
    const url = `${this.tasksUrl}/list`;
    return this.httpClient.get<Task[]>(url).pipe(
      catchError(this.handleErrors),
      map((response: Response) => this.responseToTasks(response))
    );
  }

  public getTaskById( id: number ): Observable<Task> {
    let url = `${this.tasksUrl}/${id}`;

    return this.httpClient.get<Task>(url).pipe(
      catchError(this.handleErrors),
      map((response: Response) => this.responseToTask(response))
    );
  }

  public updateTask(task: Task): Observable<Boolean> {
    let url = `${this.tasksUrl}/${task.uuid}`;
    let body = JSON.stringify(task);

    return this.httpClient.post(url, body).pipe(
      catchError(this.handleErrors),
      map((response: Response) => this.responseToTask(response))
    );
  }

  public postponeTask(id: number): Observable<Boolean> {
    let url = `${this.tasksUrl}/${id}/postpone`;

    return this.httpClient.post(url).pipe(
      catchError(this.handleErrors),
      map((response: Response) => this.responseToTask(response))
    );
  }

  public resolveTask(ind: number): Observable<Task> {
    let url = `${this.tasksUrl}/resolve/${id}`;
    return this.httpClient.post(url).pipe(
      catchError(this.handleErrors),
      map((response: Response) => this.responseToTask(response))
    );
  }

  private responseToTasks(response: Response): Task[] {
    const collection = response.json().data as Array<any>;
    const tasks: Task[] = [];

    collection.forEach(item => {
      const task = new Task(
        item.id,
        item.attributes.title,
        item.attributes.description,
        item.attributes.done
      );

      tasks.push(task);
    });

    return tasks;
  }

  private responseToTask(response: Response): Task {
    return new Task(
      response.json().data.id,
      response.json().data.attributes.title,
      response.json().data.attributes.description,
      response.json().data.attributes.done
    );
  }
}
