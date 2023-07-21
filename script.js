'use strict';

let productContainer = document.querySelector('section');
let resultButton = document.querySelector('section + div');
let image1 = document.querySelector('section img:first-child');
let image2 = document.querySelector('section img:nth-child(2)');
let image3 = document.querySelector('section img:nth-child(3)');

let clicks = 0;
let maxClicksAllowed = 25;
let uniqueImageCount = 6;
const state = {
  allProductsArray: [],
  indexArray: [],
};

function Product(name, src) {
  this.name = name;
  this.src = src;
  this.views = 0;
  this.clicks = 0;
}

function getRandomNumber() {
  return Math.floor(Math.random() * state.allProductsArray.length);
}

function renderProducts() {
  while (state.indexArray.length < uniqueImageCount) {
    let randomNumber = getRandomNumber();
    if (!state.indexArray.includes(randomNumber)) {
      state.indexArray.push(randomNumber);
    }
  }
  let product1 = state.indexArray.shift();
  let product2 = state.indexArray.shift();
  let product3 = state.indexArray.shift();

  image1.src = state.allProductsArray[product1].src;
  console.log(image1);
  image2.src = state.allProductsArray[product2].src;
  image3.src = state.allProductsArray[product3].src;
  image1.alt = state.allProductsArray[product1].name;
  image2.alt = state.allProductsArray[product2].name;
  image3.alt = state.allProductsArray[product3].name;
  let localInfo = JSON.parse(localStorage.getItem('myProd'));
  if (localInfo) {
    localInfo[product1].views++;
    localInfo[product2].views++;
    localInfo[product3].views++;
  }
  else {
    state.allProductsArray[product1].views++;
    state.allProductsArray[product2].views++;
    state.allProductsArray[product3].views++;
  }
}
function handleProductClick(event) {
let localInfo = JSON.parse(localStorage.getItem('myProd'));
  if (event.target === productContainer) {
    alert('Please click on an image');
  }
  clicks++;

  let clickProduct = event.target.alt;
  for (let i = 0; i < state.allProductsArray.length; i++) {
    if (clickProduct === state.allProductsArray[i].name) {
      if (localInfo) {
        localInfo[i].clicks++;
        localStorage.setItem('myProd', JSON.stringify(localInfo));
      }
      state.allProductsArray[i].clicks++;
      break;
    }
  }
  if (clicks === maxClicksAllowed) {
    productContainer.removeEventListener('click', handleProductClick);
    if (!localInfo) {
      let stringifyProd = JSON.stringify(state.allProductsArray);
      localStorage.setItem('myProd', stringifyProd);
    }
    renderChart();
    productContainer.className = 'no-voting';
  } else {
    renderProducts();
  }
}
// function renderResults() {
//   let ul = document.querySelector('ul');
//   for (let i = 0; i < state.allProductsArray.length; i++) {
//     let li = document.createElement('li');
//     li.textContent = `${state.allProductsArray[i].name} had ${state.allProductsArray[i].views} views and was clicked ${state.allProductsArray[i].clicks} times.`;
//     ul.appendChild(li);
//   }
// }

function renderChart() {
  let productName = [];
  let productClick = [];
  let productView = [];

  let localInfo = JSON.parse(localStorage.getItem('myProd'));

  for (let i = 0; i < state.allProductsArray.length; i++) {
    productName.push(localInfo[i].name);
    productClick.push(localInfo[i].clicks);
    productView.push(localInfo[i].views);
  }

  const chartData = {
    labels: productName,
    datasets: [
      {
        label: 'Views',
        data: productView,
        backgroundColor: ['rgba(255, 98, 140, 0.3)'],
        borderColor: ['rgb(255, 98, 132)'],
        borderWidth: 1,
      },
      {
        label: 'Click(s)',
        data: productClick,
        backgroundColor: ['rgba(200, 140, 72, 0.2)'],
        borderColor: ['rgb(255, 158, 64)'],
        borderWidth: 1,
      },
    ],
  };
  const config = {
    type: 'bar',
    data: chartData,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };
  let chartCanvas = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(chartCanvas, config);
}

let wineGlass = new Product('Wine Glass', 'images/wine-glass.jpg');
let chair = new Product('Chair', 'images/chair.jpg');
let waterCan = new Product('Water Can', 'images/water-can.jpg');
let banana = new Product('Banana', 'images/banana.jpg');
let bathroom = new Product('Tissue Stand', 'images/bathroom.jpg');
let boots = new Product('Boots', 'images/boots.jpg');
let breakfast = new Product('Toaster', 'images/breakfast.jpg');
let bubblegum = new Product('Gum', 'images/bubblegum.jpg');
let cthulhu = new Product('Monster', 'images/cthulhu.jpg');
let dragon = new Product('Dragon', 'images/dragon.jpg');
let pen = new Product('Pen Cutlery', 'images/pen.jpg');
let pet = new Product('Pet Sweeper', 'images/pet-sweep.jpg');
let tauntaun = new Product('Sleeping Bag', 'images/tauntaun.jpg');
let unicorn = new Product('Unicorn Meat', 'images/unicorn.jpg');
let scissors = new Product('Pizza Cutter', 'images/scissors.jpg');
let shark = new Product('Shark', 'images/shark.jpg');
let sweep = new Product('Sweep', 'images/sweep.png');
let bag = new Product('Bag', 'images/bag.jpg');

state.allProductsArray.push(
  wineGlass,
  chair,
  waterCan,
  bag,
  banana,
  bathroom,
  boots,
  breakfast,
  bubblegum,
  cthulhu,
  dragon,
  pen,
  pet,
  tauntaun,
  unicorn,
  scissors,
  shark,
  sweep
);

renderProducts();

productContainer.addEventListener('click', handleProductClick);
