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
  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
  ) { }

  toMovies(): void {
    this.router.navigate(['movies']);
  }

  toProfile(): void {
    this.router.navigate(['profile']);
  }

  logOut(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['welcome']);
    console.log('Successfully logged out.')
  }
}
