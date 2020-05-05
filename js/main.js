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
    alert('Имя пользователя не может быть пустым');
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

    login = loginInput.value;
    if (login) {
      doLogin()
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