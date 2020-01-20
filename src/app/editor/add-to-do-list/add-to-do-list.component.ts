import { Component, OnInit } from '@angular/core';
import { ToDoListService } from 'src/app/core/services/to-do-list.service';
import { ToDoList } from 'src/app/core/models/to-do-list';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ListFacadeService } from 'src/app/core/services/list-facade.service';

@Component({
  selector: 'app-add-to-do-list',
  templateUrl: './add-to-do-list.component.html',
  styleUrls: ['./add-to-do-list.component.scss']
})
export class AddToDoListComponent implements OnInit {
 

  constructor(private toDoListFacade: ListFacadeService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  toDoListForm: FormGroup;

  Listid: number;

  todolist: ToDoList;

  get title() { return this.toDoListForm.get('title') as FormControl }
  get color() { return this.toDoListForm.get('color') as FormControl }

  async ngOnInit() {
    this.Listid = +this.activatedRoute.snapshot.paramMap.get('listid');
    
    this.toDoListForm = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      color: new FormControl('#000000', [Validators.pattern("^#[0-9,a-f,A-F]{6}$")])
    });
    
    if (this.Listid != 0) {
        // this.todolist = await this.toDoListService.getListById(this.Listid);
        this.toDoListFacade.getListById(this.Listid).subscribe(data => {
          this.todolist = data;
          if (this.todolist != null) {
            this.title.setValue(this.todolist.title);
            this.color.setValue(this.todolist.color);
             }
          }
        );
       
    }

  }


 onFormSubmit() {
      let todolist = this.toDoListForm.value;
      if (this.Listid != 0) {
          todolist.id = this.Listid;
          // await this.toDoListService.replaceToDoList(this.Listid, todolist);
          this.toDoListFacade.replaceList(this.Listid, todolist).subscribe(() => {
            this.router.navigate(['/toDoLists']);
          });
      }
      else {
        this.toDoListFacade.createList(todolist).subscribe(todolist => {
          this.router.navigate(['/toDoLists']);
        });
      }

      
  }

}
