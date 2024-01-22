// root/src/app/movie-card/movie-card.component.ts

import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})

export class MovieCardComponent {
  movies: any[] = [];
  favorites: any[] = [];
  director: any;

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  isFav(movieId: string): boolean {
    return this.fetchApiData.isFavoriteMovie(movieId);
  }

  addFav(movieId: string): void {
    this.fetchApiData.addFavoriteMovie(movieId).subscribe(() => {
      this.snackBar.open('Movie added to your favorites!', 'OK', {
        duration: 2000,
      });
    });
  }


  removeFav(movieId: string): void {
    this.fetchApiData.deleteFavoriteMovie(movieId).subscribe(() => {
      this.snackBar.open('Movie removed from your favorites.', 'OK', {
        duration: 2000,
      })
    })
  }

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
