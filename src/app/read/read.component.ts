import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {

  myMovies: any = [];
  constructor(private movieService:MovieService) { 
    
  }

  ngOnInit() {
    //Makes an asynchronous call
    this.movieService.GetMovieInformation().subscribe((data) => {
      //Return data from the web service
      this.myMovies = data.movies;
      console.log(this.myMovies);
    });
  }

  onDelete(id:string){
    //Log the movie id
    console.log("Deleting movie: " + id);

    //Subscribe to the service function
    this.movieService.DeleteMovie(id).subscribe();
    //Add functionality to refresh the page automatically
    window.location.reload();
  }

}
