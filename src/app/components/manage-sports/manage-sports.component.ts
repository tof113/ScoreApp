import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Sport } from '../../models/sport';
import { SportsService } from '../../services/sports.service'
@Component({
  selector: 'app-manage-sports',
  templateUrl: './manage-sports.component.html',
  styleUrls: ['./manage-sports.component.css']
})
export class ManageSportsComponent implements OnInit {

  currentSportId: number;
  curretnSport: Sport;

  //temp
  sports:Sport[];

  constructor(private sportService : SportsService) { }

  @Output() messageEvent = new EventEmitter();
  ngOnInit() {
    //get all sports
    this.sports = new Array();
    this.sportService.getSports().subscribe(res => {
      this.sports = res;
      console.log(this.sports);
    })

  }

  addSport(sport:string){
    //Call service
    this.sportService.addSport(sport).subscribe(res => {
      this.sports.push(res);
      console.log(this.sports);
    });

    
  }

  chooseSport(){
    console.log(this.currentSportId);
    //Return the chosen sport to app.component
    let sport = this.sports.find(k => k.id == this.currentSportId );
    this.messageEvent.emit([sport.id,sport.name]);
    
  }

}
