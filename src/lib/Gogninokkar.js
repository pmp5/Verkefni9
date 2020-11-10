
import { el, element, formatDate } from './utils';
import { createPopup } from './map';


export async function jardskjalftaGogninOkkar(ul, earthquakes) {
    earthquakes.then((earthquakeArrayings) => {
        earthquakeArrayings.forEach((earthquake) => {
            const marker = createPopup(earthquake);
            // Þarf að nota appenchild
            ul.appendChild(
                el('li',
                    el('div',
                        el('h2', earthquake.properties.title),
                        el('dl',
                            el('dt', 'Tími'),
                            el('dd', `${formatDate(earthquake.properties.time)}`),
                            el('dt', 'Styrkur'),
                            el('dd', `${earthquake.properties.mag} á richter`)),
                        el('div',
                            element('button', { class: 'buttons' },
                            { click: () => { marker.openPopup(); } },
                            'Sjá á korti'),
                        element('a', { href: earthquake.properties.url, target: '_blank' }, {}, 'Skoða nánar')))),
              );
            });
            document.querySelector('.earthquakes-container').removeChild(document.querySelector('.loading'));
          });
      }