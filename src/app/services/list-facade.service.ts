import { Injectable } from '@angular/core';
import { ListStorageService } from './list-storage.service';
import { ToDoListService } from './to-do-list.service';
import { delay, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ToDoList } from '../models/to-do-list';

@Injectable({
  providedIn: 'root'
})
export class ListFacadeService {

  constructor(
    private listStorageService: ListStorageService,
    private listApiService: ToDoListService,
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

  removeList(id: number) {
    return this.listApiService.deleteToDoList(id).pipe(
      tap(() => this.listStorageService.removeList(id)));
  }
}
