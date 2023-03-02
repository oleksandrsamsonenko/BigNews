import axios from 'axios';
import { createMarkup } from './markup';
import notFound from '../img/not-found.png';
import throttle from 'lodash.throttle';
import { addAlreadyReadMarkup } from './markup';

const API_KEY = 'RX66xbpKTOQTP8uW8ejKF6pod0BTlz7b';
const BASE_URL = 'https://api.nytimes.com/svc/news/v3/content/inyt/';

const boxEl = document.querySelector('.filter-box');
let arrForMarkup = [];
export const newsListEl = document.querySelector('.news__list');

boxEl.addEventListener('click', handleSelectClick);

window.onresize = throttle(handleScreenWidthCange, 500);

getFetchCategories().then(data => {
  createFilterMarkup(data);
});

function handleScreenWidthCange(e) {
  createFilterMarkup(arrForMarkup);
}

function handleSelectClick(e) {
  const listEl = document.querySelector('.filter-list');
  // const mainBtn = document.querySelector('[data-value="categories"]')
  if (!e.target.dataset.value) {
    return;
  }
  if (
    e.target.dataset.value === 'categories' ||
    e.target.dataset.value === 'others'
  ) {
    listEl.classList.toggle('visually-hidden');
    return;
  }

  getСategoryNameFetch(e.target.dataset.value).then(data => {
    if (!data) {
      createNotFoundMarkup();
      return;
    }
    listEl.classList.add('visually-hidden');
    // mainBtn.textContent = e.target.textContent
    createMarkup(data);
    addAlreadyReadMarkup();
  });
}

async function getСategoryNameFetch(categoryName) {
  try {
    const response = await axios.get(
      `https://api.nytimes.com/svc/news/v3/content/inyt/${categoryName}.json?api-key=RX66xbpKTOQTP8uW8ejKF6pod0BTlz7b&fq=field-name:("title", "section", "url", "published_date", "multimedia")`
    );
    // console.log(response);
    return response.data.results;
  } catch (error) {
    console.log(error);
  }
}

async function getFetchCategories() {
  try {
    const response = await axios.get(
      `https://api.nytimes.com/svc/news/v3/content/section-list.json?api-key=RX66xbpKTOQTP8uW8ejKF6pod0BTlz7b`
    );
    const arrey = response.data.results;
    arrForMarkup.push(...arrey);
    return arrey;
  } catch (error) {
    console.log(error);
  }
}

function createFilterMarkup(arr) {
  let categoriesArr;
  let btnArr;
  let markup;

  if (window.innerWidth >= 1280) {
    btnArr = arr
      .map((item, index) => {
        if (index <= 5) {
          return `<li><button class="filter-btn" data-value="${item.section}">${item.display_name}</button></li>`;
        } else {
          return;
        }
      })
      .join('');
    categoriesArr = arr
      .map((item, index) => {
        if (index > 5) {
          return `<li class="filter-item" data-value="${item.section}">${item.display_name}</li>`;
        } else {
          return;
        }
      })
      .join('');

    markup = `<ul class="filter-btn-list">${btnArr}</ul>
    <div><button class="filter-dropdowv-btn" data-value="others">Others</button>
    <ul class="filter-list visually-hidden">${categoriesArr}</ul></div>`;
  } else if (window.innerWidth >= 768 && window.innerWidth < 1280) {
    btnArr = arr
      .map((item, index) => {
        if (index <= 3) {
          return `<li><button class="filter-btn" data-value="${item.section}">${item.display_name}</button></li>`;
        } else {
          return;
        }
      })
      .join('');
    categoriesArr = arr
      .map((item, index) => {
        if (index > 3) {
          return `<li class="filter-item" data-value="${item.section}">${item.display_name}</li>`;
        } else {
          return;
        }
      })
      .join('');

    markup = `<ul class="filter-btn-list">${btnArr}</ul>
    <div><button class="filter-dropdowv-btn" data-value="others">Others</button>
    <ul class="filter-list visually-hidden">${categoriesArr}</ul></div>`;
  } else {
    categoriesArr = arr
      .map(item => {
        return `<li class="filter-item" data-value="${item.section}">${item.display_name}</li>`;
      })
      .join('');
    markup = `<button class="filter-dropdowv-btn" data-value="categories">Categories</button>
      <ul class="filter-list visually-hidden">${categoriesArr}</ul>`;
  }

  boxEl.innerHTML = markup;
}

function createNotFoundMarkup() {
  const markup = `<div class="not-found__box"><p class="not-found__text">We haven’t found news from this category</p>
  <img class="not-found__img" src="${notFound}" alt="News not found" width="248px" height="198px" /></div>`;
  newsListEl.innerHTML = markup;
  document.querySelector(`.weather`).innerHTML = ``;
}
