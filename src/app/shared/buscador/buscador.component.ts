import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerService }          from '../../services/player.service';
import { Player }                 from '../../models/player';

@Component ( {
               selector    : 'app-buscador',
               templateUrl : './buscador.component.html',
               styleUrls   : ['./buscador.component.scss'],
             } )
export class BuscadorComponent implements OnInit {
  listaJugadoresFiltrados : Player[] = [];

  constructor( private activatedRoute : ActivatedRoute,
               private router : Router,
               private playerService : PlayerService ) {
  }

  ngOnInit() : void {
    this.activatedRoute.params
        .subscribe ( param => {
          const { termino } = param;
          console.log ( termino );

          this.playerService.filterTerm ( termino )
              .subscribe ( filterData => {
                this.listaJugadoresFiltrados = filterData;
                console.log ( this.listaJugadoresFiltrados );
              } );

        } );

  }

  detailPlayer( player : Player ) {
    this.router.navigate ( ['players/', player.id] );
  }

}
