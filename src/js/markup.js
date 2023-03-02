import axios from 'axios';
import placeholder from '../img/placeholder.png';
import notFound from '../img/not-found.png';
import { getWeatherCoords } from './weather';

const newsList = document.querySelector('.news__list');
const inputEl = document.querySelector('.search-form');
const markupValue = document.querySelector('.search-input');

const API_KEY = 'RX66xbpKTOQTP8uW8ejKF6pod0BTlz7b';
const BASE_URL = `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${API_KEY}`;

async function getFetch() {
  try {
    const response = await axios.get(`${BASE_URL}`);
    return response.data.results;
  } catch (error) {
    console.log(error);
  }
}

getFetch()
  .then(data => createMarkup(data))
  .then(e => addAlreadyReadMarkup());
export function createMarkup(arr) {
  const markup = arr
    .map(item => {
      const date = new Date(item.published_date);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const getTime = `${day} / ${month} / ${date.getFullYear()}`;
      let imgUrl;
      let description;
      let category;

      let itemTitle;
      if (item.title.length > 50) {
        itemTitle = item.title.slice(0, 46) + '...';
      } else {
        itemTitle = item.title;
      }

      if (item.multimedia) {
        imgUrl =
          item.multimedia.length === 0 ? placeholder : item.multimedia[2].url;
        description =
          item.multimedia.length === 0
            ? 'Sorry, this article has no description'
            : item.multimedia[0].caption;
        category = item.section;
      } else {
        imgUrl =
          item.media.length === 0
            ? placeholder
            : item.media[0]?.['media-metadata'][2].url;
        description =
          item.media.length === 0 || item.media[0].caption === ''
            ? 'Sorry, this article has no description'
            : item.media[0].caption;
        category = item.nytdsection;
      }
      setTimeout(() => {
        if (!localStorage.getItem('savedNews')) {
          return;
        }
        const favoriteBtn = document.querySelectorAll('.img-btn');
        favoriteBtn.forEach(item => {
          if (
            JSON.parse(localStorage.getItem('savedNews')).find(elem => {
              return elem.uri === String(item.dataset.id);
            })
          ) {
            item.classList.add('favorite-true');
            item.classList.remove('favorite-false');
            item.textContent = 'Remove from favorite';
          }
        });
      }, 500);

      if (description.length > 130) {
        description = description.slice(0, 127) + '...';
      } else {
        description = description;
      }

      return `<li class="images">
          <img  class="news-list__img" src="${imgUrl}" alt="" width="288px" height="395px" />
          <p class="news-list__category">${category}</p>
          <button class="img-btn favorite-false " data-id="a${item.uri.slice(
            14,
            22
          )}"  >Add to favorite </button>
          <h2 class="description-title">${itemTitle}</h2>
          <p class="description-of-news">${description}</p>
          <div class="info-more">
            <p class="date">${getTime}</p>
            <a
              class="read-more-link"
              href="${item.url}"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read more
            </a>
          </div>
          <div class="read-overlay" data-id="a${item.uri.slice(
            14,
            22
          )}"><p class="overlay-text">Already read<p></div>
        </li>`;
    })
    .join('');
  getWeatherCoords();

  newsList.innerHTML = markup;
}

async function getValueFetch(value) {
  try {
    const fullfield = await axios.get(
      `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${value}&api-key=${API_KEY}&facet_fields=section_name
&facet_filter=true&begin_date=20150101`
    );

    return fullfield.data.response;
  } catch (error) {
    console.log(error);
  }
}

inputEl.addEventListener('submit', handleInput);
function handleInput(e) {
  e.preventDefault();

  getValueFetch(markupValue.value).then(data => {
    createValueMarkup(data);
    addAlreadyReadMarkup();
  });
}

export function createValueMarkup(e) {
  if (e.docs.length === 0) {
    document.querySelector(`.weather`).innerHTML = ``;
    return (newsList.innerHTML = `<div class="not-found__box"><p class="not-found__text">We haven’t found news from this category</p>
  <img class="not-found__img" src="${notFound}" alt="News not found" width="288px" height="198px" /></div>`);
  }
  const valueMarkup = e.docs
    .map(item => {
      const date = new Date(item.pub_date);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const getTime = `${day} / ${month} / ${date.getFullYear()}`;
      const inputImg =
        item.multimedia.length === 0 ? '' : item.multimedia[0].url;
      let itemTitle;
      if (item.headline.main.length > 50) {
        itemTitle = item.headline.main.slice(0, 46) + '...';
      } else {
        itemTitle = item.headline.main;
      }
      if (item.abstract.length > 130) {
        item.abstract = item.abstract.slice(0, 127) + '...';
      } else {
        item.abstract = item.abstract;
      }
      return `<li class="images">
          <img class="news-list__img"
            src="https://static01.nyt.com/${inputImg}"
            alt=""
            width="288px"
            height="395px"
          />
          <p class="news-list__category">${item.section_name}</p>
          <button class="img-btn favorite-false"  data-id="a${item.uri.slice(
            14,
            22
          )}">
            Add to favorite
          </button>
          <h2 class="description-title">${itemTitle}</h2>
          <p class="description-of-news">${item.abstract}</p>
          <div class="info-more">
            <p class="date-of-news">${getTime}</p>
            <a
              class="read-more-link"
              href="${item.web_url}"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read more
            </a>
          </div>
          <div class="read-overlay" data-id="a${item.uri.slice(
            14,
            22
          )}"><p class="overlay-text">Already read</p></div>
        </li>`;
    })
    .join('');
  newsList.innerHTML = valueMarkup;
  getWeatherCoords();
}

export function addAlreadyReadMarkup() {
  if (!localStorage.getItem('id')) {
    return 
  }
  
  const articleOverlay = document.querySelectorAll('.read-overlay');
  articleOverlay.forEach(item => {
    JSON.parse(localStorage.getItem(`id`)).find(element => {
      if (element === item.dataset.id) {
        document
          .querySelector(`div[data-id=${element}]`)
          .classList.add(`overlay-shown`);
      }
    });
  });
}
