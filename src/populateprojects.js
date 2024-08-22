import sort from './sort';
import projectPageLoad from './projectpageload';
import inputForm from './input';
import confirmDelete from './confirmdelete';
import initializeStorage from './initializestorage';

// Fill the projects page with project cards
const populateProjects = (node, func) => {

  const arr = JSON.parse(localStorage.getItem('projects'));

  if (!Array.isArray(arr)) {
    alert('localStorage has been corrupted. Storage must be reset.')
    initializeStorage();
  };

  // Iterate through the projects array sorted alphabetically
  sort(arr).forEach(proj => {

    const projectCard = document.createElement('div');
    const projectContent = document.createElement('div');
    const buttonContainer = document.createElement('div');
    const editBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');
    const name = document.createElement('div');

    projectCard.setAttribute('id', proj.id);
    projectCard.classList.add('projectcard');

    // Set up event listener so clicking on a project opens its task page
    projectCard.addEventListener('click', () => projectPageLoad(proj.id));

    projectContent.classList.add('projectcontent');

    name.classList.add('projectname');
    name.textContent = proj.name;

    buttonContainer.classList.add('buttoncontainer');

    editBtn.classList.add('editbutton');
    editBtn.textContent = 'Edit';

    /** Open the input form pre-populated with the project name
     *  when the user clicks the edit button */
    editBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      inputForm('project', func, proj.id, projectCard, null, proj.name);
    })

    deleteBtn.classList.add('deletebutton');
    deleteBtn.textContent = 'Delete';

    // Open confirmation modal when user clicks the delete button
    deleteBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      confirmDelete('project', proj.id, func);
    });

    node.appendChild(projectCard);
    projectCard.appendChild(projectContent);
    projectContent.appendChild(name);
    projectCard.appendChild(buttonContainer);
    buttonContainer.appendChild(editBtn);
    buttonContainer.appendChild(deleteBtn);

  });
};

export default populateProjects;