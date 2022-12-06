import './style/style.scss';
import { gsap } from 'gsap';

const landingPage = document.querySelector('#landingPage');
const nameDisplay = document.querySelector('#user');
const nameInput = document.querySelector('#nameInput') as HTMLInputElement;
const nameSubmit = document.querySelector('#nameSubmit');
const menuBtn = document.querySelector('#menuBtn') as HTMLButtonElement;
const menu = document.querySelector('#menu');

const todoInput = document.querySelector('#todoInput') as HTMLInputElement;
const todoInputSubmit = document.querySelector('#todoInputSubmit');
const categorySelect = document.querySelector('#categorySelect') as HTMLInputElement;
const todoList = document.querySelector('#todoList');

class TodoItem {
  category: string;

  index: number;

  todo: string;

  constructor(category: string, index: number, todo: string) {
    this.category = category;
    this.index = index;
    this.todo = todo;
  }
}

const todoArray: TodoItem[] = [];

function toggleMenu() {
  let isOpen = false;
  if (isOpen) {
    gsap.from(menu, { x: -100, duration: 0.5 });
    isOpen = false;
  }
  if (!isOpen) {
    gsap.to(menu, { x: 100, duration: 0.5 });
    isOpen = true;
  }
  // menu?.classList.toggle('visually-hidden');
}

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

function showCategory(category: string) {
  let todoListHtml = '';
  if (todoArray.length === 0) {
    todoListHtml = '<p>Dont you have anything to do?! <br> Add something!</p>';
  } else {
    todoArray.forEach((item) => {
      if (item.category === category) {
        todoListHtml += `
        <div class="list-whole" data-id="${item.index}">
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
      }
    });
  }
  if (todoList != null) {
    todoList.innerHTML = todoListHtml;
  }
}

function showTodo() {
  const selectedCategory = categorySelect.value;
  showCategory(selectedCategory);
}

function addTodo() {
  if (todoInput.value !== '') {
    const todoValue = todoInput.value;
    const todoCategory = categorySelect.value;

    const newTodo = new TodoItem(todoCategory, todoArray.length, todoValue);
    todoArray.push(newTodo);

    showTodo();
    todoInput.value = '';
  }
}

function deleteTodo() {
  const index: number = event.target.parentElement.parentElement.parentElement.dataset.id;
  todoArray.splice(index, 1);
  showTodo();
}

nameSubmit?.addEventListener('click', getName);

// Enter key adds todo
todoInput?.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    addTodo();
  }
});

todoInputSubmit?.addEventListener('click', addTodo);

todoList?.addEventListener('click', (event) => {
  if (event.target.matches('.delTodo')) {
    deleteTodo();
  }
});

document.querySelector('#generalButton')?.addEventListener('click', () => showCategory('general'));
document.querySelector('#personalButton')?.addEventListener('click', () => showCategory('personal'));
document.querySelector('#workButton')?.addEventListener('click', () => showCategory('work'));

menuBtn.addEventListener('click', toggleMenu);

showTodo();
