import { Injectable }                  from '@angular/core';
import { HttpClient }                  from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Player }                      from '../models/player';

@Injectable ( {
                providedIn : 'root',
              } )
export class PlayerService {
  URL_API : string = 'https://www.balldontlie.io/api/v1/players';
  listaJugadores$ = new BehaviorSubject<Player[]> ( [] );

  // players$ = this.listaJugadores$.asObservable ();

  constructor( private httpClient : HttpClient ) {
    this.getAllPlayers ();
  }

  getAllPlayers() {
    return this.httpClient.get<Player> ( `${ this.URL_API }?per_page=100` )
               .subscribe ( ( response : any ) => this.listaJugadores$.next ( response.data ) );
  }

  getPlayer( id : string ) : Observable<Player> {
    return this.httpClient.get<Player> ( `${ this.URL_API }/${ id }` );
  }

  filterTerm( termino : string ) {
    const listaJugadoresFiltrados = new BehaviorSubject<Player[]> ( [] );
    this.listaJugadores$
        .subscribe ( jugadores => {
          // listaJugadores = jugadores;
          listaJugadoresFiltrados.next ( this.buscarValores ( jugadores, termino ) );
        } );
    return listaJugadoresFiltrados;
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
