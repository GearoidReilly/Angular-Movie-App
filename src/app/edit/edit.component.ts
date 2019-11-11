import { Component, OnInit } from '@angular/core';
import {MovieService} from '../Services/movie.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from "@angular/forms";


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  movie:any=[];       //Movie to edit

  //Component has access to the movie service
  constructor(private router: Router, private route: ActivatedRoute,
    private movieService:MovieService) { }
    

  ngOnInit() {
    //Get the movie from the database based on movie id
    this.movieService.getMovie(this.route.snapshot.params['id']).subscribe((data) =>
    {
      //Get the data from the movie
      this.movie = data;
      console.log(this.movie);
    })
    }
      

  onEditMovie(form: NgForm) {
    //Takes in the data from the form and updates the movie
    this.movieService.updateMovie(this.movie._id, form.value.title,
    form.value.year, form.value.poster).subscribe();
    //Move to the read page on the application
    this.router.navigate(['/read']);
    }

}
