import { Injectable } from '@angular/core';
import { Sport } from '../models/sport';
import { Player } from '../models/player';
import { Game } from '../models/game';

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {

  players: Player[];
  sports: Sport[];
  games: Game[];

  constructor() { }
}
