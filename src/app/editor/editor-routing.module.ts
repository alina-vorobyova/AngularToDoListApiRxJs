import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddToDoListComponent } from './add-to-do-list/add-to-do-list.component';
import { AddToDoItemsComponent } from './add-to-do-items/add-to-do-items.component';


const routes: Routes = [
  {path: "addToDoList" , component: AddToDoListComponent},
  {path: "editToDoList/:listid" , component: AddToDoListComponent},
  {path: "addToDoItems/:listid" , component: AddToDoItemsComponent},
  {path: "editToDoItem/:listid/:itemid" , component: AddToDoItemsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditorRoutingModule { }
