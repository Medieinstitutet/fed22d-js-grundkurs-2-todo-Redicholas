import './style/style.scss';
import { gsap } from "gsap";

const landingPage = document.querySelector('#landingPage');
const nameDisplay = document.querySelector('#user');
const nameInput = document.querySelector('#nameInput') as HTMLInputElement;
const nameSubmit = document.querySelector('#nameSubmit');

const todoInput = document.querySelector('#todoInput') as HTMLInputElement;
const todoInputSubmit = document.querySelector('#todoInputSubmit');
const todoList = document.querySelector('#todoList');

const todoArray: {
  index: number;
  todo: string;
}[] = [];

function hide() {
  landingPage?.classList.add('hidden');
}

function getName() {
  const user = nameInput.value;
  if (nameDisplay != null) {
    nameDisplay.innerHTML = user;
  }
  if (landingPage != null) {
    gsap.to(landingPage, { y: 1000, duration: 1, onComplete: hide });
  }
}

function showTodo() {
  let todoListHtml = '';

  if (todoArray.length === 0) {
    todoListHtml = '<p>Dont you have anything to do?! <br> Add something!</p>';
  } else {
    todoArray.forEach((item, index) => {
      item.index = index;
      todoListHtml += `
      <div class="list-whole" data-id="${index}">
        <div class="list-left">
          <input type="checkbox" id="completed">
          <p>${item.todo}</p>
        </div>
        <div class="list-right">
          <span class="material-symbols-outlined"><button class="delTodo">
          delete
          </button></span>
        </div>
      </div>
      `;
    });
  }

  if (todoList != null) {
    todoList.innerHTML = todoListHtml;
  }
}

function addTodo() {
  if (todoInput.value !== '') {
    const todoValue = todoInput.value;
    const newTodo = { todo: todoValue };
    todoArray.push(newTodo);
    showTodo();
    todoInput.value = '';
  }
}

function deleteTodo() {
  const index = event.target.parentElement.parentElement.parentElement.dataset.id;
  todoArray.splice(index, 1);
  showTodo();
}

nameSubmit?.addEventListener('click', getName);

// Enter key adds todo
todoInput?.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    addTodo();
  }
});

todoInputSubmit?.addEventListener('click', addTodo);

todoList?.addEventListener('click', (event) => {
  if (event.target.matches('.delTodo')) {
    deleteTodo();
  }
});

showTodo();
