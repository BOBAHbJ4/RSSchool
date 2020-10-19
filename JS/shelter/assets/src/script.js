const menuIcon = document.querySelector('.hamburger-menu');
const navBar = document.querySelector('.nav-wrapper')
menuIcon.addEventListener('click', () => {
    navBar.classList.toggle('active');
});
