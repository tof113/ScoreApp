import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient }    from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

//Components
import { AppComponent } from './app.component';
import { StatsComponent } from './components/stats/stats.component';
import { ManageSportsComponent } from './components/manage-sports/manage-sports.component';
import { GamesComponent } from './components/games/games.component';

// Services
import { GamesService } from './services/games.service';
import { SportsService } from './services/sports.service';
import { PlayersService } from './services/players.service';
import { DataProviderService } from './services/data-provider.service';




@NgModule({
  declarations: [
    AppComponent,
    StatsComponent,
    ManageSportsComponent,
    GamesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [GamesService,SportsService,PlayersService, DataProviderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
