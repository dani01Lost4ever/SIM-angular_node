import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-todo-modal-buttons',
  templateUrl: './add-todo-modal-buttons.component.html',
  styleUrls: ['./add-todo-modal-buttons.component.css'],
})
export class AddTodoModalButtonsComponent {
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<AddTodoModalButtonsComponent>
  ) {} // Closing dialog window

  public cancel(): void {
    // To cancel the dialog window
    this.dialogRef.close();
  }

  public cancelN(): void {
    this.dialog.closeAll();
  }
}
