import notFound from '../img/not-found.png';
const savedNews = document.querySelector('.saved-news');

function createMarkup() {
  if (!localStorage.getItem('savedNews')) {
    return (savedNews.innerHTML = `<div class="not-found__box"><p class="not-found__text">You have no saved news</p>
  <img class="not-found__img" src="${notFound}" alt="News not found" width="288px" height="198px" /></div>`);
  }

  const markup = JSON.parse(localStorage.getItem('savedNews'))
    .map(item => {
      let itemTitle;
      if (item.h2.length > 50) {
        itemTitle = item.h2.slice(0, 46) + '...';
      } else {
        itemTitle = item.h2;
      }
      return `<li class="images">
          <img src="${item.img}" alt="" width="288px" height="395px" class="news-list__img"/>
          <p class="news-list__category">${item.category}</p>
          <button class="img-btn favorite-true"  data-id="${item.uri}">Remove from favorite</button>
          <h2 class="description-title">${itemTitle}</h2>
          <p class="description-of-news">${item.description}</p>
          <div class="info-more">
            <p class="date">${item.date}</p>
            <a
              class="read-more-link"
              href="${item.href}"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read more
            </a>
          </div>
        </li>`;
    })
    .join('');
  savedNews.innerHTML = markup;
}

createMarkup();

savedNews.addEventListener('click', e => {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }
  const superNewObj = JSON.parse(localStorage.getItem('savedNews')).filter(
    item => item.uri !== e.target.dataset.id
  );

  localStorage.removeItem('savedNews');
  localStorage.setItem('savedNews', JSON.stringify(superNewObj));
  if (JSON.parse(localStorage.getItem(`savedNews`)).length < 1) {
    localStorage.removeItem('savedNews');
  }
  createMarkup();
});
