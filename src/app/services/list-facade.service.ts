import { Injectable } from '@angular/core';
import { ListStorageService } from './list-storage.service';
import { ToDoListService } from './to-do-list.service';
import { delay, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ToDoList } from '../models/to-do-list';
import { ToDoItemService } from './to-do-item.service';
import { ToDoItem } from '../models/to-do-item';

@Injectable({
  providedIn: 'root'
})
export class ListFacadeService {

  constructor(
    private listStorageService: ListStorageService,
    private listApiService: ToDoListService,
    private toDoItemApiService: ToDoItemService
  ) {
    this.loadAllList();
  }

  get list$() {
    return this.listStorageService.lists$;
  }


  private loadAllList() {
    this.listApiService.getAllToDoLists()
      .pipe()
      .subscribe(data => this.listStorageService.set(data));
  }

  createList(todolist: ToDoList) {
    return this.listApiService.createToDoList(todolist).pipe(
      tap(data => this.listStorageService.createList(data)));
  }


  createToDoItem(listId: number, todoitem: ToDoItem) {
      return this.toDoItemApiService.createToDoItem(todoitem).pipe(
        tap(data => this.listStorageService.createItem(listId, data)));
  }


  removeList(id: number) {
    return this.listApiService.deleteToDoList(id).pipe(
      tap(() => this.listStorageService.removeList(id)));
  }

  removeToDoItem(listId: number, itemId: number) {
      return this.toDoItemApiService.deleteToDoItem(itemId).pipe(
        tap(() => this.listStorageService.removeToDoItem(listId, itemId)));
  } 


  replaceList(id: number, todolist: ToDoList) {
    return this.listApiService.replaceToDoList(id, todolist).pipe(
        tap(data => this.listStorageService.replaceList(data.id, data))
    );
  }


  replaceToDoItem(listId: number, itemId: number, todoitem: ToDoItem) {
    return  this.toDoItemApiService.replaceToDoItem(itemId, todoitem).pipe(
      tap(data => this.listStorageService.replaceToDoItem(listId, itemId,todoitem))
    );
  }

  getListById(id: number) {
      return this.listApiService.getListById(id);
  }

  getToDoItemById(id: number) {
    return this.toDoItemApiService.getToDoItemById(id);
  }


}

