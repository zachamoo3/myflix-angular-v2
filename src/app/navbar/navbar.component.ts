// root/src/app/navbar/navbar.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})

export class NavbarComponent {
  /**
   * @constructor
   * @param fetchApiData 
   * @returns access to functions in fetchApiData
   * @param router 
   * @returns access to change the page displayed
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
  ) { }

  /**
   * @description reroutes to the homepage ('movies')
   */
  toMovies(): void {
    this.router.navigate(['movies']);
  }

  /**
   * @description reroutes to the profile page ('profile')
   */
  toProfile(): void {
    this.router.navigate(['profile']);
  }

  /**
   * @description reroutes to the welcome page ('welcome')
   * @returns logs the user out and removes the user and token item from localStorage
   */
  logOut(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['welcome']);
    console.log('Successfully logged out.')
  }
}
