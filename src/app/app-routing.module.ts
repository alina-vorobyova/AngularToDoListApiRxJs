import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { ToDoListsComponent } from './components/to-do-lists/to-do-lists.component';
import { ToDoItemsComponent } from './main/to-do-items/to-do-items.component';
import { AddToDoListComponent } from './editor/add-to-do-list/add-to-do-list.component';
import { AddToDoItemsComponent } from './editor/add-to-do-items/add-to-do-items.component';
import { ErrorComponent } from './components/error/error.component';


const routes: Routes = [
  {path: "", redirectTo: "toDoLists", pathMatch: "full"},
  { 
    path: 'toDoLists',
    loadChildren: () => import('./main/main.module').then(m => m.MainModule)
  },
  { 
    path: 'toDoItems',
    loadChildren: () => import('./main/main.module').then(m => m.MainModule)
  },
  { 
    path: 'editor',
    loadChildren: () => import('./editor/editor.module').then(m => m.EditorModule)
  },
  {path: "**", component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
