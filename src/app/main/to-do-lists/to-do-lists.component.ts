import { Component, OnInit } from '@angular/core';
import { ToDoListService } from 'src/app/core/services/to-do-list.service';
import { ToDoList } from 'src/app/core/models/to-do-list';
import { log } from 'util';
import { ToDoItemService } from 'src/app/core/services/to-do-item.service';
import { ListFacadeService } from 'src/app/core/services/list-facade.service';

@Component({
  selector: 'app-to-do-lists',
  templateUrl: './to-do-lists.component.html',
  styleUrls: ['./to-do-lists.component.scss']
})
export class ToDoListsComponent implements OnInit {

  toDoLists = Array<ToDoList>();

  
  
  constructor(public toDoListFacade: ListFacadeService, private toDoListService: ToDoListService, private toDoItemService: ToDoItemService) { }

  ngOnInit() {
   
  }

  async deleteTaskClick(listId: number, itemId: number) {
    this.toDoListFacade.removeToDoItem(listId, itemId).subscribe();
  }

  async DeleteListClick(id: number) {
     this.toDoListFacade.removeList(id).subscribe();
  }

  lightOrDark(color) {

    // Variables for red, green, blue values
    var r, g, b, hsp;
    
    // Check the format of the color, HEX or RGB?
    if (color.match(/^rgb/)) {
  
        // If HEX --> store the red, green, blue values in separate variables
        color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
        
        r = color[1];
        g = color[2];
        b = color[3];
    } 
    else {
        
        // If RGB --> Convert it to HEX: http://gist.github.com/983661
        color = +("0x" + color.slice(1).replace( 
        color.length < 5 && /./g, '$&$&'));
  
        r = color >> 16;
        g = color >> 8 & 255;
        b = color & 255;
    }
    
    // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
    hsp = Math.sqrt(
    0.299 * (r * r) +
    0.587 * (g * g) +
    0.114 * (b * b)
    );
  
    // Using the HSP value, determine whether the color is light or dark
    if (hsp>127.5) {
  
        return '#000000';
    } 
    else {
  
        return '#fff';
    }
  }
  
}

