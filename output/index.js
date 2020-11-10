import L from 'leaflet';
import { format } from 'date-fns';

/**
 * Sækja gögn frá
 * https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php
 * 
 * sér í lagi, alla jarðskjálfta 4,5+ seinustu 7 daga:
 * https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson
 * 
 * Ath, í verkefni er afrit af gögnum í `./4.5_week.geojson`, gott
 * að nota það á meðan þróun stendur en skipta svo út.
 */
const URL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson'; // const URL = './4.5_week.geojson';

async function fetchEarthquakes() {
  // TODO Sækja gögn frá URL, setja upp villumeðhöndlun og skila
  // athuga hvort data sé í lagi
  fetch(URL).then(result => {
    if (!result.ok) {
      throw new Error('Non 200 status');
    }

    return result.json();
  }).then(data => data.features).catch(error => console.error(error));
}

/**
 * Create an element with attributes and events, and append elements or
 * strings to it.
 * 
 * Usage:
 *  const el = element(
 *    'button',
 *    { 'class': 'button' },
 *    { click: () => { ... } },
 *    'Takki'
 *   );
 *  returns
 *  <button class="button">Takki</button> with a click handler.
 * 
 * @param {string} name Element name
 * @param {object} attributes Object containing attributes to attach to element.
 * @param {object} events Object of events to add to element.
 * @param  {...any} children List of elements or strings to append to element.
 * @returns {object} HTML element.
 */

function element(name, attributes = null, events = null, ...children) {
  const el = document.createElement(name);

  for (const child of children) {
    if (!child) {
      continue;
    }

    if (attributes) {
      for (const attrib in attributes) {
        el.setAttribute(attrib, attributes[attrib]);
      }
    }

    if (events) {
      for (const event in events) {
        el.addEventListener(event, events[event]);
      }
    }

    if (typeof child === 'string') {
      el.appendChild(document.createTextNode(child));
    } else {
      el.appendChild(child);
    }
  }

  return el;
}
/**
 * Simplified element function.
 * Creates an element and append elements or strings to it.
 * 
 * @param {string} name Element name
 * @param  {...any} children List of elements or strings to append to element.
 * @returns {object} HTML element.
 */

function el(name, ...children) {
  return element(name, null, null, ...children);
}
/**
 * Format a timestamp as dd.mm.yyyy hh:mm:ss e.g. "01.11.2020 12:00:00".
 * 
 * @param {number} timestamp Unix timestamp to format
 * @returns {string} Formatted string.
 */

function formatDate(timestamp) {
  return format(timestamp, 'dd.MM.y HH:mm:ss'); // TODO Útfæra með „vanilla JS“ eða nota date-fns pakka
}

let map; // Býr til popup á korti út frá geojson með content

function createPopup(geojson) {
  // TODO
  const a = geojson.geometry.coordinates[1];
  const b = geojson.geometry.coordinates[0];
  return L.marker([a, b]).addTo(map).bindPopup(el('div', el('h2', geojson.properties.title), el('p', `${formatDate(geojson.properties.time)}`), element('a', {
    href: geojson.properties.url,
    target: '_blank'
  }, {}, 'Sjá nánar')));
} // Býr til Leaflet kort og setur miðju á (0, 0) í zoom level 2

function init(id) {
  // TODO
  map = L.map(id).setView([0.00, 0.00], 2); // Bætum við "tiles" frá OSM sem eru open source. Gætum líka
  // notað frá Google, mapbox eða fleirum en þyrftum þá aðgang

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
  }).addTo(map);
}

async function jardskjalftaGogn(ul, earthquakes) {
  earthquakes.then(Jardskjalftafylki => {
    Jardskjalftafylki.forEach(Jardskjalfta => {
      const marker = createPopup(Jardskjalfta); // nota appendChild!!!

      ul.appendChild(el('li', el('div', el('h2', Jardskjalfta.properties.title), el('dl', el('dt', 'Tími'), el('dd', `${formatDate(Jardskjalfta.properties.time)}`), el('dt', 'Styrkur'), el('dd', `${Jardskjalfta.properties.mag} á richter`)), el('div', element('button', {
        class: 'buttons'
      }, {
        click: () => {
          marker.openPopup();
        }
      }, 'Sjá á korti'), element('a', {
        href: Jardskjalfta.properties.url,
        target: '_blank'
      }, {}, 'Skoða nánar')))));
    });
    document.querySelector('.earthquakes-container').removeChild(document.querySelector('.loading'));
  });
}

// importa öðru sem þarf...
document.addEventListener('DOMContentLoaded', async () => {
  // Hér er allt „vírað“ saman
  const earthquakes = fetchEarthquakes();
  const List = document.querySelector('.earthquakes');
  jardskjalftaGogn(List, earthquakes);
  init('themap');
});
