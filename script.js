/* eslint-disable eqeqeq */

const createBook = () => {
  let lastId = 0;
  const taskWrapper = document.getElementById('task_wrapper');
  const btnSave = document.getElementById('save_task'); // Adding button
  let removeIcon;
  let taskList;
  const ath = document.getElementById('task_des');
  const ttl = document.getElementById('task_state');

  function getLastTaskId() { // Create Id for a new added book
    const lastTask = taskList[taskList.length - 1];
    lastId = lastTask.taskId + 1;
  }

  function addTaskToList(task) { // Adding function
    const removeIcon = document.createElement('span');
    const element = document.createElement('li');
    const updateIcon = document.createElement('span');

    removeIcon.innerHTML = '<button>Remove</button> ';
    removeIcon.className = 'remove_item clickeable';
    removeIcon.setAttribute('title', 'Remove');

    element.innerHTML += '<br>';
    element.setAttribute('id', task.taskId);
    element.innerHTML += task.taskDes;
    element.innerHTML += '<br>';
    element.innerHTML += task.taskState;
    taskWrapper.appendChild(element);
    element.innerHTML += '<br>';
    element.appendChild(removeIcon);
    element.appendChild(updateIcon);
    element.innerHTML += '<hr>';
  }

  function syncTask() { // Add data to local Storage
    window.localStorage.setItem('taskList', JSON.stringify(taskList));
    taskList = JSON.parse(window.localStorage.getItem('taskList'));
  }

  function removeTask(event) {
    const taskToRemove = event.currentTarget.parentNode;
    const taskId = taskToRemove.id;
    taskWrapper.removeChild(taskToRemove);

    taskList.forEach((value, i) => {
      if (value.taskId == taskId) {
        taskList.splice(i, 1);
      }
    });

    syncTask();
  }

  function syncEvents() {
    removeIcon = document.getElementsByClassName('remove_item');
    if (removeIcon.length) {
      for (let i = 0; i < removeIcon.length; i += 1) {
        removeIcon[i].addEventListener('click', removeTask);
      }
    }
  }

  function showList() {
    if (taskList.length) {
      getLastTaskId();
      /* eslint-disable guard-for-in */
      /* eslint-disable no-restricted-syntax */
      for (const item in taskList) {
        const task = taskList[item];
        addTaskToList(task);
      }
      syncEvents();
    }
  }

  function saveTask() {
    const athPrime = ath.value;
    const ttlPrime = ttl.value;
    const task = {
      taskId: lastId,
      taskDes: athPrime || 'Enter the author name',
      taskState: ttlPrime || 'Enter the book title',
    };

    taskList.push(task);
    syncTask();
    addTaskToList(task);
    syncEvents();
    lastId += 1;
  }

  function init() { // Get data from local Storage
    if (window.localStorage.getItem('taskList')) {
      taskList = JSON.parse(window.localStorage.getItem('taskList'));
    } else {
      taskList = [];
    }
    btnSave.addEventListener('click', saveTask);
    showList();
  }

  init();
};
createBook();
