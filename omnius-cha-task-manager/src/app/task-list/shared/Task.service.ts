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
    return this.httpClient.get<Task[]>(url).pipe(
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
    const url = `${this.tasksUrl}${task.uuid}`;
    const body = JSON.stringify(task);

    return this.httpClient.post(url, task).pipe(
      catchError(this.handleErrors),
      map((task) => this.responseToTask(task))
    );
  }

  public postponeTask(id: string, time: number): Observable<Task> {
    const url = `${this.tasksUrl}${id}/postpone`;

    return this.httpClient.post(url, time).pipe(
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
    const tasks: Task[] = [];

    response.forEach(item => {
      const task = new Task(
        item.uuid,
        item.title,
        item.description,
        item.priority,
        item.status,
        item.createdat,
        item.updatedat,
        item.resolvedat,
        item.postponedat,
        item.postponedtime,
        item.duedate
      );

      tasks.push(task);
    });

    return tasks;
  }

  private responseToTask(response: any): Task {
    return new Task(
      response.uuid,
      response.title,
      response.description,
      response.priority,
      response.status,
      response.createdat,
      response.updatedat,
      response.resolvedat,
      response.postponedat,
      response.postponedtime,
      response.duedate
    );
  }
}
