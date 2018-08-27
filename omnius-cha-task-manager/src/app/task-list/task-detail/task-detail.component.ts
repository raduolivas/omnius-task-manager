import { Component, OnInit } from '@angular/core';
import { TaskService } from '../shared/task.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/internal/operators';
import { Task } from '../shared/task.model';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  public form: FormGroup;
  public task: Task;
  public taskDoneOptions: Array<any>;
  private id: string;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private location: Location,
    private formBuilder: FormBuilder
  ) {
    this.taskDoneOptions = [
      {value: false, text: 'Pending'},
      {value: true, text: 'Done'}
    ];

    this.route.params.subscribe( params => this.id = params.id );

  }

  ngOnInit() {

    this.form = this.formBuilder.group({
      uuid: [null],
      priority: [null, Validators.required],
      status: [null, Validators.required],
      createdat: [null],
      updatedat: [null],
      resolvedat: [null],
      postponedat: [null],
      postponedtime: [null],
      title: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      description: [null]
    });

    this.taskService.getTaskById(this.id)
      .subscribe(
        (t: Task) => {
          this.setTask(t);
        }
      );
  }

  public setTask(task: Task): void {
    this.task = task;
    this.form.patchValue(task);
  }

  public goBack() {
    this.location.back();
  }

  public updateTask() {
    this.task.title = this.form.get('title').value;
    this.task.priority = this.form.get('priority').value;
    this.task.status = this.form.get('status').value;
    this.task.description = this.form.get('description').value;


    this.taskService.updateTask(this.task)
      .subscribe(
        () => alert('Task updated successfully!'),
        () => alert('Something wrong in the Server try again later.')
      );
  }
}
