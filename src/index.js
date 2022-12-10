import axios from 'axios';
import './css/styles.css';

import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  searchForm: document.querySelector('.search-form'),
  btnLoad: document.querySelector('.load-more'),
  galleryList: document.querySelector('.gallery'),
  btnLoad: document.querySelector('.load-more'),
};

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '31896659-81553961a7b9df3ddcf5b8803';

let page = 1;
let request = '';
let total = 0;

async function fetchSearch(request, page) {
  const searchParams = new URLSearchParams({
    key: KEY,
    q: `${request}`,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
    page: `${page}`,
  });
  const response = await axios.get(`${BASE_URL}?${searchParams}`);

  return response.data;
}

refs.searchForm.addEventListener('submit', onSearch);

function onSearch(evt) {
  evt.preventDefault();
  request = evt.target.elements.searchQuery.value;
  refs.galleryList.innerHTML = '';
  page = 1;

  if (!evt.target.elements.searchQuery.value) {
    Notiflix.Notify.failure('Sorry, empty string');
    refs.galleryList.innerHTML = '';
    refs.btnLoad.classList.add('load');
    return;
  }

  eventsUse(request, page);
}

function eventsUse(request, page) {
  fetchSearch(request, page).then(data => {
    const events = data.hits;
    createMarkupList(events);
    refs.btnLoad.classList.remove('load');
    total += data.hits.length;

    console.log(total);

    console.log(data.totalHits);
    console.log(events);

    if (data.total == 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      refs.galleryList.innerHTML = '';
      refs.btnLoad.classList.add('load');

      return
    }
    if (total < Number(data.totalHits)) {
      refs.btnLoad.classList.remove('load')
    }
     else  {
      Notiflix.Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
      refs.btnLoad.classList.add('load');

      return
    }
  })
  .catch(err => {
            console.log(err);
        })
}

function createMarkupList(arr) {
  const markupCard = arr
    .map(
      item => `<div class="photo-card">
  <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy"  width="350" height="350" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b> ${item.likes}
    </p>
    <p class="info-item">
      <b>Views</b> ${item.views}
    </p>
    <p class="info-item">
      <b>Comments</b> ${item.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b> ${item.downloads}
    </p>
  </div>
</div>`
    )
    .join('');
  refs.galleryList.insertAdjacentHTML('beforeend', markupCard);
}

refs.btnLoad.addEventListener('click', onBtnLoadClick);

function onBtnLoadClick() {
  page += 1;
  eventsUse(request, page);
}
