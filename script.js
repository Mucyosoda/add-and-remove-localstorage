(function () {
  let lastId = 0;
  const taskWrapper = document.getElementById('task_wrapper');
  const btnSave = document.getElementById('save_task');
  let removeIcon;
  let taskList;

  function init() {
    if (window.localStorage.getItem('taskList')) {
      taskList = JSON.parse(window.localStorage.getItem('taskList'));
    } else {
      taskList = [];
    }
    /* eslint-disable no-use-before-define */
    btnSave.addEventListener('click', saveTask);
    showList();
  }
  /* eslint-disable no-use-before-define */
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
    const task = {
      taskId: lastId,
      taskDes: document.getElementById('task_des').value,
      taskState: document.getElementById('task_state').value,
    };
    /* eslint-disable no-use-before-define */
    taskList.push(task);
    syncTask();
    addTaskToList(task);
    syncEvents();
    lastId += 1;
  }

  function addTaskToList(task) {
    const removeIcon = document.createElement('span');
    const element = document.createElement('li');
    const updateIcon = document.createElement('span');

    removeIcon.innerHTML = '<button>Remove</button> ';
    removeIcon.className = 'remove_item clickeable';
    removeIcon.setAttribute('title', 'Remove');

    element.appendChild(removeIcon);
    element.appendChild(updateIcon);
    element.innerHTML += '<br>';
    element.setAttribute('id', task.taskId);
    element.innerHTML += task.taskDes;
    element.innerHTML += '<br>';
    element.innerHTML += task.taskState;
    taskWrapper.appendChild(element);
    element.innerHTML += '<hr>';
  }

  function removeTask(event) {
    const taskToRemove = event.currentTarget.parentNode;
    const taskId = taskToRemove.id;
    taskWrapper.removeChild(taskToRemove);
    taskList.forEach((value, i) => {
      /* eslint-disable eqeqeq */
      if (value.taskId == taskId) {
        taskList.splice(i, 1);
      }
    });
    /* eslint-disable no-use-before-define */
    syncTask();
  }

  function syncTask() {
    window.localStorage.setItem('taskList', JSON.stringify(taskList));
    taskList = JSON.parse(window.localStorage.getItem('taskList'));
  }

  function getLastTaskId() {
    const lastTask = taskList[taskList.length - 1];
    lastId = lastTask.taskId + 1;
  }

  function syncEvents() {
    removeIcon = document.getElementsByClassName('remove_item');
    if (removeIcon.length) {
      for (let i = 0; i < removeIcon.length; i += 1) {
        removeIcon[i].addEventListener('click', removeTask);
      }
    }
  }
  /* eslint-disable no-unused-vars */
  function findTask(id) {
    const response = {
      task: '',
      pos: 0,
    };
    taskList.forEach((value, i) => {
      if (value.taskId === id) {
        response.task = value;
        response.pos = i;
      }
    });

    return response;
  }

  init();
}());
