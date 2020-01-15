import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToDoList } from '../models/to-do-list';
import { ToDoItem } from '../models/to-do-item';

@Injectable({
  providedIn: 'root'
})
export class ListStorageService {

  private lists: BehaviorSubject<Array<ToDoList>>;
  private tasks: BehaviorSubject<Array<ToDoItem>>;

  constructor() {
    this.lists = new BehaviorSubject(null);
    this.tasks = new BehaviorSubject(null);
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

      if (listToReplace != null) {
        listToReplace.id = list.id;
        listToReplace.color = list.color;
        listToReplace.title = list.title;
        listToReplace.toDoItems = list.toDoItems;
        this.lists.next([...this.lists.getValue().filter(x => x.id != id), listToReplace]);
      }
      else {
      throw new Error("List not found");
    }
  }

  // getListById(id: number) {
  //    if (id != 0) {
  //     this.lists.getValue().filter(x => x.id == id);
  //    }
  //    else throw new Error("List not found");
  // }

  
}
