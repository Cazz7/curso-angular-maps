import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import { Map } from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

@Component({
  templateUrl: './full-screen-page.component.html',
  styleUrls: ['./full-screen-page.component.css']
})
export class FullScreenPageComponent implements AfterViewInit {

  // Para obtener la referencia
  @ViewChild('map') divMap?: ElementRef;

  // Después de que la vista ha sido inicializada y tengo el http
  ngAfterViewInit(): void {

    if ( !this.divMap ) throw 'El elemento HTML no fue encontrado';

    // container recibe un elemento html
    const map = new Map({
      container: this.divMap?.nativeElement,//'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
      });
  }

}
