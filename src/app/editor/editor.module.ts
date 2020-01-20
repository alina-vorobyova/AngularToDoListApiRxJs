import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditorRoutingModule } from './editor-routing.module';
import { AddToDoListComponent } from './add-to-do-list/add-to-do-list.component';
import { AddToDoItemsComponent } from './add-to-do-items/add-to-do-items.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddToDoListComponent,
    AddToDoItemsComponent
  ],
  imports: [
    CommonModule,
    EditorRoutingModule,
    ReactiveFormsModule
  ]
})
export class EditorModule { }
