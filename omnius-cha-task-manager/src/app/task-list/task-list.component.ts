import { Component, OnInit } from '@angular/core';
import { Task } from './shared/task.model';
import { TaskService } from './shared/Task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  public tasks: Array<Task>;

  public constructor(private taskService: TaskService) { }

  ngOnInit() {
  }

}
