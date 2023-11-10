import { Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

interface MarkerAndColor{
  color: string;
  marker: Marker;
}

interface PlainMarker {
  color: string;
  lngLat: number[];
}

@Component({
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css']
})
export class MarkersPageComponent {

  // Para obtener la referencia
  @ViewChild('map') divMap?: ElementRef;

  public markers: MarkerAndColor[] = [];

  public zoom: number = 13;
  private map?: Map;
  public currentCenter: LngLat = new LngLat(-75.566708,6.304805);

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

      // Tambien acepta elementos html
      //const markerHtml = document.createElement('div');
      //markerHtml.innerHTML = 'Cristian Zapata'

      //Crear marcador
      // const marker = new Marker({
      //   color: 'green',
      //   //element: markerHtml
      // })
      //   .setLngLat( this.currentCenter )
      //   .addTo( this.map );

      //reading data stored
      this.readFromLocalStorage();
  }

  ngOnDestroy(): void {
    this.map?.remove(); // Remuevo todo el mapa y por ende los listeners
  }

  createMarker(){

    if( !this.map ) return;

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const LngLat = this.map?.getCenter();

    this.addMarker( LngLat, color );
  }

  private addMarker( lngLat: LngLat, color: string = 'green' ): void{

    if( !this.map ) return;

    const marker = new Marker({
      color: color,
      draggable: true
    }).setLngLat( lngLat )
      .addTo( this.map );

    this.markers.push( {
      color,
      marker
    } );

    //this.saveToLocalStorage();

    marker.on('dragend',  () => this.saveToLocalStorage() );
  }

  public deleteMarker( index: number ):void{
    //console.log({index})
    this.markers[index].marker.remove();
    this.markers.splice(index, 1);
  }

  public flyTo(marker: Marker){
    this.map?.flyTo({
      zoom: 13,
      center: marker.getLngLat()
    })
  }

  public saveToLocalStorage():void{

    const plainMarkers: PlainMarker[] = this.markers.map(({color, marker}) => {
      return { color, lngLat: marker.getLngLat().toArray() }
    });

    localStorage.setItem('plainMarkers', JSON.stringify( plainMarkers ));

  }

  public readFromLocalStorage():void{
    // If plainMarkers is empty we get a string of arrays
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarkers: PlainMarker[] = JSON.parse( plainMarkersString ); // !OJO

    plainMarkers.forEach( ({ color, lngLat }) => {
      const [ lng, lat ] = lngLat;
      const coords = new LngLat( lng, lat );
      this.addMarker( coords, color );
    });
  }
}
