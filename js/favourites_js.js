"use strict";

export function favourites_js() {
  const favouritesParent = document.querySelector(".favourites__parent");
  const favouritesItemsWrapper = document.querySelector(".favourites__items");
  const favourites = document.querySelectorAll(".favourites__item");
  let favouriteItemWidth;
  let offset = 0;
  const left = document.querySelector(".favourites__arrow.left");
  const right = document.querySelector(".favourites__arrow.right");
  const sliderControls = document.querySelectorAll(
    ".favourites__scrollbar-item"
  );

  if (favouritesParent) {
    favouriteItemWidth = +window
      .getComputedStyle(favourites[0])
      .width.replace("px", "");

    let currentFavoriteIndex = 0;
    scrollControls();

    favouritesItemsWrapper.style.width =
      favourites.length * favouriteItemWidth + "px";

    let timerId = setInterval(myTimer, 6000);

    left.addEventListener("click", () => {
      if (offset == 0) {
        offset = favouriteItemWidth * (favourites.length - 1);
      } else {
        offset -= favouriteItemWidth;
      }
      favouritesItemsWrapper.style.transform = `translateX(-${offset}px)`;

      clearTimeout(timerId);
      currentFavoriteIndex = offset / favouriteItemWidth;
      scrollControls();
      timerId = setInterval(myTimer, 6000);
    });

    right.addEventListener("click", () => {
      if (offset == favouriteItemWidth * (favourites.length - 1)) {
        offset = 0;
      } else {
        offset += favouriteItemWidth;
      }
      favouritesItemsWrapper.style.transform = `translateX(-${offset}px)`;

      clearTimeout(timerId);
      currentFavoriteIndex = offset / favouriteItemWidth;
      scrollControls();
      timerId = setInterval(myTimer, 6000);
    });

    // New code
    favourites.forEach((item) => {
      let posStart, posEnd;
      item.addEventListener("touchstart", (event) => {
        posStart = event.changedTouches[0].clientX;
      });
      item.addEventListener("touchend", (event) => {
        posEnd = event.changedTouches[0].clientX;
        if (posEnd < posStart) {
          if (offset == favouriteItemWidth * (favourites.length - 1)) {
            offset = 0;
          } else {
            offset += favouriteItemWidth;
          }
          favouritesItemsWrapper.style.transform = `translateX(-${offset}px)`;

          clearTimeout(timerId);
          currentFavoriteIndex = offset / favouriteItemWidth;
          scrollControls();
          timerId = setInterval(myTimer, 6000);
        }
        if (posEnd > posStart) {
          if (offset == 0) {
            offset = favouriteItemWidth * (favourites.length - 1);
          } else {
            offset -= favouriteItemWidth;
          }
          favouritesItemsWrapper.style.transform = `translateX(-${offset}px)`;

          clearTimeout(timerId);
          currentFavoriteIndex = offset / favouriteItemWidth;
          scrollControls();
          timerId = setInterval(myTimer, 6000);
        }
      });
    });

    function myTimer() {
      if (offset == favouriteItemWidth * (favourites.length - 1)) {
        offset = 0;
      } else {
        offset += favouriteItemWidth;
      }
      favouritesItemsWrapper.style.transform = `translateX(-${offset}px)`;

      currentFavoriteIndex = offset / favouriteItemWidth;
      scrollControls();
    }

    function scrollControls() {
      sliderControls.forEach((item) => {
        item.classList.remove("favourites__scrollbar-item_active");
      });
      sliderControls[currentFavoriteIndex].classList.add(
        "favourites__scrollbar-item_active"
      );
    }
  }
}
