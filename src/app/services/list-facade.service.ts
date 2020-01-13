import { Injectable } from '@angular/core';
import { ListStorageService } from './list-storage.service';
import { ToDoListService } from './to-do-list.service';
import { delay } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
      .pipe(delay(1000))
      .subscribe(data => this.listStorageService.set(data));
  }

}
