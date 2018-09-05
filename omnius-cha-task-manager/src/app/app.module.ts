import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

/**third party dependencies**/
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TimeagoModule } from 'ngx-timeago';
import { OrderModule } from 'ngx-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskDetailComponent } from './task-list/task-detail/task-detail.component';
import { AppRoutingModule } from './app-routing-module';
import { TaskService } from './task-list/shared/task.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TaskListComponent,
    TaskDetailComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    TimeagoModule.forRoot(),
    OrderModule,
    NgxPaginationModule
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
