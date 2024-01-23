// root/src/app/welcome-page/welcome-page.component.ts

import { Component } from '@angular/core';
import { RegisterFormComponent } from '../register-form/register-form.component';
import { MatDialog } from '@angular/material/dialog';
import { LoginFormComponent } from '../login-form/login-form.component';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss'
})

export class WelcomePageComponent {
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void { }

  // This is the function that will open the dialog when the signup button is clicked
  openUserRegistrationDialog(): void {
    this.dialog.open(RegisterFormComponent, {
      // Assigning the dialog a width
      width: '300px'
    });
  }

  // This is the function that will open the dialog when the login button is clicked
  openUserLoginDialog(): void {
    this.dialog.open(LoginFormComponent, {
      // Assigning the dialog a width
      width: '300px'
    });
  }
}