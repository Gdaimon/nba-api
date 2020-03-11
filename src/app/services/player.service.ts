import { Injectable }      from '@angular/core';
import { HttpClient }      from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Player }          from '../models/player';
import { map }             from 'rxjs/operators';

@Injectable ( {
                providedIn : 'root',
              } )
export class PlayerService {
  URL_API : string = 'https://www.balldontlie.io/api/v1/players';
  listaJugadores$ = new BehaviorSubject<Player[]> ( [] );

  players$ = new BehaviorSubject<Player> ( {} );

  constructor( private httpClient : HttpClient ) {
    this.getAllPlayers ();
  }

  getAllPlayers() {
    return this.httpClient.get<Player> ( `${ this.URL_API }?per_page=100` )
               .subscribe ( ( response : any ) => this.listaJugadores$.next ( response.data ) );
  }

  getPlayer( id : string ) {
    return this.httpClient.get<Player> ( `${ this.URL_API }/${ id }` );
  }

  getPlayerLocal( id : string ) {
    return this.listaJugadores$
               .pipe (
                 map ( ( players : any ) => players.filter ( ( jugador : any ) => jugador.id === id ) ),
               )
               .subscribe (
                 playerFilter => {
                   this.players$ = new BehaviorSubject<Player> ( {} );
                   this.players$.next ( playerFilter );
                 },
               );
  }

  filterTerm( termino : string ) {
    const listaJugadoresFiltrados = new BehaviorSubject<Player[]> ( [] );
    this.listaJugadores$
        .subscribe ( jugadores => {
          listaJugadoresFiltrados.next ( this.buscarValores ( jugadores, termino ) );
        } );
    return listaJugadoresFiltrados;
  }

  eliminarJugador( id : number ) {
    this.listaJugadores$
        .pipe (
          map ( ( players : any ) => players.filter ( ( jugador : any ) => jugador.id !== id ) ),
        )
        .subscribe (
          playerFilter => {
            this.listaJugadores$ = new BehaviorSubject<Player[]> ( [] );
            this.listaJugadores$.next ( playerFilter );
          },
        );
  }

  adicionarJugador( jugador : any ) {
    this.listaJugadores$.pipe (
      map ( players => [... players, jugador] ),
    ).subscribe (
      players => {
        this.listaJugadores$ = new BehaviorSubject<Player[]> ( [] );
        this.listaJugadores$.next ( players );
      },
    );
  }

  updateJugador( jugador : any ) {
    this.listaJugadores$
        .subscribe (
          ( players : any ) => {
            for ( let indice = 0; indice <= players.length - 1; ++indice ) {
              if ( players[ indice ].id === jugador.id ) {
                players[ indice ] = jugador;
                break;
              }
            }
            this.players$ = new BehaviorSubject<Player> ( {} );
            this.players$.next ( players );
            this.listaJugadores$ = new BehaviorSubject<Player[]> ( [] );
            this.listaJugadores$.next ( players );
          },
        );
  }

  private buscarValores( jugadores : Player[], termino : string ) {
    return jugadores.filter ( ( player => {
      for ( const key in player ) {
        if ( player.hasOwnProperty ( key ) ) {

          if ( key === 'team' ) {
            for ( const llave in player.team ) {
              if ( player.team.hasOwnProperty ( llave ) ) {
                const elemento = `${ player.team[ llave ] }`;
                if ( elemento.includes ( termino ) ) {
                  console.log ( elemento );
                  return player;
                }
              }
            }
          } else {
            const elemento = `${ player[ key ] }`;
            if ( elemento.includes ( termino ) ) {
              console.log ( elemento );
              return player;
            }
          }
        }
      }
    } ) );
  }

}
