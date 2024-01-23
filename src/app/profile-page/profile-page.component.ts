// root/src/app/profile-page/profile-page.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';
import { UpdateFormComponent } from '../update-form/update-form.component';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})

export class ProfilePageComponent {
  user: any = {};
  token: any = '';
  favorite_movies: any = []; // array of all the data of the user's favorite movies

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router,
  ) { };

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');

    this.fetchApiData.getAllMovies().subscribe((allMovies: any) => {
      this.favorite_movies = allMovies.filter((movie: any) => {
        if (this.user.Favorite_Movies.includes(movie._id)) {
          return movie;
        }
      })
    });
  }

  openEditProfileDialog(): void {
    this.dialog.open(UpdateFormComponent, {
      width: '300px',
    });
  }

  deleteUser(): void {
    if (confirm('Do you wish to permanently delete your account?')) {
      this.fetchApiData.deleteUser(this.user.Username).subscribe({
        next: (res) => {
          localStorage.clear();
          this.router.navigate(['welcome']);
          console.log('Your account has been deleted.');
          this.snackBar.open('Your account has been deleted.', 'OK', {
            duration: 2000
          });
        },
        error: (err) => {
          console.error('Failed to delete your account.', err);
          this.snackBar.open('Failed to delete your account.', 'OK', {
            duration: 2000
          });
        }
      });
    }
  }
}
