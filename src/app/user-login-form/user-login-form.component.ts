// root/src/app/user-login-form/user-login-form.component.ts

import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrl: './user-login-form.component.scss'
})

export class UserLoginFormComponent {
  @Input() loginData = { Username: '', Password: '' }

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void { }

  // This is the function responsible for sending the form inputs to the backend
  loginUser(): void {
    this.fetchApiData.userLogin(this.loginData).subscribe({
      next: (result) => {
        // Logic for a successful user login goes here! (To be implemented)
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('token', result.token);
        this.dialogRef.close(); // This will close the modal on a success!
        console.log(result);
        this.snackBar.open('Login successful!', 'OK', {
          duration: 2000
        });
        this.router.navigate(['movies']);
      },
      error: (result) => {
        console.log(result);
        this.snackBar.open('Login failed.', 'OK', {
          duration: 2000
        });
      }
    });
  }
}
