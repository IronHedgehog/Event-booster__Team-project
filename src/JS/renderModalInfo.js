export default function renderModalInfo(name) {
  if (name.info == null) {
    name.info = 'no information';
  }
  if (name.dates.start.localDate === 'undefined') {
    name.dates.start.localDate = 'no information';
  }
  if (name.dates.start.localTime === 'undefined') {
    name.dates.start.localTime = 'no information';
  }
  if (name.priceRanges[0].min === 'undefined') {
    name.priceRanges[0].min = 'no information';
  }
  if (name.priceRanges[0].max === 'undefined') {
    name.priceRanges[0].max = 'no information';
  }

  const renderMarkup = `
  <div class="backdrop">
<div class="modal-js">
<button data-modal-close class="btn-modal-close">X<svg width="20"><use href="./img/sprite.svg#icon-close"></use></svg></button>
<div class="wrapper-image-small"><img  src="${name.images[3].url}" class="modal-image-small"></div>
<div class="modal-description">
<div class="wrapper-image-big">
<img src="${name.images[4].url}" class="modal-image-big"></div>
<div class="text-wrapper">
<h2 class="title">INFO</h2>
<div class="block-info"><p class="modal-text">${name.info}</p></div>
<h2 class="title">WHEN</h2>
<p class="modal-text">${name.dates.start.localDate}</p><p class="modal-text">${name.dates.start.localTime}</p>
<h2 class="title">WHERE</h2>
 <p class="modal-text">${name._embedded.venues[0].city.name}, ${name._embedded.venues[0].country.name}</p><p class="modal-text">${name._embedded.venues[0].name}</p>
<h2 class="title">WHO</h2>
<p class="modal-text">${name.name}</p>
<h2 class="title">PRICES</h2>
<p class="modal-text buy"><span>|||||</span> STANDART ${name.priceRanges[0].min} - ${name.priceRanges[0].max} ${name.priceRanges[0].currency}</p>
<a href="${name._embedded.venues[0].url}" target="_blank" class="modal-btn">BUY TICKET</a>
<p class="modal-text buy"><span>|||||</span> VIP ${name.priceRanges[0].min} - ${name.priceRanges[0].max} ${name.priceRanges[0].currency}</p>
<a href="${name._embedded.venues[0].url}" target="_blank" class="modal-btn modal-btn-vip">BUY TICKET</a></div></div>
<a href="${name.url}" target="_blank" class="modal-btn-more">MORE FROM THIS AUTHOR</a></div></div>
`;
  console.log(name);
  return renderMarkup;
}
