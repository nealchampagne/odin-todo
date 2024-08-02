import inputModal from "./input";

const inboxLoad = () => {

  const content = document.getElementById('content');
  const main = document.createElement('div');
  const addTask = document.createElement('button');

  main.classList.add('main');
  main.textContent = 'Hello ToDo!';
  addTask.setAttribute('id', 'add');
  addTask.textContent = '+';

  addTask.addEventListener('click', () => inputModal());

  content.appendChild(main);
  content.appendChild(addTask);
};

export default inboxLoad;