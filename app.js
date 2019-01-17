// Define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// load all event listeners
loadEventListeners();

function loadEventListeners(){
    document.addEventListener('DOMContentLoaded', getTasks);
    // add task event
    form.addEventListener('submit', addTask);
    // remove task event
    taskList.addEventListener('click', removeTask);
    // clear task event
    clearBtn.addEventListener('click', clearTasks);
    // filter
    filter.addEventListener('keyup', filterTasks);
}

// DOM Loaded
function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  
  tasks.forEach(function(task){
    // create li element
    const li = document.createElement('li');
    // add class
    li.className = 'collection-item';
    // create text node and append to the li
    li.appendChild(document.createTextNode(task));
    const link = document.createElement('a');
    // add class
    link.className = 'delete-item secondary-content';
    // add icon html
    link.innerHTML = "<i class='fa fa-times'></i>";
    // append the link to the ul
    li.appendChild(link);

    // append the li to the ul
    taskList.appendChild(li);
  })
}
// add task
function addTask(e){
    if(taskInput.value === ''){
        alert('add a task');
    }
    else{
        // create li element
        const li = document.createElement('li');
        // add class
        li.className = 'collection-item';
        // create text node and append to the li
        li.appendChild(document.createTextNode(taskInput.value));
        const link = document.createElement('a');
        // add class
        link.className = 'delete-item secondary-content';
        // add icon html
        link.innerHTML = "<i class='fa fa-times'></i>";
        // append the link to the ul
        li.appendChild(link);

        // append the li to the ul
        taskList.appendChild(li);

        // store in LS
        storeTaskInLocalStorage(taskInput.value);

        taskInput.value='';

    }

    e.preventDefault();
}



// store in LS
function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks)); 
}

// remove task event
function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you sure?'))
      e.target.parentElement.parentElement.remove();

      // remove from LS
      removeFromLocalStorage(e.target.parentElement.parentElement);
  }
}

function removeFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  
  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// clear tasks
function clearTasks(e){
  if(confirm('Are you sure?')){
    while(taskList.firstChild){
      taskList.removeChild(taskList.firstChild);
    }
    // clear tasks from LS
    clearTasksFromLocalStorage();
  }
  
  e.preventDefault();
}

// clear tasks from LS
function clearTasksFromLocalStorage(){
  localStorage.clear();
}

// filter tasks
function filterTasks(e){
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text)!= -1){
      task.style.display ='block';
    }else{
      task.style.display = 'none';
    }
  })
}
