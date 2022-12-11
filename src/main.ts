// import './style/style.scss';
import './index.css';
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
const todoListContainer = document.querySelector('#todoListContainer');
const todoUl = document.querySelector('#todoUl');

let todoCategory: string;
let checkboxes: NodeListOf<HTMLInputElement>;
let todoIndex = 0;

class TodoItem {
  category: string;

  index: number;

  todoText: string;

  completed: boolean;

  // TODO: Dates and deadlines

  constructor(category: string, index: number, todoText: string, completed: boolean) {
    this.category = category;
    this.index = index;
    this.todoText = todoText;
    this.completed = completed;
  }
}

let todoArray: TodoItem[] = [];

function hideLandingPage() {
  landingPage?.classList.add('visually-hidden');
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

function showTodos() {
  const retrieved = localStorage.getItem('Todos');
  if (retrieved != null) {
    todoArray = JSON.parse(retrieved);
  }
  if (generalBtn?.classList.contains('selected')) {
    todoCategory = 'general';
  } else if (personalBtn?.classList.contains('selected')) {
    todoCategory = 'personal';
  } else {
    todoCategory = 'work';
  }
  let todoListHtml = '';
  if (todoArray.length === 0) {
    todoListHtml = '<p class="text-center">Dont you have anything to do?! <br> Add something!</p>';
  } else {
    todoArray.forEach((item) => {
      if (item.category === todoCategory) {
        todoListHtml += `
          <li class="flex justify-between" id="todo-${item.index}">
            <input type="checkbox" class="checkboxes" id="checkbox-${item.index}">
            <p class="w-full ml-2" id="todo-${item.index}">${item.todoText}</p>
            <button class="deleteBtn" id="deleteBtn-${item.index}">Delete</button>
          </li>
        `;
      }
    });
  }
  if (todoUl != null) {
    todoUl.innerHTML = todoListHtml;
  }
}

// FIXME: Handledning tack!
function completeTodo() {
  console.log('complete');
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
  console.log('complete complete');
}

function checkTodo() {
  checkboxes.forEach((checkbox, index) => {
    checkbox.addEventListener('change', () => {
      if (todoArray[index].completed) {
        todoArray[index].completed = false;
      } else {
        todoArray[index].completed = true;
      }
      completeTodo();
    });
  });
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

    const newTodo = new TodoItem(todoCategory, todoIndex, todoText, false);
    todoArray.push(newTodo);
    todoIndex += 1;

    localStorage.setItem('Todos', JSON.stringify(todoArray));

    checkboxes = document.querySelectorAll<HTMLInputElement>('.checkboxes');

    showTodos();
    todoInput.value = '';
    checkTodo();
  }
}

// FIXME: Handledning tack!
// TODO: fix problem with indexes
function deleteTodo(event: MouseEvent) {
  const index: number = event.target;
  // const todo = event.target.id;
  todoArray.splice(index, 1);
}
// Deletes the clicked todo item
todoListContainer?.addEventListener('click', (event) => {
  if (event.target != null && event.target.matches('.deleteBtn')) {
    deleteTodo(event);
  }
  showTodos();
});

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

// Adds class "completed" to checked todo
todoListContainer?.addEventListener('change', (e) => {
  console.log(e.target.parentNode.id, 'is checked');
  const todoText = document.querySelector(`#${e.target.parentNode.id}`);
  todoText?.classList.toggle('completed');
});

nameSubmit?.addEventListener('click', getName);

todoInputSubmit?.addEventListener('click', addTodo);

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
  todoIndex = 0;
  showTodos();
});

showTodos();
