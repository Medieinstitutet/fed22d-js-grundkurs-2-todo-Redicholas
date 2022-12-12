// import './style/style.scss';
import './index.css';
import { gsap } from 'gsap';

const landingPage = document.querySelector('#landingPage');
const darkLightBtn = document.querySelector('#darkLightBtn');
const nameDisplay = document.querySelector('#user');
const nameInput = document.querySelector('#nameInput') as HTMLInputElement;
const nameSubmit = document.querySelector('#nameSubmit');

const generalBtn = document.querySelector('#generalButton');
const personalBtn = document.querySelector('#personalButton');
const workBtn = document.querySelector('#workButton');

const sortSelector = document.querySelector('#sortSelector') as HTMLSelectElement;
const generalAmount = document.querySelector('#generalAmount');
const personalAmount = document.querySelector('#personalAmount');
const workAmount = document.querySelector('#workAmount');

const todoInput = document.querySelector('#todoInput') as HTMLInputElement;
const todoInputSubmit = document.querySelector('#todoInputSubmit');
const todoListContainer = document.querySelector('#todoListContainer');
const todoUl = document.querySelector('#todoUl');

const time = new Date();
const date: number = time.getDate();
const month: number = time.getMonth() + 1;
const year: number = time.getFullYear();
const hour: number = time.getHours();
const minute: number = time.getMinutes();
const second: number = time.getSeconds();

let todoCategory: string;
// let checkboxes: NodeListOf<HTMLInputElement>;

class TodoItem {
  category: string;

  index: number;

  todoText: string;

  completed: boolean;

  timeAdded: string;

  // deadline: string; // TODO:

  constructor(
    category: string,
    index: number,
    todoText: string,
    completed: boolean,
    timeAdded: string,
    // deadline: string,
  ) {
    this.category = category;
    this.index = index;
    this.todoText = todoText;
    this.completed = completed;
    this.timeAdded = timeAdded;
    // this.deadline = deadline;
  }
}

let todoArray: TodoItem[] = [];

function hideLandingPage() {
  landingPage?.classList.add('visually-hidden');
}

function toggleDarkLight() {
  document.documentElement.classList.toggle('dark');
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

// FIXME:
function showTodoCounter() {
  let generalCounter = 0;
  let personalCounter = 0;
  let workCounter = 0;
  todoArray.forEach((item) => {
    if (item.category === 'general') {
      generalCounter += 1;
    } else if (item.category === 'personal') {
      personalCounter += 1;
    } else {
      workCounter += 1;
    }
  });
  if (generalAmount != null) {
    generalAmount.innerHTML = generalCounter.toString();
  }
  if (personalAmount != null) {
    personalAmount.innerHTML = personalCounter.toString();
  }
  if (workAmount != null) {
    workAmount.innerHTML = workCounter.toString();
  }
}

// TODO: Save "completed" state when switching categories
function showTodos() {
  const retrieved: string | null = localStorage.getItem('Todos');
  if (retrieved != null) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    todoArray = JSON.parse(retrieved);
  }
  todoArray.forEach((item, i) => {
    /* eslint-disable no-param-reassign */
    item.index = i;
  });
  if (generalBtn?.classList.contains('selected')) {
    todoCategory = 'general';
  } else if (personalBtn?.classList.contains('selected')) {
    todoCategory = 'personal';
  } else {
    todoCategory = 'work';
  }
  let todoListHtml = '';
  if (todoArray.length === 0) {
    todoListHtml = '<p class="text-center mt-8">Dont you have anything to do?! <br> Add something!</p>';
  } else {
    todoArray.forEach((item) => {
      if (item.category === todoCategory) {
        todoListHtml += `
          <li class="flex justify-between" id="todoLi-${item.index}">
            <input type="checkbox" class="checkboxes" id="checkbox-${item.index}">
            <input type="text" readonly id="todoText-${item.index}" value="${item.todoText}"
            class="w-full ml-2 text-lg bg-inherit border-none outline-none"
            ></input>
            <button class="editBtn" id="editTodo-${item.index}">
            <span id="${item.index}" class="material-symbols-outlined text-lg editBtn text-cyan-500 mr-2">edit
            </span></button>
            <button class="deleteBtn" id="delTodo-${item.index}">
            <span class="material-symbols-outlined text-lg deleteBtn text-red-800">
            delete
            </span></button>
          </li>
        `;
      }
    });
  }
  if (todoUl != null) {
    todoUl.innerHTML = todoListHtml;
  }
  // checkTodo();
  showTodoCounter();
}

// eslint-disable-next-line @typescript-eslint/no-shadow
function getTime(date: number, month: number, year: number, hour: number, minute: number, second: number) {
  return `${year}/${month}/${date} ${hour}:${minute}:${second}`;
}

