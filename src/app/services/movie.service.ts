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
}
