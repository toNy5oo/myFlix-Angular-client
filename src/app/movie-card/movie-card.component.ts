// src/app/movie-card/movie-card.component.ts
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DirectorComponent } from '../director/director.component';
import { FetchDataService } from '../fetch-api-data.service';
import { GenreComponent } from '../genre/genre.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';

const DIALOG_WIDTH: string = '480px';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  movies: any[] = [];
  favoriteMovies: any[] = [];
  directors: any[] = [];
  genres: any[] = [];
  actors: any[] = [];
  user: any = Object;

  constructor(
    public fetchApiData: FetchDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getDirectors();
    this.getGenres();
  }

  //Fetch movies and set the state
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      this.getMissingData();
      return this.movies;
    });
  }

  //Fetch directors and set the state
  getDirectors(): void {
    this.fetchApiData.getDirectorsList().subscribe((resp: any) => {
      this.directors = resp;
      return this.directors;
    });
  }

  //Fetch genres and set the state
  getGenres(): void {
    this.fetchApiData.getGenresList().subscribe((resp: any) => {
      this.genres = resp;
      return this.genres;
    });
  }

  getMissingData(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      //Populate Fav Movies List
      this.favoriteMovies = this.user.FavoriteMovies;
      return this.user;
    });
  }

  findDirectorName(id: string) {
    let director = this.directors.find((director) => id === director._id);
    return director.Name;
  }

  isFav(id: any): boolean {
    return this.favoriteMovies.includes(id);
  }

  openGenreDialog(ids: string[]): void {
    let genresDataArray: any[] = [];
    ids.forEach((genre) => {
      let genresObj = this.genres.find((g) => genre === g._id);
      genresDataArray.push(genresObj);
    });
    //Movie can have more than one genre
    this.dialog.open(GenreComponent, {
      data: {
        genresArray: genresDataArray,
      },
      width: DIALOG_WIDTH,
    });
  }

  openDirectorDialog(id: string): void {
    let directorData = this.directors.find((director) => id === director._id);
    this.dialog.open(DirectorComponent, {
      data: {
        Name: directorData.Name,
        Bio: directorData.Bio,
      },
      width: DIALOG_WIDTH,
    });
  }

  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisComponent, {
      data: {
        Title: title,
        Description: description,
      },
      width: DIALOG_WIDTH,
    });
  }

  addToFavoriteMovies(id: string): void {
    this.fetchApiData.addFavoriteMovie(id).subscribe((result) => {
      console.log(result);
      this.ngOnInit();
    });
  }

  removeFromFavoriteMovies(id: string): void {
    console.log(id);
    this.fetchApiData.removeFavoriteMovie(id).subscribe((result) => {
      console.log(result);
      this.ngOnInit();
    });
  }
}
