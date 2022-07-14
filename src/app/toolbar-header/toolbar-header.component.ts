import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-toolbar-header',
  templateUrl: './toolbar-header.component.html',
  styleUrls: ['./toolbar-header.component.scss'],
})
export class ToolbarHeaderComponent implements OnInit {
  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialogModule
  ) {}

  ngOnInit(): void {}

  /**
   * User route to navigate to /movies
   */
  showMovies(): void {
    this.router.navigate(['movies']);
  }

  /**
   * User route to navigate to /profile
   */
  showProfile(): void {
    this.router.navigate(['profile']);
  }

  /**
   * Logout function
   * Clears the local storage & routes to /welcome
   */
  logout(): void {
    localStorage.clear();
    this.snackBar.open('You have been successfully logged out', 'Ok', {
      duration: 2000,
    });
    this.router.navigate(['welcome']);
  }
}
