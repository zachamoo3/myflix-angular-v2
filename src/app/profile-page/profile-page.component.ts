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

  /**
   * @constructor
   * @param fetchApiData 
   * @returns access to functions in fetchApiData
   * @param snackBar 
   * @returns use of the snackbar notification
   * @param dialog
   * @returns access to display a dialog
   * @param router 
   * @returns access to change the page displayed
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router,
  ) { };

  ngOnInit(): void {
    this.loadUser();
  }

  /**
   * @description builds a list of movie data based on the user's favorites
   * @returns array of movie details of movies that are the user's favorites
   */
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

  /**
   * @description opens a dialog featuring the UpdateFormComponent
   * @returns the UpdateFormComponent featured as a dialog
   */
  openEditProfileDialog(): void {
    this.dialog.open(UpdateFormComponent, {
      width: '300px',
    });
  }

  /**
   * @description access the api to use the deleteUser function
   * @returns user profile deletion
   * @returns reroute to welcome page ('welcome')
   * @throws error if failed to delete the account
   */
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
