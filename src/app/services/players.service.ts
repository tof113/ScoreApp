import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Player } from '../models/player';
import {Observable} from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  newPlayer: Player;


  constructor(private http: HttpClient) { }

  addPlayer(name: string): Observable<Player> {
    return this.http.post<Player>(environment.url + '/' + environment.player, {name});
  }

  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(environment.url + '/' + environment.player);
  }
}
