"use strict";

import { products_json } from "./products_json.js";

export function menu_js() {
  const tabBtns = document.querySelectorAll(".menu__tab li");
  const cardsWrapper = document.querySelector(".menu__items");
  let cards = [];
  let products = products_json.filter((obj) => obj.category == "coffee");
  let amount = 8;

  if (document.body.clientWidth <= 768 && products.length > 4 && cardsWrapper) {
    amount = 4;
    renderRefreshButton();
  }

  window.addEventListener("resize", () => {
    if (
      document.body.clientWidth <= 768 &&
      !document.querySelector(".menu__refresh") &&
      products.length > 4 &&
      cardsWrapper
    ) {
      amount = 4;
      renderProductList(products, cardsWrapper);
      renderRefreshButton();
    }
    if (
      document.body.clientWidth > 768 &&
      document.querySelector(".menu__refresh") &&
      cardsWrapper
    ) {
      document.querySelector(".menu__refresh").remove();
      amount = 8;
      renderProductList(products, cardsWrapper);
    }
  });

  cardsWrapper && renderProductList(products, cardsWrapper);

  tabBtns.forEach((li) => {
    li.addEventListener("click", () => {
      if (li.classList.contains("active")) {
        return;
      } else {
        removeActiveClass(tabBtns, "active");
        li.classList.add("active");
        products = products_json.filter((obj) =>
          obj.category
            .toLowerCase()
            .includes(li.getAttribute("data-tab").toLowerCase())
        );
        cards.forEach((card) => {
          card.removeEventListener("click", () => {
            renderModal(card, products);
          });
        });

        if (document.querySelector(".menu__refresh")) {
          document.querySelector(".menu__refresh").remove();
        }
        if (document.body.clientWidth <= 768 && products.length > 4) {
          amount = 4;
          renderRefreshButton();
        }
        if (document.body.clientWidth > 768) {
          amount = 8;
        }

        renderProductList(products, cardsWrapper);
      }
    });
  });

  function removeActiveClass(arr, className) {
    arr.forEach((item) => {
      item.classList.remove(className);
    });
  }

  function renderProductList(arr, parentElement) {
    parentElement.innerHTML = "";

    arr.forEach((obj, i) => {
      if (i + 1 > amount) return;
      const element = document.createElement("li");
      element.classList.add("menu__item");
      // element.classList.add("fade");
      element.innerHTML = `
        <div class="menu__item-img">
        ${
          obj.category == "coffee"
            ? `<img src="img/${obj.category}/${obj.category}-${
                i + 1
              }.jpg" alt=${obj.name} >`
            : `<img src="img/${obj.category}/${obj.category}-${
                i + 1
              }.png" alt=${obj.name} >`
        }
        </div>
        <div class="menu__item-text">
        <div>
            <h2 class="menu__item-title">${obj.name}</h2>
            <div class="menu__item-descr">${obj.description}</div>
        </div>
        <div class="menu__item-price">${obj.price}</div>
        </div>
      `;
      parentElement.append(element);
    });
    cards = document.querySelectorAll(".menu__item");
    cards.forEach((card) => {
      card.addEventListener("click", () => {
        renderModal(card, products);
      });
    });
  }

  function renderModal(card, products) {
    let currentCard = products.find((obj) =>
      obj.name.includes(card.querySelector(".menu__item-title").textContent)
    );
    const element = document.createElement("div");
    element.classList.add("overlay");
    element.innerHTML = `
        <div class="modal">
            <div class="modal__img">
                <div>
                    <img src=${card.querySelector("img").getAttribute("src")} 
                    alt="coffee-1" >
                </div>
            </div>
            <div class="modal__info">
                <h3 class="modal__title">${currentCard.name}</h3>
                <div class="modal__descr">${currentCard.description}</div>
                <div class="modal__tab">
                    <div class="modal__tab-title">Size</div>
                    <ul class="modal__tab-list size">
                        <li data-tab="0.00" class="active-tab">
                            <div>S</div>
                            <span>${currentCard.sizes.s.size}</span>
                        </li>
                        <li data-tab="0.50">
                            <div>M</div>
                            <span>${currentCard.sizes.m.size}</span>
                        </li>
                        <li data-tab="1.00">
                            <div>L</div>
                            <span>${currentCard.sizes.l.size}</span>
                        </li>
                    </ul>
                </div>
                <div class="modal__tab">
                    <div class="modal__tab-title">Additives</div>
                    <ul class="modal__tab-list additives">
                        <li data-tab="200">
                            <div>1</div>
                            <span>${currentCard.additives[0].name}</span>
                        </li>
                        <li data-tab="300">
                            <div>2</div>
                            <span>${currentCard.additives[1].name}</span>
                        </li>
                        <li data-tab="400">
                            <div>3</div>
                            <span>${currentCard.additives[2].name}</span>
                        </li>
                    </ul>
                </div>
                <div class="modal__total">
                    <span>Total:</span>
                    <span>$<span class="price-span">${
                      currentCard.price
                    }</span></span>
                </div>
                <div class="modal__total-info">
                    <div><img src="icons/info-empty.svg" alt="coffee-1" ></div>
                    <span>The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.</span>
                </div>
                <div class="modal__close">Close</div>
            </div>

        </div>
    `;
    document.body.append(element);
    document.body.style.overflow = "hidden";
    document.body.style.height = "100%";
    element.addEventListener(
      "click",
      (e) => {
        if (e.target == element) {
          element.remove();
          document.body.style.overflow = "";
          document.body.style.height = "";
        }
      }
      // { once: true }
    );

    let close = document.querySelector(".modal__close");
    close.addEventListener(
      "click",
      () => {
        element.remove();
        document.body.style.overflow = "";
        document.body.style.height = "";
      },
      { once: true }
    );

    let modalBtnsSize = document.querySelectorAll(".modal__tab-list.size li");
    let modalBtnsAdditives = document.querySelectorAll(
      ".modal__tab-list.additives li"
    );
    let priceSpan = document.querySelector(".price-span");

    modalBtnsSize.forEach((li) => {
      li.addEventListener("click", () => {
        if (li.classList.contains("active-tab")) {
          return;
        } else {
          removeActiveClass(modalBtnsSize, "active-tab");
          li.classList.add("active-tab");

          let activeAdditivesPrice =
            document.querySelectorAll(
              ".modal__tab-list.additives li.active-tab"
            ).length * 0.5;

          if (
            Number.isInteger(
              +currentCard.price +
                +li.getAttribute("data-tab") +
                +activeAdditivesPrice
            )
          ) {
            priceSpan.innerHTML = `${
              +currentCard.price +
              +li.getAttribute("data-tab") +
              +activeAdditivesPrice
            }.00`;
          } else {
            priceSpan.innerHTML = `${
              +currentCard.price +
              +li.getAttribute("data-tab") +
              +activeAdditivesPrice
            }0`;
          }
        }
      });
    });

    modalBtnsAdditives.forEach((li) => {
      li.addEventListener("click", () => {
        if (li.classList.contains("active-tab")) {
          li.classList.remove("active-tab");
          if (Number.isInteger(+priceSpan.textContent - 0.5)) {
            priceSpan.innerHTML = `${+priceSpan.textContent - 0.5}.00`;
          } else {
            priceSpan.innerHTML = `${+priceSpan.textContent - 0.5}0`;
          }
        } else {
          li.classList.add("active-tab");
          if (Number.isInteger(+priceSpan.textContent + 0.5)) {
            priceSpan.innerHTML = `${+priceSpan.textContent + 0.5}.00`;
          } else {
            priceSpan.innerHTML = `${+priceSpan.textContent + 0.5}0`;
          }
        }
      });
    });
  }

  function renderRefreshButton() {
    const element = document.createElement("a");
    element.classList.add("menu__refresh");
    element.setAttribute("href", "#!");

    element.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M21.8883 13.5C21.1645 18.3113 17.013 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C16.1006 2 19.6248 4.46819 21.1679 8" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M17 8H21.4C21.7314 8 22 7.73137 22 7.4V3" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
    cardsWrapper.after(element);

    element.addEventListener(
      "click",
      () => {
        amount += 4;
        renderProductList(products, cardsWrapper);
        element.remove();
      },
      { once: true }
    );
  }
}
