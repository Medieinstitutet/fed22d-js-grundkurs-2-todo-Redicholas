import './style/style.scss';
import { gsap } from 'gsap';

const landingPage = document.querySelector('#landingPage');
const nameDisplay = document.querySelector('#user');
const nameInput = document.querySelector('#nameInput') as HTMLInputElement;
const nameSubmit = document.querySelector('#nameSubmit');

const generalBtn = document.querySelector('#generalButton');
const personalBtn = document.querySelector('#personalButton');
const workBtn = document.querySelector('#workButton');

const todoInput = document.querySelector('#todoInput') as HTMLInputElement;
const todoInputSubmit = document.querySelector('#todoInputSubmit');
const todoList = document.querySelector('#todoList');

let todoCategory: string;

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
  showCategory(todoCategory);
}

function addTodo() {
  if (todoInput.value !== '') {
    const todoValue = todoInput.value;
    if (generalBtn?.classList.contains('selected')) {
      todoCategory = 'general';
    } else if (personalBtn?.classList.contains('selected')) {
      todoCategory = 'personal';
    } else {
      todoCategory = 'work';
    }

    const newTodo = new TodoItem(todoCategory, todoArray.length, todoValue);
    todoArray.push(newTodo);

    showTodo();
    todoInput.value = '';
  }
}

// Enter key adds todo
todoInput?.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    addTodo();
  }
});

function deleteTodo() {
  const index: number = event.target.parentElement.parentElement.parentElement.dataset.id;
  todoArray.splice(index, 1);
  showTodo();
}

nameSubmit?.addEventListener('click', getName);

todoInputSubmit?.addEventListener('click', addTodo);

todoList?.addEventListener('click', (event) => {
  if (event.target.matches('.delTodo')) {
    deleteTodo();
  }
});

// Opens the "General Tab"
generalBtn?.addEventListener('click', () => {
  if (generalBtn.classList.contains('selected')) {
    personalBtn?.classList.remove('selected');
    workBtn?.classList.remove('selected');
  } else {
    generalBtn.classList.toggle('selected');
    personalBtn?.classList.remove('selected');
    workBtn?.classList.remove('selected');
  }
  showCategory('general');
});

// Opens the "Personal Tab"
personalBtn?.addEventListener('click', () => {
  if (personalBtn.classList.contains('selected')) {
    generalBtn?.classList.remove('selected');
    workBtn?.classList.remove('selected');
  } else {
    personalBtn.classList.toggle('selected');
    generalBtn?.classList.remove('selected');
    workBtn?.classList.remove('selected');
  }
  showCategory('personal');
});

// Opens the "Work Tab"
workBtn?.addEventListener('click', () => {
  if (workBtn.classList.contains('selected')) {
    personalBtn?.classList.remove('selected');
    generalBtn?.classList.remove('selected');
  } else {
    workBtn.classList.toggle('selected');
    personalBtn?.classList.remove('selected');
    generalBtn?.classList.remove('selected');
  }
  showCategory('work');
});

showTodo();
