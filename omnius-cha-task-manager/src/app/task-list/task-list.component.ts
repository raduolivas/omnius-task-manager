import { Component, OnInit } from '@angular/core';

import { Task } from './shared/task.model';
import { TaskService } from './shared/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  public tasks: Array<Task> = [];

  public constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.taskService.getAll()
      .subscribe(
        tasks => this.tasks = tasks,
      error => console.log('Something went wrong')
      );
  }

  public resolveTask(task: Task) {
    this.taskService.resolveTask(task.uuid)
      .subscribe(msg => alert('Task was successfully resolved'));
  }

}
