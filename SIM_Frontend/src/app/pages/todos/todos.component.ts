import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  Subject,
  map,
  BehaviorSubject,
  switchMap,
  catchError,
  of,
  tap,
  Observable,
  take,
} from 'rxjs';
import { AddTodoModalComponent } from 'src/app/components/add-todo-modal/add-todo-modal.component';
import { User } from 'src/app/interfaces/user';
import { TodosService } from 'src/app/services/todos.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent {
  constructor(private todosSrv: TodosService, private dialog: MatDialog) {}
  private destryed$ = new Subject<void>();
  public currentPage$ = new BehaviorSubject<number>(1);
  private todosPerPage = 16;
  private showCompleted: boolean = false;
  private showExpired: boolean = false;
  private totalTodos$ = new BehaviorSubject<number>(0);
  public totalPages$: Observable<number> = this.totalTodos$.pipe(
    map((totalTodos) => Math.ceil(totalTodos / this.todosPerPage)),
    catchError(() => of(0))
  );

  // todos$ = this.currentPage$.pipe(
  //   switchMap((currentPage) =>
  //     this.todosSrv.list(this.showCompleted, this.showExpired).pipe(
  //       tap((todos) => this.totalTodos$.next(todos.length)),
  //       map((todos) => {
  //         const startIndex = (currentPage - 1) * this.todosPerPage;
  //         const endIndex = startIndex + this.todosPerPage;
  //         return todos.slice(startIndex, endIndex);
  //       }),
  //       catchError((err) => of([]))
  //     )
  //   )
  // );
  // todos$ = this.currentPage$.pipe(
  //   switchMap((currentPage) =>
  //     this.todosSrv.list(this.showCompleted, this.showExpired).pipe(
  //       tap((todos) => this.totalTodos$.next(todos.length)),
  //       map((todos) => {
  //         if (currentPage === 1) {
  //           todos = [
  //             { id: 'add', title: 'ADD', createdBy: this.user },
  //             ...todos,
  //           ]; // add your initial "Add" Todo object
  //         }
  //         const startIndex = (currentPage - 1) * this.todosPerPage;
  //         const endIndex = startIndex + this.todosPerPage;
  //         return todos.slice(startIndex, endIndex);
  //       }),
  //       catchError((err) => of([]))
  //     )
  //   )
  // );
  user: User = { firstName: '', lastName: '', picture: '', fullName: '' };
  todos$ = this.currentPage$.pipe(
    switchMap((currentPage) =>
      this.todosSrv.list(this.showCompleted, this.showExpired).pipe(
        tap((todos) => this.totalTodos$.next(todos.length)),
        map((todos) => {
          const startIndex = (currentPage - 1) * this.todosPerPage;
          const endIndex = startIndex + this.todosPerPage;
          return todos.slice(startIndex, endIndex);
        }),
        catchError((err) => of([]))
      )
    )
  );

  handleRefreshList() {
    this.currentPage$.next(this.currentPage$.value);
  }

  onFlexSwitchChange(event: any) {
    this.showCompleted = event.target.checked;
    this.handleRefreshList(); // Force refresh.
    console.log('showCompleted?', this.showCompleted);
  }

  onFlexSwitchChangeEXP(event: any) {
    this.showExpired = event.target.checked;
    this.handleRefreshList(); // Force refresh.
    console.log('showExpired?', this.showExpired);
  }

  previousPage() {
    if (this.currentPage$.value > 1) {
      this.currentPage$.next(this.currentPage$.value - 1);
      console.log('trigger_PreviousPage');
    }
  }

  nextPage() {
    const currentPage = this.currentPage$.value + 1;
    this.totalPages$.pipe(take(1)).subscribe((totalPages) => {
      if (currentPage <= totalPages) {
        this.currentPage$.next(currentPage);
      }
    });
  }

  openAddModal() {
    const dialogRef = this.dialog.open(AddTodoModalComponent, {
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.handleRefreshList();
    });
  }
}
