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
let checkboxes;

class TodoItem {
  category: string;

  index: number;

  todo: string;

  completed: boolean;

  // TODO: Dates and deadlines

  constructor(category: string, index: number, todo: string, completed: boolean) {
    this.category = category;
    this.index = index;
    this.todo = todo;
    this.completed = completed;
  }
}

const todoArray: TodoItem[] = [];

function hideLandingPage() {
  landingPage?.classList.add('hidden');
}

function getName() {
  const user = nameInput.value;
  if (nameDisplay != null) {
    nameDisplay.innerHTML = user;
  }
  if (landingPage != null) {
    gsap.to(landingPage, { y: 1000, duration: 1, onComplete: hideLandingPage });
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
        <div class="list-whole">
          <div class="list-left">
            <input type="checkbox" class="checkbox" id="checkbox">
            <p class="todo-item" id="todo-text-${item.index}">${item.todo}</p>
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

// TODO: Put todoCategory in showTodo() ?
function showTodo() {
  showCategory(todoCategory);
}

function completeTodo(e) {
  todoArray.forEach((todo, i) => {
    const listItem = document.querySelector(`#todo-${i}`);
    if (todo.completed) {
      listItem?.classList.add('.completed');
      console.log(todo.index, 'is completed');
    } else {
      listItem?.classList.remove('.completed');
      console.log(todo.index, 'is not completed');
    }
  });
}

function checkTodo() {
  checkboxes = document.querySelectorAll('.checkbox');

  checkboxes.forEach((checkbox, index) => {
    checkbox.addEventListener('change', (event) => {
      if (todoArray[index].completed) {
        todoArray[index].completed = false;
      } else {
        todoArray[index].completed = true;
      }
      completeTodo(event.target);
    });
  });
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

    const newTodo = new TodoItem(todoCategory, todoArray.length, todoValue, false);
    todoArray.push(newTodo);

    showTodo();
    todoInput.value = '';
    checkTodo();
  }
}

// FIXME: Bug deleting todos in random order
function deleteTodo() {
  const index: number = event.target.parentElement.parentElement.parentElement.dataset.id;
  todoArray.splice(index, 1);
  showTodo();
}

function selectGeneralTab() {
  if (generalBtn?.classList.contains('selected')) {
    personalBtn?.classList.remove('selected');
    workBtn?.classList.remove('selected');
  } else {
    generalBtn?.classList.toggle('selected');
    personalBtn?.classList.remove('selected');
    workBtn?.classList.remove('selected');
  }
  showCategory('general');
}

function selectPersonalTab() {
  if (personalBtn?.classList.contains('selected')) {
    generalBtn?.classList.remove('selected');
    workBtn?.classList.remove('selected');
  } else {
    personalBtn?.classList.toggle('selected');
    generalBtn?.classList.remove('selected');
    workBtn?.classList.remove('selected');
  }
  showCategory('personal');
}

function selectWorkTab() {
  if (workBtn?.classList.contains('selected')) {
    personalBtn?.classList.remove('selected');
    generalBtn?.classList.remove('selected');
  } else {
    workBtn?.classList.toggle('selected');
    personalBtn?.classList.remove('selected');
    generalBtn?.classList.remove('selected');
  }
  showCategory('work');
}

// Adds class "completed" to checked todo
todoList?.addEventListener('change', (e) => {
  const todo = document.querySelector(`#${e.target.nextElementSibling.id}`);
  todo?.classList.add('completed');
});

nameSubmit?.addEventListener('click', getName);

todoInputSubmit?.addEventListener('click', addTodo);

// Deletes the clicked todo item
todoList?.addEventListener('click', (event) => {
  if (event.target.matches('.delTodo')) {
    deleteTodo();
  }
});

generalBtn?.addEventListener('click', selectGeneralTab);
personalBtn?.addEventListener('click', selectPersonalTab);
workBtn?.addEventListener('click', selectWorkTab);

// Enter key adds todo
todoInput?.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    addTodo();
  }
});

showTodo();

// localStorage.setItem('Todo', JSON.stringify(newTodo));
// const retrievedObject = localStorage.getItem('Todo');
// console.log(JSON.parse(retrievedObject));
