// root/src/app/director/director.component.ts

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrl: './director.component.scss'
})

export class DirectorComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string;
      Birth_Year: string;
      Death_Year: string;
      Bio: string;
    }
  ) { }

  ngOnInit(): void {
    // console.log(this.data);
  }
}
