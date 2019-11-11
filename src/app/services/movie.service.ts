import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Movie } from '../movie-model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http:HttpClient) { }

  GetMovieInformation():Observable<any>{
    //returns movie json information
    //return this.http.get("https://jsonblob.com/api/aa4cf0b3-e362-11e9-a00b-d3495579964c");
    return this.http.get("http://localhost:3000/api/movies");
  }

  SendMovieInformation(title:string,year:string,poster:string):Observable<any>{
    //Define a movie constant
    const movie:Movie = {title:title, year:year, poster:poster};
    
    //Send the movie data to the server
    return this.http.post("http://localhost:3000/api/movies",movie);
  }

  DeleteMovie(id:string):Observable<any>{
    //Return a server request while adding the id to the server request
    return this.http.delete("http://localhost:3000/api/movies/" + id);
  }

  getMovie(id: string): Observable<any> {
    //Return a server request to get a movie by id
    return this.http.get("http://localhost:3000/api/movies/" + id);
    }

  updateMovie(id: string, title: string, year: string, poster: string): Observable<any> {
    //Create a movie constant with the input title, year and poster
    const movie: Movie = { title: title, year: year, poster: poster };

    //Update the movie in the server with the id
    return this.http.put("http://localhost:3000/api/movies/" + id, movie);
  }
    
}
