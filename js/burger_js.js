"use strict";

export function burger_js() {
  const burger = document.querySelector(".burger");

  renderBurgerMenu();
  const burgerMenu = document.querySelector(".burger__menu");
  const burgerLinks = document.querySelectorAll(".burger__menu a");
  const burgerMenuBtn = document.querySelector(".burger__menu-btn");

  if (document.querySelector(".menu__items")) {
    burgerMenuBtn.classList.add("non-active");
  }

  burgerLinks.forEach((link) => {
    link.addEventListener("click", () => {
      burger.classList.remove("burger_active");
      burgerMenu.classList.remove("show");
      document.body.classList.remove("hidden");
    });
  });

  burger.addEventListener("click", () => {
    burger.classList.toggle("burger_active");
    burgerMenu.classList.toggle("show");
    document.body.classList.toggle("hidden");
    window.scrollTo(0, 0);
  });

  window.addEventListener("resize", () => {
    if (
      document.body.clientWidth > 768 &&
      burger.classList.contains("burger_active")
    ) {
      burger.classList.remove("burger_active");
      burgerMenu.classList.remove("show");
      document.body.classList.remove("hidden");
    }
  });

  function renderBurgerMenu() {
    const element = document.createElement("div");
    element.classList.add("burger__menu");

    element.innerHTML = `
        <nav class="burger__nav">
          <ul class="burger__nav-list">
            <li><a href="index.html#favourites">Favorite coffee</a></li>
            <li><a href="index.html#about">About</a></li>
            <li><a href="index.html#mobile-app">Mobile app</a></li>
            <li><a href="#footer">Contact us</a></li>
          </ul>
        </nav>
        <a class="burger__menu-btn" href="coffee.html#menu">
            <span>Menu</span>
            <img
              src="icons/coffee-cup-burger.svg"
              alt="coffee-cup"
              width="40"
              height="40"
            >
        </a>
      `;
    document.body.append(element);
  }
}
