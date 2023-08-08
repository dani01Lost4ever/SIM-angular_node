import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {
  Subject,
  map,
  BehaviorSubject,
  switchMap,
  catchError,
  of,
  combineLatest,
} from 'rxjs';
import { TodosService } from 'src/app/services/todos.service';
import { merge } from 'rxjs';
@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit, OnDestroy {
  constructor(private todosSrv: TodosService) {}
  private destryed$ = new Subject<void>();
  currentPage$ = new BehaviorSubject<number>(1);

  todosPerPage = 24;
  showCompleted: boolean = false;
  showExpired: boolean = false;

  // todos$ = this.currentPage$.pipe(
  //   switchMap((currentPage) =>
  //     this.todosSrv.list(this.showCompleted).pipe(
  //       map((todos) => {
  //         const startIndex = (currentPage - 1) * this.todosPerPage;
  //         const endIndex = startIndex + this.todosPerPage;
  //         return todos.slice(startIndex, endIndex);
  //       }),
  //       catchError((err) => of([]))
  //     )
  //   )
  // );
  todos$ = this.currentPage$.pipe(
    switchMap((currentPage) =>
      this.todosSrv.list(this.showCompleted, this.showExpired).pipe(
        map((todos) => {
          const startIndex = (currentPage - 1) * this.todosPerPage;
          const endIndex = startIndex + this.todosPerPage;
          return todos.slice(startIndex, endIndex);
        }),
        catchError((err) => of([]))
      )
    )
  );
  onFlexSwitchChange(event: any) {
    this.showCompleted = event.target.checked;
    this.currentPage$.next(this.currentPage$.value); // Force refresh.
    console.log('showCompleted?', this.showCompleted);
  }
  onFlexSwitchChangeEXP(event: any) {
    this.showExpired = event.target.checked;
    this.currentPage$.next(this.currentPage$.value); // Force refresh.
    console.log('showExpired?', this.showExpired);
  }

  previousPage() {
    if (this.currentPage$.value > 1) {
      this.currentPage$.next(this.currentPage$.value - 1);
      console.log('trigger_PreviousPage');
    }
  }

  nextPage() {
    const currentPage = this.currentPage$.value;
    this.totalPages$.subscribe((totalPages) => {
      if (currentPage < totalPages) {
        this.currentPage$.next(currentPage + 1);
      }
    });
  }

  totalPages$ = this.todosSrv.count(this.showCompleted, this.showExpired).pipe(
    map((totalTodos) => Math.ceil(totalTodos / this.todosPerPage)),
    catchError(() => of(0))
  );

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destryed$.next();
    this.destryed$.complete();
  }

  handleRefreshList() {
    this.currentPage$.next(this.currentPage$.value);
  }
}
