import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

@Component ( {
               selector    : 'app-header',
               templateUrl : './header.component.html',
               styleUrls   : ['./header.component.scss'],
             } )
export class HeaderComponent implements OnInit {

  constructor( private router : Router ) {
  }

  ngOnInit() : void {
  }

  buscador( texto : string, event ) {
    event.preventDefault ();
    texto = texto.trim ();
    if ( texto.length > 0 ) {
      this.router.navigate ( ['/buscador', texto] );
    } else {
      this.router.navigate ( ['/players'] );
    }
  }
}
