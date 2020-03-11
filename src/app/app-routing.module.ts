import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayersComponent }     from './shared/players/players.component';
import { PlayerComponent }      from './shared/player/player.component';
import { BuscadorComponent }    from './shared/buscador/buscador.component';


const routes : Routes = [
  { path : 'players', component : PlayersComponent },
  { path : 'players/:id', component : PlayerComponent },
  { path : 'buscador/:termino', component : BuscadorComponent },
  { path : '', redirectTo : 'players', pathMatch : 'full' },
  { path : '**', component : PlayersComponent },
];

@NgModule ( {
              imports : [RouterModule.forRoot ( routes )],
              exports : [RouterModule],
            } )
export class AppRoutingModule {}
