import Map from '../src/ol/Map.js';
import View from '../src/ol/View.js';
import {defaults as defaultControls} from '../src/ol/control.js';
import MousePosition from '../src/ol/control/MousePosition.js';
import _ol_coordinate_ from '../src/ol/coordinate.js';
import TileLayer from '../src/ol/layer/Tile.js';
import OSM from '../src/ol/source/OSM.js';

const mousePositionControl = new MousePosition({
  coordinateFormat: _ol_coordinate_.createStringXY(4),
  projection: 'EPSG:4326',
  // comment the following two lines to have the mouse position
  // be placed within the map.
  className: 'custom-mouse-position',
  target: document.getElementById('mouse-position'),
  undefinedHTML: '&nbsp;'
});

const map = new Map({
  controls: defaultControls({
    attributionOptions: {
      collapsible: false
    }
  }).extend([mousePositionControl]),
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  target: 'map',
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});

const projectionSelect = document.getElementById('projection');
projectionSelect.addEventListener('change', function(event) {
  mousePositionControl.setProjection(event.target.value);
});

const precisionInput = document.getElementById('precision');
precisionInput.addEventListener('change', function(event) {
  const format = _ol_coordinate_.createStringXY(event.target.valueAsNumber);
  mousePositionControl.setCoordinateFormat(format);
});
