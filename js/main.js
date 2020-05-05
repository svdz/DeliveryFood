const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

function toggleModal() {
  modal.classList.toggle("is-open");
}


// day1

// console.log(document.querySelector('.button-auth'));
const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const logInForm = document.querySelector('#logInForm');
const loginInput = document.querySelector('#login');
const passwordInput = document.querySelector('#password');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');


let login = localStorage.getItem('user');

// console.log('buttonAuth: ', buttonAuth);
// modalAuth.classList.add('hello');
// console.dir(modalAuth);

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

checkAuth();