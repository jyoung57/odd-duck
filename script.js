'use strict';

let productContainer = document.querySelector('section');
let resultButton = document.querySelector('section + div');
let image1 = document.querySelector('section img:first-child');
let image2 = document.querySelector('section img:nth-child(2)');
let image3 = document.querySelector('section img:nth-child(2)');

let clicks = 0;
let maxClicksAllowed = 25;

const state = {
  allProductsArray: [],
};

function Product(name, src) {
  this.name = name;
  this.src - src;
  this.views = 0;
}

function getRandomNumber() {
  return Math.floor(Math.random() * state.allProductsArray.length);
}

function renderProducts() {
  let product1 = getRandomNumber();
  let product2 = getRandomNumber();
  let product3 = getRandomNumber();
  while (product1===product2) {
    product2 = getRandomNumber();
  }
  while (product2===product3) {
    product3 = getRandomNumber();
  }
  image1.src = state.allProductsArray[product1].src;
  image2.src = state.allProductsArray[product2].src;
  image3.src = state.allProductsArray[product3].src;
  image1.alt = state.allProductsArray[product1].name;
  image2.alt = state.allProductsArray[product2].name;
  image3.alt = state.allProductsArray[product3].name;
}
function handleProductClick(event) {
  if (event.target === productContainer) {
    alert('Please click on an image');
  }
  clicks++;

  let clickProduct = event.target.alt;
  for (let i = 0 < state.allProductsArray.length; i++) {
    if (clickProduct === state.allProductsArray[i].name) {
      state.allProductsArray[i].click++;
      break;
    }
  }
  if (click === maxClicksAllowed) {
    productContainer.removeEventListener('click, handleProductClick');
    resultButton.addEventListener('click, renderResults');
    resultButton.className = 'clicks-allowed';
    productContainer.className = 'no-voting';
  } else {
    renderProducts();
  }
}
function renderResults() {
  let ul = document.querySelector('ul');
  for (let i = 0; i < state.allProductsArray.length; i++) {
    let li = document.createElement('li');
    li.textContent = `${state.allProductsArray[i].name} had ${state.allProductsArray[i].views} views and was clicked ${state.allProductsArray[i].click} times.`;
    ul.appendChild(li);
  }
}
let 