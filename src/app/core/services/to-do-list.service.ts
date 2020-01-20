import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { environment } from '../../environments/environment';
import { ToDoList } from '../models/to-do-list';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ToDoListService {

  readonly apiUrl: string = environment.toDoAppApiUrl;

  constructor(private httpClient: HttpClient) { }

 getAllToDoLists() : Observable<Array<ToDoList>> {
    return this.httpClient.get<Array<ToDoList>>(`${this.apiUrl}/todolist`);
  }

  getListById(id: number) : Observable<ToDoList> {
    return this.httpClient.get<ToDoList>(`${this.apiUrl}/todolist/${id}`);
  }

  createToDoList(todolist: ToDoList) : Observable<ToDoList> {
    return this.httpClient.post<ToDoList>(`${this.apiUrl}/todolist`, todolist);
  }


  replaceToDoList(id: number, todolist: ToDoList) : Observable<ToDoList> {
      return this.httpClient.put<ToDoList>(`${this.apiUrl}/todolist/${id}`, todolist);
  }

  deleteToDoList(id: number) : Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/todolist/${id}`);
  }


}

