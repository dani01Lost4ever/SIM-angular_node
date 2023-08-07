import { Injectable } from '@angular/core';
import { Todo } from '../interfaces/todos';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Todo[]>('/api/todos/');
  }

  count(): Observable<number> {
    // Simulate counting locally based on the filters
    return this.list().pipe(map((todo) => todo.length));
  }
}
