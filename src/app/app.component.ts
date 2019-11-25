import {Component, OnInit} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {IPost} from './models/post.interface';
import {ITodo} from './models/todo.interface';


@Component({
  selector: 'app-root',
  template: `
    <div class="container">

      <h1 class="text-center pb-5 pt-4">Retry Failed Requests From UI</h1>

      <div class="row">

        <!-- Posts start -->
        <div class="col-md-6">

          <h4 class="text-center">POSTS <button class="btn btn-link" (click)="fetchPosts()">Reload</button></h4>

          <ul class="list-group" *ngIf="posts$ | async; let posts">
            <li class="list-group-item" *ngFor="let post of posts">{{post.title}}</li>
          </ul>

          <ng-container *ngIf="fetchPostsFailed">
            <app-try-again (tryAgain)="fetchPosts()"
                           message="Failed to load Posts.">

            </app-try-again>
          </ng-container>

        </div>
        <!-- Posts end -->

        <!-- Todos start -->
        <div class="col-md-6">

          <h4 class="text-center">TODOS <button class="btn btn-link" (click)="fetchTodos()">Reload</button></h4>

          <ul class="list-group" *ngIf="todos$ | async; let todos">
            <li class="list-group-item" *ngFor="let todo of todos">{{todo.title}}</li>
          </ul>

          <ng-container *ngIf="fetchTodosFailed">
            <app-try-again (tryAgain)="fetchTodos()"
                           message="Failed to load Todos.">

            </app-try-again>
          </ng-container>

        </div>
        <!-- Todos end -->

      </div>

    </div>

  `,
})
export class AppComponent implements OnInit {

  posts$: Observable<IPost[]>;
  fetchPostsFailed: boolean;

  todos$: Observable<ITodo[]>;
  fetchTodosFailed: boolean;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchPosts();
    this.fetchTodos();
  }

  fetchPosts() {
    this.posts$ = this.http.get<IPost[]>('https://jsonplaceholder.typicode.com/posts')
      .pipe(
        // fetch is successful so set failed to false
        tap(() => this.fetchPostsFailed = false),
        // fetch has failed so set failed to true
        catchError((error) => {
          this.fetchPostsFailed = true;
          return throwError(error);
        }),
      );

  }

  fetchTodos() {
    this.todos$ = this.http.get<ITodo[]>('https://jsonplaceholder.typicode.com/todos')
      .pipe(
        // fetch is successful so set failed to false
        tap(() => this.fetchTodosFailed = false),
        // fetch has failed so set failed to true
        catchError((error) => {
          this.fetchTodosFailed = true;
          return throwError(error);
        }),
      );

  }

}
