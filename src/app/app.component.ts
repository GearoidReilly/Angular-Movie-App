import { Component } from '@angular/core';
import { MovieService } from './services/movie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //title = 'movie-app';
  constructor(){
  }

  /*ngOnInit(){
    //Makes an asynchronous call
    this.movieService.GetMovieInformation().subscribe((data) => {
      //Return data from the web service
      this.MyMovies = data.Search;
    });
  }*/
}
