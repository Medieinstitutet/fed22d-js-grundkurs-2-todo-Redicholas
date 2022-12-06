import './style/style.scss';

const landingPage = document.querySelector('#landingPage');
const nameDisplay = document.querySelector('#user');
const nameInput = document.querySelector('#nameInput') as HTMLInputElement;
const nameSubmit = document.querySelector('#nameSubmit');

const todoInput = document.querySelector('#todoInput') as HTMLInputElement;
const todoInputSubmit = document.querySelector('#todoInputSubmit');
const todoList = document.querySelector('#todoList');
// const delTodo = document.querySelectorAll('.delTodo');

const todoArray: {
  index: number;
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
          <input type="color">
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
    console.log(todoArray);
  }
}

function deleteTodo() {
  const index: number = event.target.parentElement.parentElement.parentElement.dataset.id;
  todoArray.splice(index, 1);
  showTodo();
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
if (todoList != null) {
  showTodo();
}

if (todoList != null) {
  todoList.addEventListener('click', (event) => {
    if (event.target.matches('.delTodo')) {
      deleteTodo();
    }
  });
}
