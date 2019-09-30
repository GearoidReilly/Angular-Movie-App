import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieServicesService {

  constructor(private http:HttpClient) { }

  GetMovieInformation():Observable<any>{
    //returns movie json information
    return this.http.get("https://jsonblob.com/api/aa4cf0b3-e362-11e9-a00b-d3495579964c");
  }
}
