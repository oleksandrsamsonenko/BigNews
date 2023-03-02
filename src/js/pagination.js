import axios from 'axios';
const numberOfPagination = document.querySelector('.pagination__list');
const API_KEY = 'RX66xbpKTOQTP8uW8ejKF6pod0BTlz7b';
const BASE_URL = `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${API_KEY}`;
async function getFetch() {
  try {
    const response = await axios.get(`${BASE_URL}`);
    localStorage.setItem('zxc', JSON.stringify(response.data.results));
    return response.data.results;
  } catch (error) {
    console.log(error);
  }
}
numberOfPagination.addEventListener('click', e => {
  if (e.target.nodeName !== 'A') {
    return;
  }
});
getFetch().then(data => createMarkup(data));
function createMarkup() {
  const asd = JSON.parse(localStorage.getItem('zxc'));
  const asd1 = asd.slice(0, 8);
  const asd2 = asd.slice(8, 17);
  const asd3 = asd.slice(17, asd.length);

  // console.log(asd1);
  const firstPage = asd1.map(item => {
    // console.log(item.abstract);
    item.abstract === '' ? item.abstract === '123' : item.abstract;
    // return `<li class="images">
    //       <img  class="news-list__img" src="${item.media[0]['media-metadata'][0].url}" alt="" width="288px" height="395px" />
    //       <p class="news-list__category">${item.nytdsection}</p>
    //       <button class="img-btn favorite-false " data-id="${item.uri}"  >Add to favorite </button>
    //       <h2 class="description-title">${itemTitle}</h2>
    //       <p class="description-of-news">${description}</p>
    //       <div class="info-more">
    //         <p class="date">${getTime}</p>
    //         <a
    //           class="read-more-link"
    //           href="${item.url}"
    //           target="_blank"
    //           rel="noopener noreferrer"
    //         >
    //           Read more
    //         </a>
    //       </div>
    //     </li>`;
  });
}
