// src/app/movie-card/movie-card.component.ts
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DirectorComponent } from '../director/director.component';
import { FetchApiDataService } from '../fetch-api-data.service';
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
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getDirectors();
    this.getGenres();
  }

  /**
   * Gets all the movies using API service and populate local state variable
   * @returns array of movies objects
   * @function getMovies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      this.getMissingData();
      return this.movies;
    });
  }

  /**
   * Gets all the directors using API service and populate local state variable
   * @returns array of directors objects
   * @function getDirectors
   */
  getDirectors(): void {
    this.fetchApiData.getDirectorsList().subscribe((resp: any) => {
      this.directors = resp;
      return this.directors;
    });
  }

  /**
   * Gets all the genres using API service and populate local state variable
   * @returns array of genres objects
   * @function getGenres
   */
  getGenres(): void {
    this.fetchApiData.getGenresList().subscribe((resp: any) => {
      this.genres = resp;
      return this.genres;
    });
  }

  /**
   * Gets the user data using API service and populate local state variable
   * Sets local state FavoriteMovies with array of ids from user Object
   * @returns user objects
   * @function getMissingData
   */
  getMissingData(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      //Populate Fav Movies List
      this.favoriteMovies = this.user.FavoriteMovies;
      return this.user;
    });
  }

  /**
   * Matches director id and return the name
   * @returns director.Name: string
   * @function findDirectorName
   */
  findDirectorName(id: string) {
    let director = this.directors.find((director) => id === director._id);
    return director.Name;
  }

  /**
   * Checks if a movie is included in the user's list of favorite movies
   * @param id
   * @returns true if the movie is in the array
   * @function isFav
   */
  isFav(id: any): boolean {
    return this.favoriteMovies.includes(id);
  }

  /**
   * Opens the genre dialog from GenreComponent
   * @param ids: string[]
   * @function openGenreDialog
   */
  openGenreDialog(ids: string[]): void {
    let genresDataArray: any[] = [];
    ids.forEach((genre) => {
      let genresObj = this.genres.find((g) => genre === g._id);
      genresDataArray.push(genresObj);
    });
    this.dialog.open(GenreComponent, {
      data: {
        genresArray: genresDataArray,
      },
      width: DIALOG_WIDTH,
    });
  }

  /**
   * Opens the director dialog from DirectorComponent
   * @param id: string[]
   * @function openDirectorDialog
   */
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

  /**
   * Opens the synopsys dialog from SynopsysComponent
   * @param title
   * @param description
   * @function openSynopsisDialog
   */
  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisComponent, {
      data: {
        Title: title,
        Description: description,
      },
      width: DIALOG_WIDTH,
    });
  }

  /**
   * Add a movie to the list of favorite movies using API service
   * @param id
   * @function addToFavoriteMovies
   */
  addToFavoriteMovies(id: string): void {
    this.fetchApiData.addFavoriteMovie(id).subscribe((result) => {
      console.log(result);
      this.ngOnInit();
    });
  }

  /**
   * Remove a movie from the list of favorite movies using API service
   * @param id
   * @function removeFromFavoriteMovies
   */
  removeFromFavoriteMovies(id: string): void {
    console.log(id);
    this.fetchApiData.removeFavoriteMovie(id).subscribe((result) => {
      console.log(result);
      this.ngOnInit();
    });
  }
}
