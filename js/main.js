'use strict';

const REQUEST_PATH = './db/';
const PARTNERS_DATA = 'partners.json';


const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const logInForm = document.getElementById('logInForm');
const loginInput = document.querySelector('#login');
const passwordInput = document.querySelector('#password');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');

const cardsRestorants = document.querySelector('.cards-restaurants');
const containerPromo = document.querySelector('.container-promo');
const restaurants = document.querySelector('.restaurants');
const menu = document.querySelector('.menu');
const cardsMenu = document.querySelector('.cards-menu');
const menuHeader = document.querySelector('.menu-header');

const modalBody = document.querySelector('.modal-body');
const modalPrice = document.querySelector('.modal-pricetag');
const buttonClearCart = document.querySelector('.clear-cart');

const logo = document.querySelector('.logo');


let login = localStorage.getItem('user');

const cart = [];

// console.log('buttonAuth: ', buttonAuth);
// modalAuth.classList.add('hello');
// console.dir(modalAuth);

const getData = async function(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Ошибка запроса по ${url}, статус - ${response.status}!`);
  }

  return await response.json();
};



const valid = function(str) {
  const nameRegEx = /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/;

  console.log('this: ', this);

  return nameRegEx.test(str);
}

function toggleModal() {
  modal.classList.toggle("is-open");
}

function toogleModalAuth() {
  modalAuth.classList.toggle("is-open");
}

// buttonAuth.addEventListener('click', function() {
//   console.log('hello');
// });

// buttonAuth.removeEventListener('click', toogleModalAuth);


function authorized() {
  console.log('Authorized');

  function logOut() {
    login = null;
    localStorage.removeItem('user');
    buttonAuth.style.display = '';
    userName.style.display = '';
    buttonOut.style.display = '';
    cartButton.style.display = '';
    buttonOut.removeEventListener('click', logOut);
    returnToMain();
    checkAuth();
  }

  userName.textContent = login;
  buttonOut.addEventListener('click', logOut);

  buttonAuth.style.display = 'none';
  userName.style.display = 'inline';
  cartButton.style.display = 'flex';
  buttonOut.style.display = 'flex';
}

function notAuthorized() {
  console.log('Not Authorized');

  function noLoginName() {
    loginInput.style.borderColor = 'tomato';
    // loginInput.style.outline = 'transparent';
    // alert('Имя пользователя не может быть пустым');
    logInForm.reset();
  }

  function noPassword() {
    passwordInput.style.borderColor = 'tomato';
  }

  function doLogin() {
    localStorage.setItem('user', login);

    toogleModalAuth();
    buttonAuth.removeEventListener('click', toogleModalAuth);
    closeAuth.removeEventListener('click', toogleModalAuth);
    logInForm.removeEventListener('submit', logIn);
    logInForm.reset();
    checkAuth();
  }

  function logIn(event) {
    // console.log('event: ', event);
    event.preventDefault();
    // console.log('Logged in');
    // console.log('loginInput.value: ', loginInput.value);

    loginInput.style.borderColor = '';
    passwordInput.style.borderColor = '';

    login = loginInput.value.trim();
    if (valid(login)) {
      if (passwordInput.value.trim()) {
        doLogin();
      }
      else {
        noPassword();
      }
    } else {
      noLoginName();
    }
  }

  buttonAuth.addEventListener('click', toogleModalAuth);
  closeAuth.addEventListener('click', toogleModalAuth);
  logInForm.addEventListener('submit', logIn);
}

function returnToMain() {
  containerPromo.classList.remove('hide');
  restaurants.classList.remove('hide');
  menu.classList.add('hide');    
}

function checkAuth() {
// if ('true') {
  if (login) {
    authorized();
  } else {
    notAuthorized();
  }

}

function createCardRestaurant(restaurant) {

  const {
    image,
    kitchen,
    name,
    price,
    stars,
    products,
    time_of_delivery: timeOfDelivery
  } = restaurant;

  const card = `
    <a class="card card-restaurant" data-products-my="${products}">
      <img src="${image}" alt="image" class="card-image"/>
      <div class="card-text">
        <div class="card-heading">
          <h3 class="card-title">${name}</h3>
          <span class="card-tag tag">${timeOfDelivery} мин</span>
        </div>
        <div class="card-info">
          <div class="rating">
            ${stars}
          </div>
          <div class="price">От ${price} ₽</div>
          <div class="category">${kitchen}</div>
        </div>
      </div>
    </a>
  `;

  cardsRestorants.insertAdjacentHTML('beforeend', card);
}

function createMenuHeader(name, price, stars, kitchen) {
  const header = `
      <h2 class="section-title restaurant-title">${name}</h2>
      <div class="card-info">
          <div class="rating">
            ${stars}
          </div>
          <!-- <div class="price">От ${price} ₽</div> -->
          <div class="price">${price}</div>
          <div class="category">${kitchen}</div>
      </div>
  `;
  menuHeader.insertAdjacentHTML('afterbegin', header);
}

function createCardGood({ description, image, name, price, id }) {

  const card = document.createElement('div');
  card.className = 'card';
  card.id = id;

  card.insertAdjacentHTML('beforeend', `
        <img src="${image}" alt="${name}" class="card-image"/>
        <div class="card-text">
          <div class="card-heading">
            <h3 class="card-title card-title-reg">${name}</h3>
          </div>
          <div class="card-info">
            <div class="ingredients">${description}
            </div>
          </div>
          <div class="card-buttons">
            <button class="button button-primary button-add-cart" id="${id}">
              <span class="button-card-text">В корзину</span>
              <span class="button-cart-svg"></span>
            </button>
            <strong class="card-price-bold card-price">${price} ₽</strong>
          </div>
        </div>
  `);

  cardsMenu.insertAdjacentElement('beforeend', card);
}

function openGoods(event) {

  if (login) {
    // console.log('event: ', event.target);
    const target = event.target;
    // console.dir(target.parentElement);
    const restaurant = target.closest('.card-restaurant');
    // console.log('restaurant: ', restaurant);

    if (restaurant) {
      menuHeader.textContent = '';
      cardsMenu.textContent = '';
      containerPromo.classList.add('hide');
      restaurants.classList.add('hide');
      menu.classList.remove('hide');

      const title = restaurant.querySelector('.card-title').textContent;
      const price = restaurant.querySelector('.price').textContent;
      const stars = restaurant.querySelector('.rating').textContent;
      const kitchen = restaurant.querySelector('.category').textContent;

      createMenuHeader(title, price, stars, kitchen);

      let productsData = restaurant.dataset.productsMy
      getData(`${REQUEST_PATH}${productsData}`).then(function(data) {
        data.forEach(createCardGood);
      });

      // createCardGood();
    }
  } else {
    toogleModalAuth();
  }
}

function addToCart(event) {

  const target = event.target;
  const buttonAddToCart = target.closest('.button-add-cart');
  if (buttonAddToCart) {
    const card = target.closest('.card');
    const title = card.querySelector('.card-title-reg').textContent;
    const cost = card.querySelector('.card-price').textContent;
    const id = buttonAddToCart.id;
    // console.log(title, cost, id);

    const food = cart.find(function(item) {
      return item.id == id;
    });

    if (food) {
      food.count += 1;
    }
    else {
      // cart.push({
      //   id: id,
      //   title: title,
      //   cost: cost,
      //   count: 1
      // });

      // NEW FORMAT
      cart.push({
        id,
        title,
        cost,
        count: 1
      });

    }


    console.log('cart: ', cart);

  }

}

function renderCart() {
  modalBody.textContent = '';
  cart.forEach(function({ id, title, cost, count }) {
    const itemCard = `
      <div class="food-row">
        <span class="food-name">${title}</span>
        <strong class="food-price">${cost}</strong>
        <div class="food-counter">
          <button class="counter-button counter-minus" data-id=${id}>-</button>
          <span class="counter">${count}</span>
          <button class="counter-button counter-plus" data-id=${id}>+</button>
        </div>
      </div>
    `;
    modalBody.insertAdjacentHTML('afterbegin', itemCard);
  });

  const totalPrice = cart.reduce(function(result, item) {
    return result + (parseFloat(item.cost) * item.count);
  }, 0);

  modalPrice.textContent = totalPrice + ' ₽';
}


function changeCount(event) {
  const target = event.target;

  if (target.classList.contains('counter-button')) {
    const food = cart.find(function(item) {
      return item.id === target.dataset.id;
    });
    if (target.classList.contains('counter-minus')) {
      food.count--;
      if (food.count === 0) {
        cart.splice(cart.indexOf(food), 1);
      }
    }  
    if (target.classList.contains('counter-plus')) food.count++;
    renderCart();
  }

  // if (target.classList.contains('counter-minus')) {
  //   const food = cart.find(function(item) {
  //     return item.id === target.dataset.id;
  //   });
  //   food.count--;
  //   renderCart();
  // }

  // if (target.classList.contains('counter-plus')) {
  //   const food = cart.find(function(item) {
  //     return item.id === target.dataset.id;
  //   });
  //   food.count++;
  //   renderCart();
  // }

}

function init() {
  getData(`${REQUEST_PATH}${PARTNERS_DATA}`).then(function(data) {
    data.forEach(createCardRestaurant);
  });
  
  cartButton.addEventListener("click", function() {
    renderCart();
    toggleModal();
  });
  
  modalBody.addEventListener('click', changeCount);

  buttonClearCart.addEventListener('click', function() {
    cart.length = 0;
    renderCart();
  });

  menu.addEventListener('click', addToCart);

  close.addEventListener("click", toggleModal);
  
  cardsRestorants.addEventListener('click', openGoods);
  
  logo.addEventListener('click', returnToMain);
  
  // logo.addEventListener('click', function() {
  //   containerPromo.classList.remove('hide');
  //   restaurants.classList.remove('hide');
  //   menu.classList.add('hide');    
  // });
  
  
  checkAuth();
  
  // createCardRestaurant()
  
  // window.myVar = 123;
  
  new Swiper('.swiper-container', {
    loop: true,
    autoplay: {
      delay: 2000,
    },
  });
  
}


init();