'use strict';

const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const logInForm = document.querySelector('#logInForm');
const loginInput = document.querySelector('#login');
const passwordInput = document.querySelector('#password');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');

const cardsRestorants = document.querySelector('.cards-restaurants');
const containerPromo = document.querySelector('.container-promo');
const restaurants = document.querySelector('.restaurants');
const menu = document.querySelector('.menu');
const cardsMenu = document.querySelector('.cards-menu');

const logo = document.querySelector('.logo');

let login = localStorage.getItem('user');

// console.log('buttonAuth: ', buttonAuth);
// modalAuth.classList.add('hello');
// console.dir(modalAuth);


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
    buttonOut.removeEventListener('click', logOut);
    checkAuth();
  }

  userName.textContent = login;
  buttonOut.addEventListener('click', logOut);

  buttonAuth.style.display = 'none';
  userName.style.display = 'inline';
  buttonOut.style.display = 'block';
}

function notAuthorized() {
  console.log('Not Authorized');

  function noLoginName() {
    loginInput.style.borderColor = 'tomato';
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
    if (login) {
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

function checkAuth() {
// if ('true') {
  if (login) {
    authorized();
  } else {
    notAuthorized();
  }

}

function createCardRestaurant() {
  const card = `
    <a class="card card-restaurant">
      <img src="img/gusi-lebedi/preview.jpg" alt="image" class="card-image"/>
      <div class="card-text">
        <div class="card-heading">
          <h3 class="card-title">Гуси Лебеди</h3>
          <span class="card-tag tag">75 мин</span>
        </div>
        <div class="card-info">
          <div class="rating">
            4.5
          </div>
          <div class="price">От 1 000 ₽</div>
          <div class="category">Русская кухня</div>
        </div>
      </div>
    </a>
  `;

  cardsRestorants.insertAdjacentHTML('beforeend', card);
}

function createCardGood() {
  const card = document.createElement('div');
  card.className = 'card';
  card.insertAdjacentHTML('beforeend', `
        <img src="img/pizza-plus/pizza-vesuvius.jpg" alt="image" class="card-image"/>
        <div class="card-text">
          <div class="card-heading">
            <h3 class="card-title card-title-reg">Пицца Везувий</h3>
          </div>
          <div class="card-info">
            <div class="ingredients">Соус томатный, сыр «Моцарелла», ветчина, пепперони, перец
              «Халапенье», соус «Тобаско», томаты.
            </div>
          </div>
          <div class="card-buttons">
            <button class="button button-primary button-add-cart">
              <span class="button-card-text">В корзину</span>
              <span class="button-cart-svg"></span>
            </button>
            <strong class="card-price-bold">545 ₽</strong>
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
      cardsMenu.textContent = '';
      containerPromo.classList.add('hide');
      restaurants.classList.add('hide');
      menu.classList.remove('hide');
      createCardGood();
      createCardGood();
      createCardGood();
    }
  } else {
    toogleModalAuth();
  }


}


cartButton.addEventListener("click", toggleModal);

close.addEventListener("click", toggleModal);

cardsRestorants.addEventListener('click', openGoods);

logo.addEventListener('click', function() {
  containerPromo.classList.remove('hide');
  restaurants.classList.remove('hide');
  menu.classList.add('hide');    
});


checkAuth();

createCardRestaurant()
createCardRestaurant()
createCardRestaurant()

