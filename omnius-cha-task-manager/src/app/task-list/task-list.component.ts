import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs/index';

import { Task } from './shared/task.model';
import { TaskService } from './shared/task.service';
import { OrderPipe } from 'ngx-order-pipe';





@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  public tasks: Array<Task> = [];
  public p = 1;

  public constructor(private taskService: TaskService, private orderPipe: OrderPipe) {

  }

  ngOnInit() {
    this.getAllTasks();
    // const refresh = timer(10000, 10000);
    // refresh.subscribe(r => {this.getAllTasks(); } );
  }

  getAllTasks() {
    this.taskService.getAll()
      .subscribe(
        tasks => this.tasks = this.orderPipe.transform(tasks, ['duedate', 'priority'], false, true ),
        error => console.log('Something went wrong'),
      );
  }

  resolveTask(task: Task) {
    this.taskService.resolveTask(task.uuid)
      .subscribe(
        data => {
          console.log(data);
          this.getAllTasks();
          },
        msg => {
          alert('Task was successfully resolved');
        },
      );
  }

  postponeTaskTask(task: Task, event) {
    const time = event.toElement.innerHTML;
    this.taskService.postponeTask(task.uuid, Number(time))
      .subscribe(
        data => {
          this.getAllTasks();
        },
        msg => {
          alert('Task was Postponed ');
        },
      );
  }

}
