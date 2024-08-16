import clearChildren from "./clearchildren";
import clearAddButton from "./clearaddbutton";
import inputForm from "./input";
import populateTasks from "./populatetasks";

const projectPageLoad = id => {

  const content = document.getElementById('content');

  clearChildren(content);
  clearAddButton();

  const storedProjects = JSON.parse(localStorage.getItem('projects'));
  const project = storedProjects.find(obj => obj.id === id);
  const projectHeading = document.createElement('div');
  const addLabel = document.getElementById('addlabel');
  const addContainer = document.querySelector('.addcontainer');

  projectHeading.classList.add('pageheading');

  projectHeading.textContent = project.name;

  addLabel.textContent = 'Add task';

  content.appendChild(projectHeading);

  addContainer.addEventListener('click', () => inputForm('task', projectPageLoad, id))

  const projTaskArray = [];

  const storedTasks = JSON.parse(localStorage.getItem('tasks'));

  if (storedTasks) {
    JSON.parse(localStorage.getItem('tasks')).forEach(
      obj => {
        if (obj.parentId === id) {
          projTaskArray.push(obj);
        };
      }
    );
    populateTasks(content, projTaskArray);
  } else {
    alert(`ERROR: Tasks array is missing!`)
  };
};

export default projectPageLoad;