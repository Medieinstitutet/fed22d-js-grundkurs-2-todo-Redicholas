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
const date: Date = time.getDate() as unknown as Date;
const month: Date = time.getMonth() + 1 as unknown as Date;
const year: Date = time.getFullYear() as unknown as Date;
const hour: Date = time.getHours() as unknown as Date;
const minute: Date = time.getMinutes() as unknown as Date;
const second: Date = time.getSeconds() as unknown as Date;

let todoCategory: string;

class TodoItem {
  category: string;

  index: number;

  todoText: string;

  completed: boolean;

  timeAdded: string;

  deadline?: string; // TODO:

  constructor(
    category: string,
    index: number,
    todoText: string,
    completed: boolean,
    timeAdded: string,
    deadline?: string,
  ) {
    this.category = category;
    this.index = index;
    this.todoText = todoText;
    this.completed = completed;
    this.timeAdded = timeAdded;
    this.deadline = deadline;
  }
}

let todoArray: TodoItem[] = [];

function hideLandingPage() :void {
  landingPage?.classList.add('visually-hidden');
}

function toggleDarkLight() :void {
  document.documentElement.classList.toggle('dark');
}

function getName() :void {
  const user = nameInput.value;
  localStorage.setItem('Name', user);
  if (user === '') {
    hideLandingPage();
  }
  if (nameDisplay != null) {
    nameDisplay.innerHTML = user;
  }
  if (landingPage != null) {
    gsap.to(landingPage, { x: -500, duration: 0.5, onComplete: hideLandingPage });
  }
}

function showTodoCounter() :void {
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

function showTodos() :void {
  const retrieved = localStorage.getItem('Todos') as string;
  if (retrieved != null) {
    todoArray = JSON.parse(retrieved) as TodoItem[];
  }
  todoArray.forEach((item, i) => {
    // eslint-disable-next-line no-param-reassign
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
        const completed = item.completed ? 'checked' : '';
        todoListHtml += `
          <li class="flex justify-between" id="todoLi-${item.index}">
            <input type="checkbox" ${completed} class="checkboxes" id="checkbox-${item.index}">
            <input type="text" readonly id="todoText-${item.index}" value="${item.todoText}"
              class="w-full ml-2 text-sm bg-inherit border-none outline-none ${completed}">
            </input>
            <button class="editBtn" id="editTodo-${item.index}">
              <span id="${item.index}" 
              class="editBtn material-symbols-outlined text-lg
              dark:text-zinc-200 mr-2">
              edit
              </span>
            </button>
            <button class="deleteBtn" id="delTodo-${item.index}">
              <span class="material-symbols-outlined text-lg deleteBtn text-red-700">
              delete
              </span>
            </button>
          </li>
        `;
      }
    });
  }
  if (todoUl != null) {
    todoUl.innerHTML = todoListHtml;
  }
  showTodoCounter();
}

function getTime() {
  return `
  ${year as unknown as string}/${month as unknown as string}/${date as unknown as string}
  ${hour as unknown as string}:${minute as unknown as string}:${second as unknown as string}
  `;
}

function addTodo() :void {
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
      getTime(),
    );

    todoArray.push(newTodo);

    localStorage.setItem('Todos', JSON.stringify(todoArray));

    showTodos();
    todoInput.value = '';
  }
}

function deleteTodo(event: MouseEvent) {
  const target = event.target as HTMLInputElement;
  const targetParent = target.parentElement as HTMLInputElement;
  const todoItem = document.querySelector(`#${targetParent.id}`) as HTMLInputElement;
  const itemId = parseInt(todoItem?.id.replace('delTodo-', ''), 10);
  todoArray.splice(itemId, 1);
  localStorage.setItem('Todos', JSON.stringify(todoArray));
  showTodos();
}

function editTodo(event: MouseEvent) : void {
  const target = event.target as HTMLInputElement;
  const targetParent = target.parentElement as HTMLInputElement;
  const targetParentParent = targetParent.parentElement as HTMLInputElement;
  const todoText = targetParentParent.childNodes[3] as HTMLInputElement;
  const editIcon = targetParentParent.childNodes[5].childNodes[1] as HTMLSpanElement;
  const todoId = target.id as unknown as number;
  todoText.readOnly = !todoText.readOnly;
  todoText.focus();
  if (!todoText.readOnly) {
    editIcon.innerText = 'Ok';
  } else {
    editIcon.innerText = 'Edit';
  }
  todoArray[todoId].todoText = todoText.value;
  localStorage.setItem('Todos', JSON.stringify(todoArray));
}

function sortbyName() : void {
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

function sortbyTimeAdded() : void {
  const sortedArray = [...todoArray];

  sortedArray.sort((a, b) => {
    if (a.timeAdded < b.timeAdded) {
      return 1;
    }
    if (a.timeAdded > b.timeAdded) {
      return -1;
    }
    return 0;
  });
  localStorage.setItem('Todos', JSON.stringify(sortedArray));
  showTodos();
}

function selectGeneralTab() :void {
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

function selectPersonalTab() :void {
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

function selectWorkTab() :void {
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

sortSelector?.addEventListener('change', () => {
  if (sortSelector?.value === 'name') {
    sortbyName();
  } else if (sortSelector?.value === 'timeAdded') {
    sortbyTimeAdded();
  }
});

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

// TODO: Move to named function
// Checkboxes complete todos
todoUl?.addEventListener('change', (event: Event) => {
  const retrieved = localStorage.getItem('Todos');
  const targetCheckbox = event.target as HTMLInputElement;
  const targetLi = targetCheckbox.parentNode as HTMLInputElement;
  const index = targetCheckbox.id.replace('checkbox-', '');
  const numIndex = +index;
  const todoTextLi = document.querySelector(`#${targetLi.id}`) as HTMLElement;
  const todoTextEl = todoTextLi.childNodes[3] as HTMLElement;
  if (retrieved != null) {
    todoArray = JSON.parse(retrieved) as TodoItem[];
  }
  if (todoArray[numIndex].completed) {
    todoArray[numIndex].completed = false;
    todoTextEl?.classList.toggle('checked');
  } else {
    todoArray[numIndex].completed = true;
    todoTextEl?.classList.toggle('checked');
  }
  console.table(todoArray);
  localStorage.setItem('Todos', JSON.stringify(todoArray));
});

// Fetches the event and runs delete or edit function
todoListContainer?.addEventListener('click', (event: MouseEvent | Event) => {
  const mouseEvent = event as MouseEvent;
  const target = mouseEvent.target as HTMLElement;

  if (target != null && target.matches('.deleteBtn')) {
    deleteTodo(mouseEvent);
  } else if (target != null && target.matches('.editBtn')) {
    editTodo(mouseEvent);
  }
  // else if (target != null && target.matches('.checkboxes')) {
  //   console.log(mouseEvent); // TODO: Test
  // }
});

generalBtn?.addEventListener('click', selectGeneralTab);
personalBtn?.addEventListener('click', selectPersonalTab);
workBtn?.addEventListener('click', selectWorkTab);

showTodos();
showTodoCounter();
getName();
