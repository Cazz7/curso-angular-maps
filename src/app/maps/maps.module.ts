import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

import { MapsRoutingModule } from './maps-routing.module';
import { MiniMapComponent } from './componentes/mini-map/mini-map.component';
import { SideMenuComponent } from './componentes/side-menu/side-menu.component';
import { MapsLayoutComponent } from './layout/maps-layout/maps-layout.component';
import { FullScreenPageComponent } from './pages/full-screen-page/full-screen-page.component';
import { MarkersPageComponent } from './pages/markers-page/markers-page.component';
import { PropertiesPageComponent } from './pages/properties-page/properties-page.component';
import { ZoomRangePageComponent } from './pages/zoom-range-page/zoom-range-page.component';

(mapboxgl as any ).accessToken = 'pk.eyJ1IjoiY2F6ejE4MiIsImEiOiJjbG85MGdwNzUwNmg3MmtucW5hODc3eHFnIn0.Ny8fwQwIbo4QTjpoNaCOkQ';

@NgModule({
  declarations: [
    MiniMapComponent,
    SideMenuComponent,
    MapsLayoutComponent,
    FullScreenPageComponent,
    MarkersPageComponent,
    PropertiesPageComponent,
    ZoomRangePageComponent
  ],
  imports: [
    CommonModule,
    MapsRoutingModule
  ]
})
export class MapsModule { }
