const burgerMenu = document.querySelector('.js-menu-container');
const openMenuBtn = document.querySelector('.js-open-menu');
const closeMenuBtn = document.querySelector('.js-close-menu');


const toggleMenu = () => {
    const isMenuOpen =
    openMenuBtn.getAttribute('aria-expanded') === 'true' || false;
    openMenuBtn.setAttribute('aria-expanded', !isMenuOpen);
    burgerMenu.classList.toggle('is-open');

    const scrollLockMethod =
        !isMenuOpen ? 'disableBodyScroll' : 'enableBodyScroll';
    bodyScrollLock[scrollLockMethod](document.body);
};

    openMenuBtn.addEventListener('click', toggleMenu);
    closeMenuBtn.addEventListener('click', toggleMenu);


    window.matchMedia('(min-width: 768px)').addEventListener('change', e => {
    if (!e.matches) return;
    burgerMenu.classList.remove('is-open');
    openMenuBtn.setAttribute('aria-expanded', false);
    bodyScrollLock.enableBodyScroll(document.body);
    });

// current page

const menuLinks = document.querySelectorAll('.mobile-menu__link')

for (const link of menuLinks) {
    const svg = `<svg class="mobile-menu__chevron" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
    <path stroke="#F4F4F4" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 18 6-6-6-6"/>
        </svg>`
    if (link.href === window.location.href) {
        link.parentNode.classList.add('current')
        link.classList.add('current')
        link.insertAdjacentHTML('beforeend', svg)
        for (const child of link.children) {
            child.classList.add('current')
        }
    }
}
