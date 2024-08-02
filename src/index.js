import clearContent from './clearcontent.js';
import inboxLoad from './inbox.js';
import initializeStorage from './initializestorage.js';
import './style.css';

inboxLoad();
initializeStorage();

const content = document.getElementById('content');
const inbox = document.getElementById('inbox');

inbox.addEventListener('click', () => {
  clearContent();
  inboxLoad();
});
