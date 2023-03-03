const menuButton = document.querySelector('.super-navbar__button');
const menuWrapper = document.querySelector('.super-navbar__menu-wrapper');

menuButton.addEventListener('click', () => {
  menuButton.classList.toggle('open');
  menuWrapper.classList.toggle('open');
});