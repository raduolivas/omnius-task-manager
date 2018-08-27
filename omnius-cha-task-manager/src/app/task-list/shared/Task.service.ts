import { HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, throwError  } from 'rxjs';
import { Injectable } from '@angular/core';
import { Task } from './task.model';
import { catchError, map } from 'rxjs/internal/operators';

@Injectable()
export class TaskService {
  public tasksUrl = 'http://localhost:8080/task/';
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  public constructor(private httpClient: HttpClient) {}

  public getAll(): Observable<Task[]> {
    const url = `${this.tasksUrl}list`;
    return this.httpClient.get<Task[]>(url, this.httpOptions).pipe(
      catchError(this.handleErrors),
      map((tasks) => this.responseToTasks(tasks))
    );
  }

  public getTaskById( id: string ): Observable<Task> {
    const url = `${this.tasksUrl}${id}`;

    return this.httpClient.get<Task>(url).pipe(
      catchError(this.handleErrors),
      map((task) => this.responseToTask(task))
    );
  }

  public updateTask(task: Task): Observable<Task> {
    const url = `${this.tasksUrl}/${task.uuid}`;
    const body = JSON.stringify(task);

    return this.httpClient.post(url, body).pipe(
      catchError(this.handleErrors),
      map((task) => this.responseToTask(task))
    );
  }

  public postponeTask(id: number): Observable<Task> {
    const url = `${this.tasksUrl}/${id}/postpone`;

    return this.httpClient.patch(url, {}).pipe(
      catchError(this.handleErrors),
      map((task) => this.responseToTask(task))
    );
  }

  public resolveTask(id: string) {
    const url = `${this.tasksUrl}${id}/resolve`;
    return this.httpClient.post(url, {});
  }

  private handleErrors(error: Response) {
    console.log('SOMETHING WENT WRONG => ', error);
    return throwError(error);
  }


  private responseToTasks(response: any): Task[] {
    const collection = response.json().results;
    const tasks: Task[] = [];

    collection.forEach(item => {
      const task = new Task(
        item.uuid,
        item.createdat,
        item.updatedat,
        item.resolvedat,
        item.postponedat,
        item.postponedtime,
        item.title,
        item.description,
        item.priority,
        item.status
      );

      tasks.push(task);
    });

    return tasks;
  }

  private responseToTask(response: any): Task {
    return new Task(
      response.json().data.uuid,
      response.json().data.createdat,
      response.json().data.updatedat,
      response.json().data.resolvedat,
      response.json().data.postponedat,
      response.json().data.postponedtime,
      response.json().data.title,
      response.json().data.description,
      response.json().data.priority,
      response.json().data.status
    );
  }
}