function addTodo() {
  if (todoInput.value !== '') {
    const todoText = todoInput.value;
    if (generalBtn?.classList.contains('selected')) {
      todoCategory = 'general';
    } else if (personalBtn?.classList.contains('selected')) {
      todoCategory = 'personal';
    } else {
      todoCategory = 'work';
    }

    const newTodo = new TodoItem(
      todoCategory,
      todoArray.length,
      todoText,
      false,
      getTime(date, month, year, hour, minute, second),
    );

    todoArray.push(newTodo);

    localStorage.setItem('Todos', JSON.stringify(todoArray));

    // checkboxes = document.querySelectorAll<HTMLInputElement>('.checkboxes');

    showTodos();
    todoInput.value = '';
    // checkTodo();
  }
}

// FIXME: Handledning tack!
// TODO: fix problem with indexes
function deleteTodo(event: MouseEvent) {
  const todoItem = document.querySelector(`#${event.target.parentElement.id}`);
  const itemId = todoItem.id.replace('delTodo-', '');
  todoArray.splice(itemId, 1);
  localStorage.setItem('Todos', JSON.stringify(todoArray));
  showTodos();
}

function editTodo(event: Event | MouseEvent) {
  const todoText = event.target.parentElement.parentElement.childNodes[3];
  const editIcon = event.target.parentElement.parentElement.childNodes[5].childNodes[1];
  const todoId = event.target.id;
  todoText.readOnly = !todoText.readOnly;
  todoText.focus();
  if (!todoText.readOnly) {
    editIcon.innerText = 'Ok';
  } else {
    editIcon.innerText = 'Edit';
  }
  todoArray[todoId].todoText = todoText.value;
  localStorage.setItem('Todos', JSON.stringify(todoArray));
  console.table(todoArray);
}

// Deletes the clicked todo item
todoListContainer?.addEventListener('click', (event: Event | MouseEvent) => {
  if (event.target != null && event.target.matches('.deleteBtn')) {
    deleteTodo(event);
  } else if (event.target != null && event.target.matches('.editBtn')) {
    editTodo(event);
  }
});

function sortbyName() {
  const sortedArray = [...todoArray];

  sortedArray.sort((a, b) => {
    if (a.todoText < b.todoText) {
      return -1;
    }
    if (a.todoText > b.todoText) {
      return 1;
    }
    return 0;
  });
  localStorage.setItem('Todos', JSON.stringify(sortedArray));
  showTodos();
}

// FIXME:
function sortbyDateAdded() {
  const sortedArray = [...todoArray];

  sortedArray.sort((a, b) => {
    if (a.timeAdded < b.timeAdded) {
      return -1;
    }
    if (a.timeAdded > b.timeAdded) {
      return 1;
    }
    return 0;
  });
  localStorage.setItem('Todos', JSON.stringify(sortedArray));
  showTodos();
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
  showTodos();
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
  showTodos();
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
  showTodos();
}

nameSubmit?.addEventListener('click', getName);

todoInputSubmit?.addEventListener('click', addTodo);

darkLightBtn?.addEventListener('click', toggleDarkLight);

// FIXME:

sortSelector?.addEventListener('change', () => {
  if (sortSelector?.value === 'name') {
    sortbyName();
  } else if (sortSelector?.value === 'dateAdded') {
    sortbyDateAdded();
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

// Clear all todos, delete before publish.
document.querySelector('#clearAll')?.addEventListener('click', () => {
  localStorage.clear();
  todoArray = [];
  showTodos();
});

// function checkTodo() {
// const retrieved = localStorage.getItem('Todos');
// if (retrieved != null) {
//   todoArray = JSON.parse(retrieved);
// }
// const index: number = target.id.replace('checkbox-', '');
// console.log(target);

// let todoText = document.querySelector(`#${target.parentNode.id}`);
// todoText?.classList.toggle('completed');
// if (todoArray[index].completed) {
//   todoArray[index].completed = false;
// } else {
//   todoArray[index].completed = true;
// }
// localStorage.setItem('Todos', JSON.stringify(todoArray));
// }
let index: number | null;
let todoText: HTMLElement | null;

todoUl?.addEventListener('change', (e) => {
  const retrieved = localStorage.getItem('Todos');
  index = e.target.id.replace('checkbox-', '');
  todoText = document.querySelector(`#${e.target.parentNode.id}`);
  if (retrieved != null) {
    todoArray = JSON.parse(retrieved);
  }
  // todoText?.classList.toggle('completed');
  if (todoArray[index].completed) {
    todoArray[index].completed = false;
    todoText?.classList.remove('completed');
  } else {
    todoArray[index].completed = true;
    todoText?.classList.add('completed');
  }
  console.table(todoArray);
  localStorage.setItem('Todos', JSON.stringify(todoArray));
});

showTodos();
// checkTodo();
showTodoCounter();
