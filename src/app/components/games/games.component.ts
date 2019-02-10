import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Sport } from '../../models/sport';
import { Player } from '../../models/player';
import { Game } from '../../models/game';
import { PlayersService } from '../../services/players.service'
import { GamesService } from '../../services/games.service'
import { SportsService } from '../../services/sports.service'

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  @Input() currentSport: Sport;
  sport : Sport;
  team1 : Player[] = new Array(0);
  team2 : Player[] = new Array(0);
  scoreT1 : number;
  scoreT2 : number;
  winner : number;

  currentPLayerT1 : number;
  currentPLayerT2 : number;

  errorMessage = "NOPE!!"

  displayAddNewPLayer1 = true;
  displayAddNewPLayer2 = true;
  displayError = false;

  games : Game[];
  //temp

    players : Player[];


  constructor(private sportService : SportsService, 
              private gamesService : GamesService,
              private playersService : PlayersService) { }

  ngOnInit() {
    console.log("match : " + this.currentSport)
    this.sport = new Sport()
    this.sport.id = this.currentSport[0];
    this.sport.name = this.currentSport[1];
    console.log(this.sport);
    this.playersService.getPlayers().subscribe(res => {
      this.players = res;
      console.log(this.players);
    });

  }

  addPlayer(name : string){
    this.playersService.addPlayer(name).subscribe(res =>{
      this.players.push(res);
      console.log(this.players);
    });
  }

  addNewLine(team : number){
    if(team == 1){
      this.displayAddNewPLayer1 = true;
    }else{
      this.displayAddNewPLayer2 = true;
    }
    
  }

  addToTeam(team : number, playerId : number){
    console.log(team + "  "+ playerId)
    let player : Player = this.players.find(k => k.id == playerId );
    console.log(player)
    if(team ==1){
      this.team1.push(player);
      console.log(this.team1);
      this.displayAddNewPLayer1 = false;
      this.currentPLayerT1 = undefined;
    }else{
      this.team2.push(player);
      console.log(this.team2);
      this.displayAddNewPLayer2 = false;
      this.currentPLayerT2 = undefined;
    }
    
  }

  removeFromTeam(team : number, index : number ){
    if(team == 1){
      this.team1.splice(index, 1)
    }else{
      this.team2.splice(index, 1)
    }
  }

  addMatch(){
    //Check
    if(this.team1.length>0 && this.team2.length >0){
      if(this.scoreT1 >-1 && this.scoreT2 > -1){
        this.displayError = false;
        let winner = 0;
        if(this.scoreT1 > this.scoreT2){
          winner = 1
        }else if(this.scoreT2 > this.scoreT1){
            winner = 2
        }
        this.gamesService.addGame(this.sport.id,this.team1, this.team2, winner , this.scoreT1, this.scoreT2).subscribe(res =>{
          console.log(res);
        });
      }else{
        this.displayError = true;
        this.errorMessage = "no score"
      }
    }else{
      this.displayError = true;
      this.errorMessage = "no player"
    }
  }



}
