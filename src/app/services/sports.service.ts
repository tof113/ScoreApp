import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Sport } from '../models/sport';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SportsService {

  //temp
  currentId = 3;
  newSport:Sport;

  constructor(private http: HttpClient) { }
  

  addSport(name): Observable<Sport>{
    //Call api
    return this.http.post<Sport>(environment.url+'/'+environment.sport,{"name":name});
  }

  getSports(): Observable<Sport[]>{
    //API
    return this.http.get<Sport[]>(environment.url+'/'+environment.sport);
  }
}
