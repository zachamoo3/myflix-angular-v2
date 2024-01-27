// root/src/app/synopsis/synopsis.component.ts

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-synopsis',
  templateUrl: './synopsis.component.html',
  styleUrl: './synopsis.component.scss'
})

export class SynopsisComponent {

  /**
   * @constructor
   * @param data 
   * @returns movie title, release data, rating, genre, director, description, and image url
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Title: string;
      Release_Date: string;
      Rating: string;
      Genre: string;
      Director: string;
      Description: string;
      Image_Url: string;
    },
  ) { }

  ngOnInit(): void { }
}
