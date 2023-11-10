import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LngLat, Map } from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrls: ['./zoom-range-page.component.css']
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {

  // Para obtener la referencia
  @ViewChild('map') divMap?: ElementRef;

  public zoom: number = 10;
  private map?: Map;
  public currentCenter: LngLat = new LngLat(-74.5, 40);

  // Después de que la vista ha sido inicializada y tengo el http
  ngAfterViewInit(): void {

    if ( !this.divMap ) throw 'El elemento HTML no fue encontrado';

    // container recibe un elemento html
    this.map = new Map({
      container: this.divMap?.nativeElement,//'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentCenter, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
      });

      this.mapListeners()
  }

  ngOnDestroy(): void {
    this.map?.remove(); // Remuevo todo el mapa y por ende los listeners
  }

  private mapListeners(){
    if( !this.map ) throw 'Mapa no inicializado';

    this.map.on('zoom',(ev) => {
      this.zoom = this.map!.getZoom()
    } );

    this.map.on('zoomend',(ev) => {
      if( this.map!.getZoom() >= 10 && this.map!.getZoom() <= 10.5 ) return;
      this.map!.zoomTo(10);
    } );

    this.map.on('move',() => {
      this.currentCenter = this.map!.getCenter();
    } )
  }

  public zoomIn(){
    this.map?.zoomIn();
  }

  public zoomOut(){
    this.map?.zoomOut();
  }

  public zoomChanged( zoomString: string ): void{
    console.log( zoomString)
    this.zoom = Number( zoomString );
    this.map?.zoomTo(this.zoom);
  }
}
