import clearChildren from "./clearchildren";
import inputForm from "./input";
import populateToDos from "./populatetodos";

const projectsLoad = () => {
  
  const content = document.getElementById('content');
  const projectsHeading = document.createElement('div');
  const addLabel = document.getElementById('addlabel');
  const addContainer = document.querySelector('.addcontainer');

  projectsHeading.classList.add('pageheading');

  projectsHeading.textContent = 'Projects';

  addLabel.textContent = 'Add project'

  clearChildren(content);

  content.appendChild(projectsHeading);
  
  addContainer.addEventListener('click', () => inputForm('project', projectsLoad));

  if (JSON.parse(localStorage.getItem('projects'))) {
    populateToDos(content, JSON.parse(localStorage.getItem('projects')));
  } else {
    alert(`ERROR: Projects array is missing!`)
  };
};

export default projectsLoad;