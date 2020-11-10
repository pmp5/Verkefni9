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

const URL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson';
// const URL = './4.5_week.geojson';

export async function fetchEarthquakes() {
  // TODO Sækja gögn frá URL, setja upp villumeðhöndlun og skila
  // athuga hvort data sé í lagi
  return fetch(URL)
  .then((result) => {
    if (!result.ok) {
      throw new Error('Non 200 status');
    }
    return result.json();
  })
  .then((data) => data.features)
  .catch((error) => console.error(error));
}
