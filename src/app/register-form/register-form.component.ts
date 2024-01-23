// root/src/app/register-form/register-form.component.ts

import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})

export class RegisterFormComponent {
  @Input() userData = {
    Username: '',
    Password: '',
    Email: '',
    Birth_Date: '',
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<RegisterFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void { }

  // This is the function responsible for sending the form inputs to the back end
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe({
      next: (res) => {
        // Logic for a successful user registration goes here! (To be implemented)
        this.dialogRef.close(); // This will close the modal on a success!
        console.log('Registration successful.')
        this.snackBar.open('Registration successful!', 'OK', {
          duration: 2000
        });
      },
      error: (err) => {
        console.log('Registration failed.')
        this.snackBar.open('Registration failed.', 'OK', {
          duration: 2000
        });
      }
    });
  }
}
