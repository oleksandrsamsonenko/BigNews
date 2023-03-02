let today = new Date();
const date =
  today.getDate() < 10
    ? today.getDate().toString().padStart(2, 0)
    : today.getDate();
const month =
  today.getMonth() < 10
    ? (today.getMonth() + 1).toString().padStart(2, 0)
    : today.getMonth() + 1;
const year = today.getFullYear();
const dateNow = `${date}/${month}/${year}`;

const readWrapperEl = document.querySelector('.read-wrapper');

if (localStorage.getItem('read')) {
  updateMarkup();
}

readWrapperEl.addEventListener('click', handleHideBtnClick);
readWrapperEl.addEventListener('click', handleReadMoreBtnClick);

function updateMarkup() {
  const localKeyArr = JSON.parse(localStorage.getItem('read'));
  localKeyArr
    .sort((prev, next) => prev.localeCompare(next))
    .forEach(element => {
      const dateNews = element;
      const localNewsArr = JSON.parse(localStorage.getItem(`${element}`));
      createMarkupFromLocal(localNewsArr, dateNews);
    });
}

function createMarkupFromLocal(newsArrey, newsArrDate) {
  let itemMarkup = '';
  let idFromLocal = [];

  const liMarkup = newsArrey
    .map(item => {
      if (localStorage.getItem('already read id')) {
        idFromLocal = JSON.parse(localStorage.getItem('already read id'));
      }

      if (idFromLocal.includes(item.id)) {
        itemMarkup = ' overlay-shown';
      } else {
        itemMarkup = '';
      }
      return ` <li class="images read-item">
    <img class="news-list__img" src="${
      item.imgUrl
    }" alt="" width="288px" height="395px" />
    <p class="news-list__category">${item.category}</p>
    <button class="img-btn favorite-false" data-id="${
      item.id
    }">Add to favorite</button>
    <h2 class="description-title">${item.title}</h2>
    <p class="description-of-news">${item.descr}</p>
    <div class="info-more">
      <p class="date" data-date="${item.dateKey}">${item.date}</p>
      <a class="already-read-link" href="${
        item.originUrl
      }" target="_blank" rel="noopener noreferrer">Read more</a>
    </div>
    <div class="read-overlay${itemMarkup}" data-id="${item.id.slice(
        14,
        22
      )}"><p class="overlay-read-text">Have read</p></div>
    </li>`;
    })
    .join('');

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
  const markup = `<div class="read-list-box">
    <div class="read-box-inner">
    <p class="read-date">${newsArrDate}</p>
    <button class="read-btn roll-down">
    </button></div>
    <ul class="news__list read-list">${liMarkup}</ul></div>`;
  readWrapperEl.insertAdjacentHTML('beforeend', markup);
}

function handleHideBtnClick(e) {
  if (!e.target.classList.contains('read-btn')) {
    return;
  }

  if (e.target.classList.contains('roll-down')) {
    e.target.parentNode.nextElementSibling.classList.add('visually-hidden');
    e.target.classList.remove('roll-down');
    e.target.classList.add('roll-up');
    return;
  }

  if (e.target.classList.contains('roll-up')) {
    e.target.parentNode.nextElementSibling.classList.remove('visually-hidden');
    e.target.classList.remove('roll-up');
    e.target.classList.add('roll-down');
  }
}

function handleReadMoreBtnClick(e) {
  if (e.target.classList.contains('already-read-link')) {
    const newsId = e.target.parentNode.parentNode.children[2].dataset.id;

    if (localStorage.getItem(`already read id`)) {
      const idFromLocal = JSON.parse(localStorage.getItem(`already read id`));
      idFromLocal.push(newsId);
      localStorage.setItem('already read id', JSON.stringify(idFromLocal));
    } else {
      const idToLocal = [];
      idToLocal.push(newsId);
      localStorage.setItem('already read id', JSON.stringify(idToLocal));
    }

    const newsReadingDate = e.target.previousElementSibling.dataset.date;
    const localArr = JSON.parse(localStorage.getItem(`${newsReadingDate}`));
    const newsItem = localArr.find(item => item.id === newsId);
    const indexOfNews = localArr.indexOf(newsItem);

    localArr.splice(indexOfNews, 1);
    localStorage.setItem(`${newsReadingDate}`, JSON.stringify(localArr));
    newsItem.dateKey = dateNow;

    if (localStorage.getItem(`${dateNow}`)) {
      const fromLocal = JSON.parse(localStorage.getItem(`${dateNow}`));
      fromLocal.push(newsItem);
      localStorage.setItem(`${dateNow}`, JSON.stringify(fromLocal));
      readWrapperEl.innerHTML = '';
      updateMarkup();
    } else {
      localStorage.setItem(`${dateNow}`, JSON.stringify(newsItem));
      readWrapperEl.innerHTML = '';
      updateMarkup();
    }
  }
}
