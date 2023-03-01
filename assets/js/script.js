const form = document.querySelector('form');
const input = form.querySelector('input');
const taskList = document.getElementById('task-list');

let tasks = [];

function addTask(event) {
  event.preventDefault();
  const task = {
    id: Date.now(),
    name: input.value,
    done: false
  };
  tasks.push(task);
  input.value = '';
  displayTasks();
}

function displayTasks() {
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.dataset.id = task.id;
    li.innerHTML = `
      <input type="checkbox" class="done-checkbox" ${task.done ? 'checked' : ''}>
      <span class="name">${task.name}</span>
      <button class="delete">Delete</button>
    `;
    li.classList.add(task.done ? 'done' : 'undone');
    taskList.appendChild(li);
  });
}

function deleteTask(event) {
  if (event.target.classList.contains('delete')) {
    const id = event.target.parentElement.dataset.id;
    tasks = tasks.filter(task => task.id !== parseInt(id));
    displayTasks();
  }
}

function markTaskDone(event) {
  if (event.target.classList.contains('done-checkbox')) {
    const id = event.target.parentElement.dataset.id;
    const task = tasks.find(task => task.id === parseInt(id));
    task.done = event.target.checked;
    displayTasks();
  }
}

form.addEventListener('submit', addTask);
taskList.addEventListener('click', deleteTask);
taskList.addEventListener('change', markTaskDone);
displayTasks();
