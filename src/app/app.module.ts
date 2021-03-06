import { BrowserModule } from '@angular/platform-browser';
import { NgModule }      from '@angular/core';

import { AppRoutingModule }  from './app-routing.module';
import { AppComponent }      from './app.component';
import { HeaderComponent }   from './shared/header/header.component';
import { PlayersComponent }  from './shared/players/players.component';
import { PlayerComponent }   from './shared/player/player.component';
import { HttpClientModule }  from '@angular/common/http';
import { BuscadorComponent } from './shared/buscador/buscador.component';
import { FormsModule }       from '@angular/forms';

@NgModule ( {
              declarations : [
                AppComponent,
                HeaderComponent,
                PlayersComponent,
                PlayerComponent,
                BuscadorComponent,
              ],
              imports      : [
                BrowserModule,
                AppRoutingModule,
                HttpClientModule,
                FormsModule,
              ],
              providers    : [],
              bootstrap    : [AppComponent],
            } )
export class AppModule {}
