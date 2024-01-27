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

  /**
   * @description The LoginFormComponent receives loginData that the user inputs into the template
   */
  @Input() loginData = {
    Username: '',
    Password: '',
  }

  /**
   * @constructor
   * @param fetchApiData 
   * @returns access to functions in fetchApiData
   * @param dialogRef 
   * @returns presents the Login Form Component as a dialog
   * @param snackBar 
   * @returns use of the snackbar notification
   * @param router 
   * @returns access to change the page displayed
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<LoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void { }

  /** 
   * @description This is the function responsible for sending the form inputs to the backend
   * @param loginData
   * @returns calls api to log in the user
   * @returns setting user and token into the localStorage
   * @returns reroute to the homepage ('movies')
   * @throws error if failed to log in the user
   */
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
