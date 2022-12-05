import './style/style.scss';

const landingPage = document.querySelector('#landingPage');
const nameDisplay = document.querySelector('#user');
const nameInput = document.querySelector('#nameInput') as HTMLInputElement;
const nameSubmit = document.querySelector('#nameSubmit');

const todoInput = document.querySelector('#todoInput') as HTMLInputElement;
const todoInputSubmit = document.querySelector('#todoInputSubmit');
const todoList = document.querySelector('#todoList');

const todoArray: {
  todo: string;
}[] = [];

function getName() {
  const user = nameInput.value;
  if (nameDisplay != null) {
    nameDisplay.innerHTML = user;
  }
  if (landingPage != null) {
    landingPage.classList.add('hidden');
  }
}

function showTodo() {
  if (todoList != null) {
    todoList.innerHTML = '';
  }
  todoArray.forEach((todo) => {
    if (todoList != null) {
      todoList.innerHTML += `
      <div class="list-whole">
        <div class="list-left">
          <input type="checkbox">
          <p>${todo.todo}</p>
        </div>
        <div class="list-right">
          <input type="color">
          <button><span class="material-symbols-outlined">
          delete
          </span></button>
        </div>
      </div>
      `;
    }
  });
}

function addTodo() {
  const todoValue = todoInput.value;
  const newTodo = { todo: todoValue };
  todoArray.push(newTodo);
  console.log(todoArray);
  showTodo();
  todoInput.value = '';
}

if (nameSubmit != null) {
  nameSubmit.addEventListener('click', getName);
}
if (todoInputSubmit != null) {
  todoInputSubmit.addEventListener('click', addTodo);
}

if (todoInputSubmit != null) {
  todoInputSubmit.addEventListener('click', addTodo);
}

showTodo();
