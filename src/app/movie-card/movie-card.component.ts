// root/src/app/movie-card/movie-card.component.ts

import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})

export class MovieCardComponent {

  /**
   * @description The MovieCardComponent receives movie data as a parameter
   */
  @Input() movie = {
    _id: '',
    Title: '',
    Release_Date: '',
    Director: {
      Name: ''
    },
    Genre: {
      Name: ''
    },
    Image_Url: ''
  }

  /**
   * @constructor
   * @param fetchApiData 
   * @returns access to functions in fetchApiData
   * @param dialog 
   * @returns access to display a dialog
   * @param snackBar 
   * @returns use of the snackbar notification
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void { }

  /**
   * @description calls the api to use the isFavoriteMovie function
   * @param movieId 
   * @returns boolean on whether a movie is in the user's favorites
   */
  isFav(movieId: string): boolean {
    return this.fetchApiData.isFavoriteMovie(movieId);
  }

  /**
   * @description calls the api to use the addFavoriteMovie function
   * @param movieId 
   * @returns movie added to user's list of favorites
   */
  addFav(movieId: string): void {
    this.fetchApiData.addFavoriteMovie(movieId).subscribe(() => {
      this.snackBar.open('Movie added to your favorites!', 'OK', {
        duration: 2000,
      });
    });
  }

  /**
   * @description calls the api to use the deleteFavoriteMovie function
   * @param movieId 
   * @returns movie removed from user's list of favorites
   */
  removeFav(movieId: string): void {
    this.fetchApiData.deleteFavoriteMovie(movieId).subscribe(() => {
      this.snackBar.open('Movie removed from your favorites.', 'OK', {
        duration: 2000,
      })
    })
  }

  /**
   * @description calls the api to use the getGenre function
   * @param genre 
   * @returns dialog showing genre details
   */
  openGenre(genre: any): void {
    this.fetchApiData.getGenre(genre.Name).subscribe((resp: any) => {
      this.dialog.open(GenreComponent, {
        data: {
          Name: resp.Name,
          Description: resp.Description
        },
        width: '40em'
      });
    });
  }

  /**
   * @description calls the api to use the getDirector function
   * @param director 
   * @returns dialog showing director details
   */
  openDirector(director: any): void {
    this.fetchApiData.getDirector(director.Name).subscribe((resp: any) => {
      this.dialog.open(DirectorComponent, {
        data: {
          Name: resp.Name,
          Birth_Year: resp.Birth_Year,
          Death_Year: resp.Death_Year,
          Bio: resp.Bio
        },
        width: '40em'
      });
    });
  }

  /**
   * @description calls the api to use the getOneMovie function
   * @param movie
   * @returns dialog showing movie details
   */
  openSynopsis(movie: any): void {
    this.fetchApiData.getOneMovie(movie.Title).subscribe((resp: any) => {
      this.dialog.open(SynopsisComponent, {
        data: {
          Title: resp.Title,
          Release_Date: resp.Release_Date,
          Rating: resp.Rating,
          Genre: resp.Genre.Name,
          Director: resp.Director.Name,
          Description: resp.Description,
          Image_Url: resp.Image_Url
        },
        width: '60em'
      });
    });
  }
}
