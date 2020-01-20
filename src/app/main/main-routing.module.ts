import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ToDoListsComponent } from './to-do-lists/to-do-lists.component';
import { ToDoItemsComponent } from './to-do-items/to-do-items.component';


const routes: Routes = [
  {path: '', component: ToDoListsComponent},
  {path: 'toDoLists', component: ToDoListsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
