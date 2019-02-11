import { Injectable } from '@angular/core';
import { Game } from '../models/game';
import { Player } from '../models/player';
import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class GamesService {
  GAMES: Game[] = [{
    id : 1,
    sport : 1,
    played_on : new Date(),
    team1 : ['ludo'],
    team2 : ['tim'],
    winners : 1,
    score1 : 11,
    score2 : 4
  },
  {
    id : 2,
    sport : 1,
    played_on : new Date(),
    team1 : ['bob'],
    team2 : ['todd'],
    winners : 2,
    score1 : 1,
    score2 : 11
  }];
  currentId = 3;
  constructor(private http: HttpClient) { }

  addGame(sport: number, team1: Player[], team2: Player[], winner: number, scoreT1: number, scoreT2: number): Observable<Game> {
    const teamId1: number[] = [];
    for (const player of team1) {
      teamId1.push(player.id);
    }

    const teamId2: number[] = [];
    for (const player of team2) {
      teamId2.push(player.id);
    }

    return this.http.post<Game>(environment.url + '/' + environment.game, {
      sport,
      team1: teamId1,
      team2: teamId2,
      score1: scoreT1,
      score2: scoreT2,
      winner
    });
  }

  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(environment.url + '/' + environment.game);
  }

  getGamesBySport(sport: number): Game[] {
    return this.GAMES;
  }

  getGamesByPlayer(player: number): Game[] {
    return this.GAMES;
  }
}
