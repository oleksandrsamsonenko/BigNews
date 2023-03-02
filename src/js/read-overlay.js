// setTimeout(() => {
//   if (!localStorage.getItem('id')) {
//     return console.log(`ніц нема`);
//   }
//   console.log(`шось є`);
//   //   console.log(JSON.parse(localStorage.getItem('read')));
//   const articleOverlay = document.querySelectorAll('.read-overlay');
//   articleOverlay.forEach(item => {
//     // console.log(item.dataset.id);
//     // if (
//     // JSON.parse(localStorage.getItem('read')).forEach(arrEl => {
//     //   JSON.parse(localStorage.getItem(arrEl)).find(element => {
//     //     if (element.id === item.dataset.id) {
//     //       console.log(document.querySelector(`div[data-id=${element.id}]`));
//     //       document
//     //         .querySelector(`div[data-id=${element.id}]`)
//     //         .classList.add(`overlay-shown`);
//     //     }
//     //   });
//     // });
//     // console.log(localStorage.getItem(`id`));
//     // console.log(JSON.parse(localStorage.getItem(`id`)));

//     JSON.parse(localStorage.getItem(`id`)).find(element => {
//       //   console.log(element, `--->`, item.dataset.id);
//       if (element === item.dataset.id) {
//         // console.log(document.querySelector(`div[data-id=${element}]`));
//         document
//           .querySelector(`div[data-id=${element}]`)
//           .classList.add(`overlay-shown`);
//         // console.log(`<-------------------->`);
//       }
//     });
//   });
// }, 600);

// if (!localStorage.getItem('id')) {
//   return console.log(`ніц нема`);
// }
// console.log(`шось є`);
// const articleOverlay = document.querySelectorAll('.read-overlay');
// articleOverlay.forEach(item => {
//   JSON.parse(localStorage.getItem(`id`)).find(element => {
//     if (element === item.dataset.id) {
//       document
//         .querySelector(`div[data-id=${element}]`)
//         .classList.add(`overlay-shown`);
//     }
//   });
// });
