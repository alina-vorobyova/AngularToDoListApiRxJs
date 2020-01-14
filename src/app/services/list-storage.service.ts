import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToDoList } from '../models/to-do-list';

@Injectable({
  providedIn: 'root'
})
export class ListStorageService {

  private lists: BehaviorSubject<Array<ToDoList>>

  constructor() {
    this.lists = new BehaviorSubject(null);
  }

  get lists$() {
    return this.lists.asObservable();
  }

  set(lists: Array<ToDoList>) {
    this.lists.next(lists);
  }

  createList(list: ToDoList) {
    this.lists.next([...this.lists.getValue(), list]);
  }

  removeList(id: number) {
    this.lists.next(this.lists.getValue().filter(x => x.id != id));
  }

  replaceList(id: number, list: ToDoList) {
    let listToReplace = this.lists.getValue().find(x => x.id == id);
    try {

      if (listToReplace != null) {
        listToReplace.id = list.id;
        listToReplace.color = list.color;
        listToReplace.title = list.title;
        listToReplace.toDoItems = list.toDoItems;
        this.lists.next([...this.lists.getValue().filter(x => x.id != id), listToReplace]);
      }
    } catch (error) {
      throw new Error("List not found");
    }
  }

  
}
