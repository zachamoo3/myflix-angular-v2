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

  /**
   * @constructor
   * @param fetchApiData 
   * @returns access to functions in fetchApiData
   */
  constructor(public fetchApiData: FetchApiDataService) { }

  ngOnInit(): void {
    this.getMovies();
  }

  /**
   * @description call to api to get all movie data
   * @returns an array of all movies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }
}
