import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToDoList } from '../models/to-do-list';
import { ToDoItem } from '../models/to-do-item';
import { ignoreElements } from 'rxjs/operators';
import { log } from 'util';

@Injectable({
  providedIn: 'root'
})
export class ListStorageService {

  private lists: BehaviorSubject<Array<ToDoList>>;
  // private tasks: BehaviorSubject<Array<ToDoItem>>;

  constructor() {
    this.lists = new BehaviorSubject(null);
    // this.tasks = new BehaviorSubject(null);
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

  createItem(id:number, item: ToDoItem) {
    let list =  this.lists.getValue().find(x => x.id == id);
    if (list != null) {
      list.toDoItems.push(item);
      this.lists.next([...this.lists.getValue().filter(x => x.id != id), list]);
    }
  }


  removeList(id: number) {
    this.lists.next(this.lists.getValue().filter(x => x.id != id));
  }

  removeToDoItem(listId: number, itemId: number) {
      let list = this.lists.getValue().find(x => x.id == listId);
      if (list != null) {
          let item = list.toDoItems.find(x => x.id == itemId);
          if (item != null) {
            list.toDoItems = list.toDoItems.filter(x => x.id != itemId);
             this.lists.next([...this.lists.getValue().filter(x => x.id != listId), list]);
          }
      }
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


  replaceToDoItem(listId: number, itemId: number, todoitem: ToDoItem) {
      let list = this.lists.getValue().find(x => x.id == listId);
      if (list != null) {
          let item = list.toDoItems.find(x => x.id == itemId);
          item.id = todoitem.id;
          item.title = todoitem.title;
          item.text = todoitem.text;
          item.deadline = todoitem.deadline;
          item.toDoListId = todoitem.toDoListId;
          
          // list.toDoItems.filter(x => x.id != itemId);
          // list.toDoItems.push(item);
          this.lists.next([...this.lists.getValue().filter(x => x.id != listId), list]);

      }
  }

  // getListById(id: number) {
  //    if (id != 0) {
  //     this.lists.getValue().filter(x => x.id == id);
  //    }
  //    else throw new Error("List not found");
  // }

  
}
