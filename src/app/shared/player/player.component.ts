import { Component, OnInit } from '@angular/core';
import { Player }            from '../../models/player';
import { ActivatedRoute }    from '@angular/router';
import { PlayerService }     from '../../services/player.service';

@Component ( {
               selector    : 'app-player',
               templateUrl : './player.component.html',
               styleUrls   : ['./player.component.scss'],
             } )
export class PlayerComponent implements OnInit {

  player : Player;

  constructor( private activateRoute : ActivatedRoute,
               private playerService : PlayerService ) {
  }

  ngOnInit() : void {
    this.activateRoute.params.subscribe ( params => {
      const { id } = params;
      this.playerService.getPlayer ( id )
          .subscribe ( ( response : any ) => {
            this.player = response;
            console.log ( this.player );
          } );

    } );
  }

}
