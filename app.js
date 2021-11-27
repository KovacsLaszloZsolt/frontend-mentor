const menuIcon = document.querySelector(".menu-icon");
const navMenu = document.querySelector(".nav-menu");

menuIcon.addEventListener("click", () => {
  navMenu.classList.toggle("menu-active");

  navMenu.classList.value.includes("menu-active")
    ? menuIcon.setAttribute("src", "./assets/shared/icon-close.svg")
    : menuIcon.setAttribute("src", "./assets/shared/icon-hamburger.svg");
});
