import {Component, HostListener, OnInit} from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import {defaults as defaultControls, Attribution, MousePosition} from 'ol/control';
import Geolocation from 'ol/Geolocation';
import Feature from 'ol/Feature';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
import {createStringXY} from 'ol/coordinate';

@Component({
  selector: 'app-mapa-local',
  templateUrl: './mapa-local.component.html',
  styleUrls: ['./mapa-local.component.scss']
})
export class MapaLocalComponent implements OnInit {

  map: Map;

  attribution: Attribution;
  geolocation: Geolocation;
  view: View;
  positionFeature: Feature;
  mousePositionControl: MousePosition;

  constructor() {
    this.attribution = new Attribution({
      collapsible: false
    });
  }

  ngOnInit(): void {
    this.getMousePosition();
    this.initMap();
  }

  initMap() {
    this.map = new Map({
      controls: defaultControls({attribution: false}).extend([this.mousePositionControl]),
      target: 'mapa',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: [0, 0],
        zoom: 2
      })
    });
  }

  getMousePosition() {
    this.mousePositionControl = new MousePosition({
      coordinateFormat: createStringXY(4),
      projection: 'EPSG:4326',
      // comment the following two lines to have the mouse position
      // be placed within the map.
      className: 'custom-mouse-position',
      target: document.getElementById('mouse-position'),
      undefinedHTML: '&nbsp;',
    });
  }


  getFeature() {
    this.positionFeature = new Feature();
    this.positionFeature.setStyle(
        new Style({
          image: new CircleStyle({
            radius: 6,
            fill: new Fill({
              color: '#3399CC',
            }),
            stroke: new Stroke({
              color: '#fff',
              width: 2,
            }),
          }),
        })
    );
  }

  @HostListener('window:resize', ['$event'])
  checkSize() {
    const small = this.map.getSize()[0] < 600;
    this.attribution.setCollapsible(small);
    this.attribution.setCollapsed(small);
  }



}
