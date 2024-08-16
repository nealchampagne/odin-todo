import clearChildren from "./clearchildren";
import clearAddButton from "./clearaddbutton";
import inputForm from "./input";
import populateTasks from "./populatetasks";
import populateProjects from "./populateprojects";

const projectsLoad = () => {
  
  const content = document.getElementById('content');

  clearChildren(content);
  clearAddButton();

  const projectsHeading = document.createElement('div');
  const addLabel = document.getElementById('addlabel');
  const addContainer = document.querySelector('.addcontainer');

  projectsHeading.classList.add('pageheading');

  projectsHeading.textContent = 'Projects';

  addLabel.textContent = 'Add project'

  content.appendChild(projectsHeading);
  
  addContainer.addEventListener('click', () => inputForm('project', projectsLoad));

  if (JSON.parse(localStorage.getItem('projects'))) {
    populateProjects(content);
  } else {
    alert(`ERROR: Projects array is missing!`)
  };
};

export default projectsLoad;