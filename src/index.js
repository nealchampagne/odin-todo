import inboxLoad from './inbox.js';
import inputModal from './input.js';
import './style.css';

inboxLoad();

const content = document.getElementById('content');
const addTask = document.createElement('button');

addTask.setAttribute('id', 'add');
addTask.textContent = '+';

addTask.addEventListener('click', () => inputModal());

content.appendChild(addTask);
