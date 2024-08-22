import clearChildren from "./clearchildren";
import clearAddButton from "./clearaddbutton";
import inputForm from "./input";
import populateTasks from "./populatetasks";
import showHideComplete from "./showhidecomplete";

const homeLoad = () => {

  const content = document.getElementById('content');

  clearChildren(content);
  clearAddButton();

  const homeHeading = document.createElement('div');
  const homeTitle = document.createElement('div');
  const showHideCompleteBtn = document.createElement('button');
  const addLabel = document.getElementById('addlabel');
  const addContainer = document.querySelector('.addcontainer');

  homeHeading.classList.add('pageheading');

  homeTitle.classList.add('pagetitle')
  homeTitle.textContent = 'Tasks';

  showHideCompleteBtn.setAttribute('id', 'showhide');

  // Check the value of showComplete and show/hide elements as appropriate
  if (JSON.parse(localStorage.getItem('showComplete')) === false) {
    showHideCompleteBtn.classList.add('hidecomplete');
    showHideCompleteBtn.textContent = 'Show completed tasks';
  } else {
    showHideCompleteBtn.classList.add('showcomplete');
    showHideCompleteBtn.textContent = 'Hide completed tasks';
  };
  
  addLabel.textContent = 'Add task';

  content.appendChild(homeHeading);
  homeHeading.appendChild(homeTitle);
  homeHeading.appendChild(showHideCompleteBtn);

  // Call the input function when the add button is clicked
  addContainer.addEventListener('click', () => inputForm('task', homeLoad));

  // Wire up the show/hide button and call the showHideComplete function
  showHideCompleteBtn.addEventListener('click', () => {
    if (showHideCompleteBtn.textContent === 'Show completed tasks') {
      showHideCompleteBtn.textContent = 'Hide completed tasks';
      showHideCompleteBtn.classList.remove('hidecomplete');
      showHideCompleteBtn.classList.add('showcomplete');
      showHideComplete();
    } else {
      showHideCompleteBtn.textContent = 'Show completed tasks';
      showHideCompleteBtn.classList.remove('showcomplete');
      showHideCompleteBtn.classList.add('hidecomplete');
      showHideComplete();
    }
  });

  // Populate the page with task cards by calling populateTasks
  if (JSON.parse(localStorage.getItem('tasks'))) {
    populateTasks(content, JSON.parse(localStorage.getItem('tasks')), homeLoad);
  } else {
    alert(`ERROR: Tasks array is missing!`)
  };
};

export default homeLoad;