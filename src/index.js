import './style.css';
import initializeStorage from './initializestorage.js';
import clearChildren from './clearchildren.js';
import inboxLoad from './inbox.js';
import projectsLoad from './projects.js';
import clearAddButton from './clearaddbutton.js';

const content = document.getElementById('content');

const inboxBtn = document.getElementById('inbox');
const projectsBtn = document.getElementById('projects');

initializeStorage();
inboxLoad();

inboxBtn.addEventListener('click', () => {
  clearChildren(content);
  clearAddButton();
  inboxLoad();
});

projectsBtn.addEventListener('click', () => {
  clearChildren(content);
  clearAddButton();
  projectsLoad();
});