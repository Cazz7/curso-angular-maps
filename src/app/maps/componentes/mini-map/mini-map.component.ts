import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.css']
})
export class MiniMapComponent implements AfterViewInit {

  @Input() lngLat?: [number, number];

  // Para obtener la referencia
  @ViewChild('map') divMap?: ElementRef;

  public zoom: number = 13;
  private map?: Map;

  ngAfterViewInit(): void {
    if( !this.divMap?.nativeElement ) throw "Map Div not found";
    if( !this.lngLat ) throw "Lng Lat can't be null";

    this.map = new Map({
      container: this.divMap?.nativeElement,//'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
      interactive:false
      });

    //mapa

    //Crear marcador
      const marker = new Marker({
        color: 'green',
        //element: markerHtml
      })
        .setLngLat( this.lngLat )
        .addTo( this.map );
  }

  ngOnDestroy(): void {
    this.map?.remove(); // Remuevo todo el mapa y por ende los listeners
  }

}
