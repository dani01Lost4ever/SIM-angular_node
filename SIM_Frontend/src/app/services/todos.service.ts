import { Injectable } from '@angular/core';
import { Todo } from '../interfaces/todos';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private todosWithFilter: Todo[] = []; // Store the filtered todos
  constructor(private http: HttpClient) {}

  list(showCompleted: boolean, showExpired: boolean): Observable<Todo[]> {
    console.log('List_Refreshed');
    return this.http
      .get<Todo[]>(`/api/todos/?showCompleted=${showCompleted}`)
      .pipe(
        map((todos: Todo[]) => {
          if (!showExpired) {
            return todos.filter((todo) => !todo.expired);
          }
          return todos;
        })
      );
  }

  count(showCompleted: boolean, showExpired: boolean): Observable<number> {
    console.log('Count_Refreshed');
    return this.list(showCompleted, showExpired).pipe(
      map((todos) => todos.length)
    );
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

  userList(): Observable<User[]> {
    return this.http.get<User[]>('/api/users');
  }

  assignTo(todoId: string, userId: string): Observable<object> {
    return this.http.post(`/api/todos/${todoId}/assignTo`, {
      userId: userId,
    });
  }
}
