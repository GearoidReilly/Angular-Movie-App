import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {

  MyMovies: any = [];
  constructor(private movieService:MovieService) { 
    //Makes an asynchronous call
    this.movieService.GetMovieInformation().subscribe((data) => {
      //Return data from the web service
      this.MyMovies = data.Search;
      console.log(this.MyMovies);
    });
  }

  ngOnInit() {
  }

}
