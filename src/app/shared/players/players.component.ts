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

  playersListFilter : Array<Player> = [];


  constructor( public playerService : PlayerService,
               public router : Router,
  ) {
  }

  ngOnInit() : void {
    this.playerService.listaJugadores$
        .subscribe ( ( response ) => {
          this.playersListFilter = [... response];
        } );
  }

  detailPlayer( player : Player ) {
    this.router.navigate ( ['players/', player.id] );
  }

  crearJugador() {
    this.router.navigate ( ['players/', 'nuevo'] );
  }

  descargar() {
    const filename = 'data.json';
    const jsonStr = JSON.stringify ( this.playersListFilter );

    const element = document.createElement ( 'a' );
    element.setAttribute ( 'href', 'data:text/plain;charset=utf-8,' + encodeURIComponent ( jsonStr ) );
    element.setAttribute ( 'download', filename );

    element.style.display = 'none';
    document.body.appendChild ( element );
    element.click ();

    document.body.removeChild ( element );
  }
}
