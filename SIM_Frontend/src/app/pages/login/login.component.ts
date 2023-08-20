import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject, catchError, takeUntil, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm = this.fb.group({
    username: ['', { validators: Validators.required }],
    password: ['', { validators: Validators.required }],
  });

  loginError = '';

  private destroyed$ = new Subject<void>();

  constructor(
    protected fb: FormBuilder,
    private authSrv: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loginForm.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => {
        this.loginError = '';
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  login() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authSrv
        .login(username!, password!)
        .pipe(
          catchError((err) => {
            this.loginError = err.error.code;
            this.openSnackBar(`Login failed: ${this.loginError}`, 'OK', 'fail');
            return throwError(() => err);
          })
        )
        .subscribe(() => {
          this.router.navigate(['/todos']);
        });
    }
  }

  openSnackBar(message: string, action: string, color: string) {
    console.log(message, action, color);
    this._snackBar.open(message, action, { panelClass: [`${color}`] });
  }
}
