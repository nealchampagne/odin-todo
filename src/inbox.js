import clearChildren from "./clearchildren";
import inputForm from "./input";
import populateToDos from "./populatetodos";

const inboxLoad = () => {

  const content = document.getElementById('content');
  const inboxHeading = document.createElement('div');
  const addLabel = document.getElementById('addlabel');
  const addContainer = document.querySelector('.addcontainer');

  inboxHeading.classList.add('pageheading');

  inboxHeading.textContent = 'Inbox';

  addLabel.textContent = 'Add task';

  clearChildren(content);

  content.appendChild(inboxHeading);

  addContainer.addEventListener('click', () => inputForm('task', inboxLoad));

  if (JSON.parse(localStorage.getItem('tasks'))) {
    populateToDos(content, JSON.parse(localStorage.getItem('tasks')));
  } else {
    alert(`ERROR: Tasks array is missing!`)
  };
};

export default inboxLoad;