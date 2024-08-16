import clearChildren from "./clearchildren";
import clearAddButton from "./clearaddbutton";
import inputForm from "./input";
import populateTasks from "./populatetasks";

const inboxLoad = () => {

  const content = document.getElementById('content');

  clearChildren(content);
  clearAddButton();

  const inboxHeading = document.createElement('div');
  const addLabel = document.getElementById('addlabel');
  const addContainer = document.querySelector('.addcontainer');

  inboxHeading.classList.add('pageheading');

  inboxHeading.textContent = 'Inbox';

  addLabel.textContent = 'Add task';

  content.appendChild(inboxHeading);

  addContainer.addEventListener('click', () => inputForm('task', inboxLoad));

  if (JSON.parse(localStorage.getItem('tasks'))) {
    populateTasks(content, JSON.parse(localStorage.getItem('tasks')));
  } else {
    alert(`ERROR: Tasks array is missing!`)
  };
};

export default inboxLoad;