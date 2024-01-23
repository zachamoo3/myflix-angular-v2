// root/src/app/update-form/update-form.component.ts

import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrl: './update-form.component.scss'
})

export class UpdateFormComponent {
  user: any = {};
  @Input() userData = {
    Username: '',
    Password: '',
    Email: '',
    Birth_Date: '',
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UpdateFormComponent>
  ) { };

  ngOnInit(): void { }

  updateUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe({
      next: (data) => {
        this.dialogRef.close();
        localStorage.setItem('user', JSON.stringify(data));
        console.log('Your profile has been updated.', data)
        this.snackBar.open('Your profile has been updated.', 'OK', {
          duration: 2000
        });
        window.location.reload();
      },
      error: (err) => {
        console.error('Failed to update user profile.', err)
        this.snackBar.open('Failed to update user profile.', 'OK', {
          duration: 2000
        });
      }
    });
  }
}
