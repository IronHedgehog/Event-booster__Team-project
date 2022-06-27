import axios from 'axios';
import Notiflix from 'notiflix';
import { debounce } from 'debounce';
import fetchImages from './input';
import { paginationMarkup } from './pagination';
import renderMarkupCards from './renderMarkupCards';

const refs = {
  headerForm: document.querySelector('.header__form'),
  searchingInput: document.querySelector('.header__form--input'),
  countryInput: document.querySelector('.header__form--input1'),
  gallery: document.querySelector('.gallery'),
  selectCountry: document.querySelectorAll('#selectCountries'),
  pageCount: document.querySelector('.pagination'),
};
let page = 0;
refs.pageCount.addEventListener('click', e => {
  e.preventDefault();
  if (e.target.nodeName !== 'A') return;
  if (e.target.classList.contains('active')) {
    e.preventDefault();
    return;
  }
  const searchingInput = refs.searchingInput.value;
  const countryInput = refs.countryInput.value;
  const optionPagination = {
    showStart: false,
    showEnd: false,
    baseTag: 'a',
    link: 'https://app.ticketmaster.com/discovery/v2//events.json?apikey=bdHFOjAkpUBvne7gzKAkA6SZNtgLzUV4&page=',
    baseClass: 'pageCount',
    query: `countryCode=${countryInput}&keyword=${searchingInput}`,
  };
  const data = e.target.href;
  fetch(data)
    .then(response => response.json())
    .then(({ _embedded, page }) => {
      e.preventDefault();
      refs.gallery.innerHTML = renderMarkupCards(_embedded.events);
      if (page.totalPages > 50) {
        page.totalPages = 50;
      }
      refs.pageCount.innerHTML = paginationMarkup(
        page.totalPages,
        page.number + 1,
        optionPagination,
      );
    });
});
const countryInput = refs.countryInput.value;
refs.headerForm.addEventListener('input', debounce(onInput, 500));
function onInput(event) {
  event.preventDefault();
  const searchingInput = refs.searchingInput.value;
  const countryInput = refs.countryInput.value;

  fetchImages(searchingInput, countryInput, page)
    .then(({ _embedded, page }) => {
      refs.gallery.innerHTML = renderMarkupCards(_embedded.events);
      const optionPagination = {
        showStart: false,
        showEnd: false,
        baseTag: 'a',
        link: 'https://app.ticketmaster.com/discovery/v2//events.json?apikey=bdHFOjAkpUBvne7gzKAkA6SZNtgLzUV4&page=',
        baseClass: 'pageCount',
        query: `countryCode=${countryInput}&keyword=${searchingInput}`,
      };
      if (page.totalPages > 50) {
        page.totalPages = 50;
      }

      const renderPageMarkup = paginationMarkup(page.totalPages, page.number + 1, optionPagination);
      refs.pageCount.innerHTML = renderPageMarkup;

      // refs.gallery.innerHTML = renderMarkupCards(_embedded.events);
    })
    .catch(err => {
      if ((err = "Cannot read properties of undefined (reading 'events'")) {
        Notiflix.Notify.failure('nothing here');
        // refs.gallery.innerHTML = '';
        // refs.selectCountry.value = '';
        // refs.pageCount.innerHTML = '';
      }
    });
}
