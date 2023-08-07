import { Injectable } from '@angular/core';
import { Todo } from '../interfaces/todos';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private todosWithFilter: Todo[] = []; // Store the filtered todos
  constructor(private http: HttpClient) {}

  list(showCompleted: boolean): Observable<Todo[]> {
    console.log('List_Refreshed');
    return this.http.get<Todo[]>(`/api/todos/?showCompleted=${showCompleted}`);
  }

  count(showCompleted: boolean): Observable<number> {
    console.log('Count_Refreshed');
    return this.list(showCompleted).pipe(map((todos) => todos.length));
  }

  //OLD
  // list(showCompleted: boolean) {
  //   if (showCompleted == false) return this.http.get<Todo[]>('/api/todos/');
  //   else
  //     return this.http.get<Todo[]>(`/api/todos/?showCompleted=${showCompleted}`);
  // }

  // count(): Observable<number> {
  //   // Simulate counting locally based on the filters
  //   return this.list().pipe(map((todo) => todo.length));
  // }
}
