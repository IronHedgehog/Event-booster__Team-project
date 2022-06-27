import 'animate.css';

export default function renderMarkupCards(events) {
  const markup = events
    .map(event => {
      if (event._embedded.venues[0].name === undefined) {
        event._embedded.venues[0].name = 'no info';
      }
      return `
    <div class='photo-card animate__animated animate__zoomIn' data-div='event' data-id='${event.id}'>
    <div class="wraper">
    <img
      class='img'
      src='${event.images[0].url}'
      alt=''
      loading='lazy'
    />
    </div>
    <div class='info'>
      <p class='info-item-name'>
        <b><span>${event.name}</span></b>
      </p>
      <p class='info-item-lokal'>
        <span>${event.dates.start.localDate}</span>
      </p>
      <p class='info-item-address'>
        <b><span> &#127757; ${event._embedded.venues[0].name}</span></b>
      </p>
    </div>
  </div>
    `;
    })
    .join('');
  return markup;
}
