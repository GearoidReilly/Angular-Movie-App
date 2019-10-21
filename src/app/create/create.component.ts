import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import {MovieService} from '../services/movie.service'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private movieService:MovieService) { }

  ngOnInit() {
  }

  onAddMovie(form: NgForm) {
    //Sends form data to the movie service
    this.movieService.SendMovieInformation(form.value.title,
      form.value.year, form.value.poster).subscribe();
      console.log(form.value);
      form.resetForm();
      
    }
    

}
