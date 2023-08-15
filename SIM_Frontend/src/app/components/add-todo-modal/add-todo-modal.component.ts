import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddTodoModalButtonsComponent } from '../add-todo-modal-buttons/add-todo-modal-buttons.component';

@Component({
  selector: 'app-add-todo-modal',
  templateUrl: './add-todo-modal.component.html',
  styleUrls: ['./add-todo-modal.component.css'],
})
export class AddTodoModalComponent {
  public breakpoint: number = 0; // Breakpoint observer code
  public title: string = ``;
  wasFormChanged = false;

  constructor(private fb: FormBuilder, public dialog: MatDialog) {}
  public formGroup = new FormGroup({
    Title: new FormControl(null, [Validators.required]),
    date: new FormControl(null),
  });
  public dateControl = new FormControl(new Date(2021, 9, 4, 5, 6, 7));

  public onAddTodo(): void {
    console.log('content added');
  }

  openDialog(): void {
    this.dialog.closeAll();
  }

  public onResize(event: any): void {
    this.breakpoint = event.target.innerWidth <= 600 ? 1 : 2;
  }

  formChanged() {
    this.wasFormChanged = true;
  }
}
