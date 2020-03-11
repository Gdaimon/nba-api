import { Component, OnInit }      from '@angular/core';
import { Player }                 from '../../models/player';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerService }          from '../../services/player.service';
import { generate as index }      from 'shortid';

@Component ( {
               selector    : 'app-player',
               templateUrl : './player.component.html',
               styleUrls   : ['./player.component.scss'],
             } )
export class PlayerComponent implements OnInit {

  player : Player = {
    team : {},
  };

  constructor( private activateRoute : ActivatedRoute,
               private playerService : PlayerService,
               private router : Router ) {
  }

  ngOnInit() : void {
    this.activateRoute.params.subscribe ( params => {
      const { id } = params;
      if ( id !== 'nuevo' ) {

        if ( +id ) {
          this.playerService.getPlayer ( id )
              .subscribe ( ( response : any ) => {
                             console.log ( response );
                             this.player = response;
                           },
              );
        } else {
          this.playerService.getPlayerLocal ( id );
          this.playerService.players$.subscribe ( ( response : any ) => {
            this.player = response[ 0 ];
          } );
        }

      }
    } );
  }

  eliminarJugador() {
    this.playerService.eliminarJugador ( this.player.id );
    this.router.navigate ( ['/players'] );
  }

  guardarJugador() {
    if ( this.player.id ) {
      return this.actualizarJugador ();
    } else {
      this.adicionarJugador ();
    }
  }

  adicionarJugador() {
    this.player.id = index ();
    this.playerService.adicionarJugador ( this.player );
    this.router.navigate ( ['/players'] );
  }

  actualizarJugador() {
    this.playerService.updateJugador ( this.player );
    this.router.navigate ( ['/players'] );
  }

  descargar() {
    const filename = 'data.json';
    const jsonStr = JSON.stringify ( this.player );

    const element = document.createElement ( 'a' );
    element.setAttribute ( 'href', 'data:text/plain;charset=utf-8,' + encodeURIComponent ( jsonStr ) );
    element.setAttribute ( 'download', filename );

    element.style.display = 'none';
    document.body.appendChild ( element );
    element.click ();

    document.body.removeChild ( element );
  }
}
