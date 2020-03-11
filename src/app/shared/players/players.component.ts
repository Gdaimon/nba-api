import { Component, OnInit } from '@angular/core';
import { Player }            from '../../models/player';
import { PlayerService }     from '../../services/player.service';
import { Router }            from '@angular/router';

@Component ( {
               selector    : 'app-players',
               templateUrl : './players.component.html',
               styleUrls   : ['./players.component.scss'],
             } )
export class PlayersComponent implements OnInit {

  playersList : Array<Player> = [];
  playersListFilter : Array<Player> = [];


  constructor( public playerService : PlayerService,
               public router : Router,
  ) {
  }

  ngOnInit() : void {
    this.playerService.listaJugadores$
        .subscribe ( ( response ) => {
          // console.log ( response );
          // this.playersList = response;
          this.playersListFilter = [... response];
        } );
  }

  detailPlayer( player : Player ) {
    console.dir ( player );
    this.router.navigate ( ['players/', player.id] );
  }
}
