const header = document.querySelector("header");

const menuIcon = document.querySelector(".menu-icon");
const navMenu = document.querySelector(".nav-menu");
const main = document.querySelector("main");

menuIcon.addEventListener("click", () => {
  navMenu.classList.toggle("menu-active");

  navMenu.classList.value.includes("menu-active")
    ? menuIcon.setAttribute("src", "./assets/shared/icon-close.svg")
    : menuIcon.setAttribute("src", "./assets/shared/icon-hamburger.svg");
});



// const app = new App();
// app.setNavMenu();
// app.setHomeModal();
// app.setPages();
