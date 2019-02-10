import { Component } from '@angular/core';
import { Sport } from './models/sport';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ScoreApp';

  displayGames = false;
  displayStats = false;
  displaySports = true;
  displayMenu = false;

  currentSport : Sport;
  currentSportId : number;

  showGames(){
    this.displayNone();
    this.displayGames = true;
  }

  showStats(){
    this.displayNone();
    this.displayStats = true;
  }

  showSports(){
    this.displayNone();
    this.displaySports= true;
  }

  displayNone(){
    this.displayGames = false;
    this.displayStats = false;
    this.displaySports = false;
  }

  goToGames($event){
    this.currentSport = $event;
    this.displayMenu = true;
    console.log("event: " + $event);
    this.showGames();
  }
}
