import { BrowserModule } from '@angular/platform-browser';
import { NgModule }      from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent }     from './app.component';
import { HeaderComponent }  from './shared/header/header.component';
import { PlayersComponent } from './shared/players/players.component';
import { PlayerComponent }  from './shared/player/player.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule ( {
              declarations : [
                AppComponent,
                HeaderComponent,
                PlayersComponent,
                PlayerComponent,
              ],
              imports      : [
                BrowserModule,
                AppRoutingModule,
                HttpClientModule,
              ],
              providers    : [],
              bootstrap    : [AppComponent],
            } )
export class AppModule {}
