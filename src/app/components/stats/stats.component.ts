import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Sport } from '../../models/sport';
import { Player } from '../../models/player';
import { Game } from '../../models/game';
import { PlayersService } from '../../services/players.service'
import { GamesService } from '../../services/games.service'
import { SportsService } from '../../services/sports.service'


@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
 
  @Input() currentSport: Sport;
  sport: Sport;
  games : Game[];
//temp

  players : Player[];
  sports:Sport[];

  constructor(private sportsService : SportsService, 
              private gamesService : GamesService,
              private playersService : PlayersService) { }

  ngOnInit() {
    console.log("match : " + this.currentSport)
    this.sport = new Sport()
    this.sport.id = this.currentSport[0];
    this.sport.name = this.currentSport[1];
    console.log(this.sport);
    //Get sports
    this.sportsService.getSports().subscribe(res => {
      this.sports = res;
      console.log(this.sports);
    });
    //Get players
    this.playersService.getPlayers().subscribe(res => {
      this.players = res;
      console.log(this.players);
    });
    //get games
    this.gamesService.getGames().subscribe(res =>{
      this.games = res;
      console.log(this.games);
      //Change player Id to player in games
      this.transformPLayerIdToPlayerName();
      this.transformSportIdToSport();
    });
     
    
  }

  transformPLayerIdToPlayerName(){
    
    for(let game of this.games){
      let tempTeam1 = new Array<Player>()
      let tempTeam2 = new Array<Player>()
      for(let player of game.team1){
        console.log("team 1 :"+player);
        player = this.players.find(x => x.id == player);
        console.log(player);
        tempTeam1.push(player);
      }
      for(let player of game.team2){
        console.log("team 2 :"+player);
        player = this.players.find(x => x.id == player);
        console.log(player);
        tempTeam2.push(player);
      }
      game.team1 = tempTeam1;
      game.team2 = tempTeam2;
    }
    console.log(this.games);
  }

  transformSportIdToSport(){
    for(let game of this.games){
      game.sport = this.sports.find(x => x.id == game.sport);
    }
  }

}
