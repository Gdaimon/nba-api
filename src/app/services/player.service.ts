import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player }     from '../models/player';

@Injectable ( {
                providedIn : 'root',
              } )
export class PlayerService {
  URL_API : string = 'https://www.balldontlie.io/api/v1/players';


  constructor( private httpClient : HttpClient ) {
  }

  getAllPlayers() : Observable<Player> {
    return this.httpClient.get<Player> ( this.URL_API );
  }

  getPlayer( id : string ) : Observable<Player> {
    return this.httpClient.get<Player> ( `${ this.URL_API }/${ id }` );
  }
}
