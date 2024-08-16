import sort from './sort';
import projectPageLoad from './projectpageload';

const arr = JSON.parse(localStorage.getItem('projects'));

const populateProjects = node => {

  sort(arr).forEach(proj => {

    const projectCard = document.createElement('div');
    const projectContent = document.createElement('div');
    const name = document.createElement('div');

    projectCard.setAttribute('id', proj.id);
    projectCard.classList.add('projectcard');
    projectCard.addEventListener('click', () => projectPageLoad(proj.id));

    projectContent.classList.add('projectcontent');

    name.classList.add('projectname');
    name.textContent = proj.name;

    node.appendChild(projectCard);
    projectCard.appendChild(projectContent);
    projectContent.appendChild(name);

  });
};

export default populateProjects;