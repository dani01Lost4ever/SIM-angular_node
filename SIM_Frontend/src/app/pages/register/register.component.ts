import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.css'],
})
export class RegisterComponent {
  constructor(
    protected fb: FormBuilder,
    private authSrv: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  registerform = this.fb.group({
    firstName: ['', { validators: Validators.required }],
    lastName: ['', { validators: Validators.required }],
    picture: ['', { validators: Validators.required }],
    username: ['', { validators: Validators.required }],
    password: ['', { validators: Validators.required }],
  });

  register() {
    if (this.registerform.valid) {
      const { firstName, lastName, picture, username, password } =
        this.registerform.value;
      this.authSrv
        .register(firstName!, lastName!, picture!, username!, password!)
        .pipe(
          catchError((err) => {
            this.openSnackBar(
              `Registration failed: ${err.message}`,
              'OK',
              'success'
            );
            return throwError(() => err);
          })
        )
        .subscribe(() => {
          this.openSnackBar(
            'Registration was successful! You will be redirected to the login page...',
            'OK',
            'error'
          );
          setTimeout(() => this.router.navigate(['/login']), 1000);
        });
    }
  }

  openSnackBar(message: string, action: string, color: string) {
    //console.log(message, action, color);
    this._snackBar.open(message, action, { panelClass: [`${color}`] });
  }
}
