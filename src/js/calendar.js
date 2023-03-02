import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import axios from 'axios';
import { createValueMarkup, addAlreadyReadMarkup } from './markup';

const inputCalendarEl = document.querySelector('.calendar-inp');
const svgOpenEl = document.querySelector('.svg-open-calendar');
const inputEl = document.querySelector('.search-input');
const KEY = 'RX66xbpKTOQTP8uW8ejKF6pod0BTlz7b';
const value = inputEl.value;
let day;
let year;
let month;
const options = {
  disableMobile: 'true',
  dateFormat: 'd/m/Y',
  defaultDate: new Date(),
  onClose(selectedDates) {
    svgOpenEl.classList.remove('is-rotate-svg');
    const selectedDate = selectedDates[0];
    day = String(selectedDate.getDate()).padStart(2, '0');
    month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    year = selectedDate.getFullYear();

    getNewsByDate(inputEl.value).then(data => {
      createValueMarkup(data);
      addAlreadyReadMarkup();
    });
  },
  onOpen() {
    svgOpenEl.classList.add('is-rotate-svg');
  },
};
// Вызов библиотеки чтоб в инпуте появился календарь
flatpickr(inputCalendarEl, options);

async function getNewsByDate(value) {
  try {
    const res =
      await axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${value}&api-key=${KEY}&facet_fields=section_name&facet_filter=true&begin_date=${year}${month}${day}&end_date=${year}${month}${day}
`);
    return res.data.response;
  } catch (error) {
    console.log(error);
  }
}

// function createMarkupByDate(news) {
//     const markup = news.map(item => {
//     })

// }
