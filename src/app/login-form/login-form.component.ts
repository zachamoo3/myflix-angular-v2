// root/src/app/login-form/login-form.component.ts

import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})

export class LoginFormComponent {
  @Input() loginData = {
    Username: '',
    Password: '',
  }

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<LoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void { }

  // This is the function responsible for sending the form inputs to the backend
  loginUser(): void {
    this.fetchApiData.userLogin(this.loginData).subscribe({
      next: (res) => {
        // Logic for a successful user login goes here! (To be implemented)
        localStorage.setItem('user', JSON.stringify(res.user));
        localStorage.setItem('token', res.token);
        console.log('Login successful!');
        this.dialogRef.close(); // This will close the modal on a success!
        this.snackBar.open('Login successful!', 'OK', {
          duration: 2000
        });
        this.router.navigate(['movies']);
      },
      error: (err) => {
        console.log('Login failed.');
        this.snackBar.open('Login failed.', 'OK', {
          duration: 2000
        });
      }
    });
  }
}
