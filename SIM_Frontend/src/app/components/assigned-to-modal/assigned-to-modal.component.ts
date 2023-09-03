import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { MatDialogRef } from '@angular/material/dialog';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-assigned-to-modal',
  templateUrl: './assigned-to-modal.component.html',
  styleUrls: ['./assigned-to-modal.component.css'],
})
export class AssignedToModalComponent implements OnInit {
  displayedColumns: string[] = ['actions'];
  dataSource: User[] = [];
  constructor(
    private dialogRef: MatDialogRef<AssignedToModalComponent>,
    private userService: UsersService
  ) {}

  assignUser(user: User) {
    this.dialogRef.close(user);
  }

  ngOnInit() {
    this.userService.userList().subscribe((data: User[]) => {
      console.log(data);
      this.dataSource = data;
    });
  }
}
