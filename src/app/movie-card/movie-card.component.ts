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

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavorites();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  getFavorites(): void {
    this.fetchApiData.getUser().subscribe({
      next: (response: any) => {
        if (response.user && response.user.Favorite_Movies) {
          this.favorites = response.user.Favorite_Movies;
        } else {
          this.favorites = [];
        }
      },
      error: (error: any) => {
        console.error('Error fetching user.Favorite_Movies:', error)
        this.favorites = [];
      }
    });
  }

  isFav(movieId: string): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.Favorite_Movies.indexOf(movieId) >= 0;
  }

  addFav(id: string): void {
    if (this.isFav(id)) {
      this.removeFav(id);
    } else {
      this.fetchApiData.addFavoriteMovie(id).subscribe(() => {
        this.snackBar.open('Movie added to your favorites!', 'OK', {
          duration: 2000,
        });
        this.getFavorites();
      });
    }
  }

  removeFav(id: string): void {
    this.fetchApiData.deleteFavoriteMovie(id).subscribe(() => {
      this.snackBar.open('Movie removed from your favorites.', 'OK', {
        duration: 2000,
      })
    })
  }

  openGenre(genre: any): void {
    this.dialog.open(GenreComponent, {
      data: {
        name: genre.Name,
        description: genre.Description
      },
      width: '30em'
    })
  }

  openDirector(director: any): void {
    this.dialog.open(DirectorComponent, {
      data: {
        name: director.Name,
        birth: director.Birth_Year,
        death: director.Death_Year,
        bio: director.Bio
      },
      width: '30em'
    })
  }

  openSynopsis(movie: any): void {
    this.dialog.open(SynopsisComponent, {
      data: {
        title: movie.Title,
        release: movie.Release_Date,
        rating: movie.Rating,
        description: movie.Description
      },
      width: '40em'
    })
  }
}
