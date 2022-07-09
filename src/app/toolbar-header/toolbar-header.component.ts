import { Component, OnInit } from '@angular/core';
import { FetchDataService } from '../fetch-api-data.service';
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
    public fetchApiData: FetchDataService,
    public router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialogModule
  ) {}

  ngOnInit(): void {}

  showMovies(): void {
    this.router.navigate(['movies']);
  }

  showProfile(): void {
    this.router.navigate(['profile']);
  }

  logout(): void {
    localStorage.clear();
    this.snackBar.open('You have been successfully logged out', 'Ok', {
      duration: 2000,
    });
    this.router.navigate(['welcome']);
  }
}
