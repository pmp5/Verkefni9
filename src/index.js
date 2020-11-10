//Triple import for de people.
import { fetchEarthquakes } from './lib/earthquakes';
import { init } from './lib/map';
import { jardskjalftaGogninOkkar } from './lib/Gogninokkar';

document.addEventListener('DOMContentLoaded', async () => {
  // Allt connectings togetha
  const earthquakes = fetchEarthquakes();
  const listings = document.querySelector('.earthquakes');

  jardskjalftaGogninOkkar(listings, earthquakes);

  init('themap');
});
