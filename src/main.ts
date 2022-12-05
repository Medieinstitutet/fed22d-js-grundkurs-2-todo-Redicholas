import './style/style.scss';

// Landing page name input
const landingPage = document.querySelector('#landingPage');
const nameDisplay = document.querySelector('#user');
const nameInput = document.querySelector('#nameInput') as HTMLInputElement;
const nameSubmit = document.querySelector('#nameSubmit');

const todoInput = document.querySelector('#todoInput') as HTMLInputElement;
const todoInputSubmit = document.querySelector('#todoInputSubmit');

function getName() {
  const user = nameInput.value;
  if (nameDisplay != null) {
    nameDisplay.innerHTML = user;
  }
  if (landingPage != null) {
    landingPage.classList.add('hidden');
  }
}

function addTodo() {
  console.log(todoInput.value);
}

if (nameSubmit != null) {
  nameSubmit.addEventListener('click', getName);
}
if (todoInputSubmit != null) {
  todoInputSubmit.addEventListener('click', addTodo);
}
