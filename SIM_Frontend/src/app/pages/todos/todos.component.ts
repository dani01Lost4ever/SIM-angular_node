import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, map, BehaviorSubject, switchMap, catchError, of } from 'rxjs';
import { TodosService } from 'src/app/services/todos.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit, OnDestroy {
  public quantity: number = 0;
  public addedItem: string[] = [];

  todosPerPage = 24;
  private destryed$ = new Subject<void>();

  constructor(
    private todosSrv: TodosService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  currentPage$ = new BehaviorSubject<number>(1);

  todos$ = this.currentPage$.pipe(
    switchMap((currentPage) =>
      this.todosSrv.list().pipe(
        map((todos) => {
          const startIndex = (currentPage - 1) * this.todosPerPage;
          const endIndex = startIndex + this.todosPerPage;
          return todos.slice(startIndex, endIndex);
        }),
        catchError((err) => of([]))
      )
    )
  );

  previousPage() {
    if (this.currentPage$.value > 1) {
      this.currentPage$.next(this.currentPage$.value - 1);
    }
  }

  nextPage() {
    const currentPage = this.currentPage$.value;
    this.todosSrv.count().subscribe((totalTodos) => {
      const totalPages = Math.ceil(totalTodos / this.todosPerPage);

      if (currentPage < totalPages) {
        this.currentPage$.next(currentPage + 1);
      }
      //console.log('test');
    });
  }

  totalPages$ = this.todosSrv.count().pipe(
    map((totalTodos) => Math.ceil(totalTodos / this.todosPerPage)),
    catchError(() => of(0))
  );

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destryed$.next();
    this.destryed$.complete();
  }
}
