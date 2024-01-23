// root/src/app/app.module.ts

import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { GenreComponent } from './genre/genre.component';
import { DirectorComponent } from './director/director.component';
import { SynopsisComponent } from './synopsis/synopsis.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { UpdateFormComponent } from './update-form/update-form.component';

const appRoutes: Routes = [
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'movies', component: HomePageComponent },
  { path: 'profile', component: ProfilePageComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'prefix' },
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterFormComponent,
    HomePageComponent,
    LoginFormComponent,
    WelcomePageComponent,
    ProfilePageComponent,
    GenreComponent,
    DirectorComponent,
    SynopsisComponent,
    NavbarComponent,
    MovieCardComponent,
    UpdateFormComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatIconModule,
    MatToolbarModule,
    MatProgressSpinnerModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
