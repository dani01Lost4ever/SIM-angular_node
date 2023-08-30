import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/interfaces/user';
import { TodosService } from 'src/app/services/todos.service';
import { AssignedToModalComponent } from '../assigned-to-modal/assigned-to-modal.component';

@Component({
  selector: 'app-add-todo-modal',
  templateUrl: './add-todo-modal.component.html',
  styleUrls: ['./add-todo-modal.component.css'],
})
export class AddTodoModalComponent {
  minDate: Date;
  public breakpoint: number = 0; // Breakpoint observer code
  public title: string = ``;
  wasFormChanged = false;
  public selectedUserName: string | null = null;
  private user: User | null = null;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private Srv: TodosService
  ) {
    this.minDate = new Date();
  }
  public formGroup = new FormGroup({
    Title: new FormControl(null, [Validators.required]),
    date: new FormControl(null),
  });
  public dateControl = new FormControl(new Date(2021, 9, 4, 5, 6, 7));

  public onAddTodo(): void {
    console.log('content added');
    if (this.formGroup.valid) {
      const formData = this.formGroup.value;
      console.log(formData, this.user?.id);
      this.Srv.addTodo(
        formData.Title ?? '',
        formData.date,
        this.user?.id
      ).subscribe(
        (response) => {
          console.log('Response: ', response);
          this.openDialog();
        },
        (error) => {
          console.log('Error: ', error);
        }
      );
    }
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

  openUserModal() {
    const dialogRef = this.dialog.open(AssignedToModalComponent);

    dialogRef.afterClosed().subscribe((selectedUser: User) => {
      console.log('SelectedUser_', selectedUser);
      if (selectedUser) {
        this.user = selectedUser;
        this.selectedUserName = selectedUser.fullName; // Update selected user's name
      } else {
        this.clearSelectedUser(); // Clear selected user when "Delete" is clicked
      }
    });
  }
  clearSelectedUser() {
    this.selectedUserName = null;
  }
}
