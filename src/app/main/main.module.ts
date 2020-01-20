import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { ToDoListsComponent } from './to-do-lists/to-do-lists.component';
import { ToDoItemsComponent } from './to-do-items/to-do-items.component';


@NgModule({
  declarations: [
    ToDoListsComponent,
    ToDoItemsComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule { }
