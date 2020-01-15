import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ToDoItem } from '../models/to-do-item';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToDoItemService {

  readonly apiUrl: string = environment.toDoAppApiUrl;

  constructor(private httpClient: HttpClient) { }


  getAllToDoItems() : Observable<Array<ToDoItem>> {
    return this.httpClient.get<Array<ToDoItem>>(`${this.apiUrl}/todoitems`);
  }

  getToDoItemById(id: number) : Observable<ToDoItem> {
    return this.httpClient.get<ToDoItem>(`${this.apiUrl}/todoitem/${id}`);
  }
  

  createToDoItem(todoitem: ToDoItem) : Observable<ToDoItem> {
    return this.httpClient.post<ToDoItem>(`${this.apiUrl}/todoitem`, todoitem);
  }

  replaceToDoItem(id: number, todoitem: ToDoItem) : Observable<ToDoItem> {
    return this.httpClient.put<ToDoItem>(`${this.apiUrl}/todoitem/${id}`, todoitem);
}

deleteToDoItem(id: number) : Observable<void> {
  return this.httpClient.delete<void>(`${this.apiUrl}/todoitem/${id}`);
}

}
