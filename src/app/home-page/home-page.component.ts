// root/src/app/home-page/home-page.component.ts

import { Component } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})

export class HomePageComponent {
  movies: any[] = [];

  constructor(public fetchApiData: FetchApiDataService) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }
}
