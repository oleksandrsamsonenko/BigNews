const toggles = document.querySelectorAll('.toggle');   

let themeKey = localStorage.getItem("themeKey")|| 'light';

const body = document.querySelector('body');
const svgLight = document.querySelector('.svg__light');
const svgDark = document.querySelector('.svg__dark');

const svgSun = document.querySelector('.svg__sun');
const svgMoon = document.querySelector('.svg__moon');

const sunT = document.querySelector('.svg__toggle__sun');
const moonT = document.querySelector('.svg__toggle__moon');


const inputT = document.querySelector('.input__theme');

const svgLupa = document.querySelector('.lupa__theme');
const svgMenu = document.querySelector('.menu__theme');
const svgX = document.querySelector('.x__theme');

const burger = document.querySelector('.burger-menu__wrapper');

// const btns = document.querySelector('.filter-btn');
// const others = document.querySelector('.filter-dropdowv-btn');
// console.log(btns,others);

function colorTheme(e){
    if (e.type==='click')  {
        themeKey = themeKey==='light'?'dark':'light';

     localStorage.setItem("themeKey", themeKey);

    }   

    // if(local){вся функція } else{ret}
    body.classList.toggle('light__theme');
    body.classList.toggle('dark__theme');//body

    burger.classList.toggle('light__theme');
    burger.classList.toggle('dark__theme');//burger


    svgLight.classList.toggle('toggle__light__theme');
    svgLight.classList.toggle('toggle__dark__theme');//light

    svgDark.classList.toggle('toggle__light__theme');
    svgDark.classList.toggle('toggle__dark__theme');//dark

    svgSun.classList.toggle('toggle__sun__theme');
    svgSun.classList.toggle('toggle__moon__theme');//sun

    svgMoon.classList.toggle('toggle__moon__theme');
    svgMoon.classList.toggle('toggle__sun__theme');//moon

    sunT.classList.toggle('toggle__sun__theme');
    sunT.classList.toggle('toggle__moon__theme');//sun toggle

    moonT.classList.toggle('toggle__sun__theme');
    moonT.classList.toggle('toggle__moon__theme');//moon toggle

    inputT.classList.toggle('input__light__theme');
    inputT.classList.toggle('input__dark__theme');//input

    svgLupa.classList.toggle('svg__light__theme');
    svgLupa.classList.toggle('svg__dark__theme');//лупа

    svgMenu.classList.toggle('svg__light__theme');
    svgMenu.classList.toggle('svg__dark__theme');//menu burger

    svgX.classList.toggle('svg__light__theme');
    svgX.classList.toggle('svg__dark__theme');// X esc

    // btns.classList.toggle('');
    // btns.classList.toggle('');

    // others.classList.toggle('');
    // others.classList.toggle('');


    // console.log(themeKey);
    // if(themeKey){
    //     themeKey=false;
    // }else{
    //     themeKey=true;
    // }



}



document.addEventListener("DOMContentLoaded", (e)=> {
    if (themeKey === 'dark') {
        colorTheme(e);
    }
});

toggles.forEach(toggle=> {toggle.addEventListener('click',colorTheme)
  if(themeKey === 'dark'){
    toggle.checked=true;}
    else{toggle.checked=false;}
});
